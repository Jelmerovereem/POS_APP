// Server file for the POS

require("dotenv").config();

// require express npm package
const express = require("express");

const mongo = require("mongodb");

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});


const app = express();

const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.get("/register", (req, res) => {res.render("register.ejs")})
app.post("/signout", signout);
app.post("/addproduct", addproduct);
app.post("/removeproduct", removeproduct);

const url = process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(url, (err, client) => {
	if (err) {
		console.log("Error, database connection failed");
	} else {
		console.log("database connection succeeded");
	}
	db = client.db(process.env.DB_NAME);
});


app.get("/login", (req, res) => {
	res.render("login.ejs");
});

app.post("/login", login);

function login(req, res) {
		let users = db.collection("POSUsers").findOne({username: req.body.username}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			//if username doesn't exist
			if (data == null) {
				res.redirect("/login");
				console.log("No user");
				return;
			}
			// if email and password match
			if (data.password === req.body.password) {
				req.session.user = data;
				console.log("Logged in as:" + req.session.user.username);
				res.redirect("/");
			} else {
				// if they don't match
				console.log("incorrect password");
				res.redirect("/login");
			}
		}
	});
};

function signout(req, res) {
	req.session.destroy((err) => {
		if (err) {
			console.log("Could not destroy");
		} else {
			console.log("user signed out");
			res.redirect("/");
		}
	})
};

app.get("/", (req, res) => {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		db.collection("POSUsers").findOne({username: req.session.user.username}, (err, data) => {
			if (err) {
				console.log("couldnt found user");
			} else {
				console.log("found user");
			};

			res.render("home.ejs", {
				data: data
			})
		});
	}
});

function addproduct(req, res) {
	db.collection("POSUsers").updateOne({username: req.session.user.username}, { $addToSet: {products: {
		name: req.body.name,
		stockAvailable: req.body.stock,
		itemsSold: req.body.sold,
		buyingPrice: req.body.buyingPrice,
		sellingPrice: req.body.sellingPrice
	}}}, (err, data) => {
		if (err) {
			console.log("Could not add product");
		} else {
			console.log("added product");
			res.redirect("/");
		}
	});
};

function removeproduct(req, res) {
	let selectedProduct = req.body.name;

	if (!req.session.user) {
		res.redirect("/login");
	} else {
		db.collection("POSUsers").updateOne({username: req.session.user.username}, {$pull: {products: {name: selectedProduct}}}, (err) => {
			if (err) {
				console.log("Could not remove product");
			} else {
				console.log("removed product");
			}
		});
		res.redirect("/");
	}
}

app.listen(process.env.PORT || 7000, () => console.log("Server is running..."));