// Server file for the POS

require("dotenv").config();

// require express npm package
const express = require("express");

const mongo = require("mongodb");

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

const file = require("file-system");
const fs = require("fs");

file.readFile === fs.readFile;

const multer = require("multer");

let fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"
		) {
		cb(null, true)
	} else {
		cb(new Error("File format should be PNG,JPG,JPEG"), false);
	}
};

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
app.post("/register", register);
app.post("/editproduct", editproduct);

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

function register(req, res) {
	db.collection("POSUsers").insertOne({
		username: req.body.username,
		password: req.body.password,
		products: [{
			name: "Apple",
			stockAvailable: 5,
			itemsSold: 15,
			buyingPrice: 1,
			sellingPrice: 5,
			SKU: 1.00
		}]
	}, (err) => {
		if (err) {
			console.log("could not sign up user");
		} else {
			console.log("created user")
		}
	});
	res.redirect("/login");
};

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
			}

			res.render("home.ejs", {
				data: data
			})
		});
	}
});

app.get("/products", (req, res) => {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		db.collection("POSUsers").findOne({username: req.session.user.username}, (err, data) => {
			if (err) {
				console.log("couldnt found user");
			}

			res.render("products.ejs", {
				data: data
			})
		})
	}
})

app.get("/cashRegister", (req, res) => {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		db.collection("POSUsers").findOne({username: req.session.user.username}, (err, data) => {
			if (err) {
				console.log("couldnt find user");
			}
			res.render("cashRegister.ejs", {
				data:data
			})
		})
	}
});

function addproduct(req, res) {
	db.collection("POSUsers").updateOne({username: req.session.user.username}, { $addToSet: {products: {
		name: req.body.productName,
		stockAvailable: req.body.stock,
		itemsSold: req.body.sold,
		buyingPrice: req.body.buyingPrice,
		sellingPrice: req.body.sellingPrice,
		SKU: req.body.sku
	}}}, (err, data) => {
		if (err) {
			console.log("Could not add product");
		} else {
			console.log("added product");
			res.redirect("/products");
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
		res.redirect("/products");
	}
}

function editproduct(req, res) {
	let selectedProduct = req.body.productName;

	if (!req.session.user) {
		res.redirect("/login");
	} else {
		db.collection("POSUsers").findOneAndUpdate({username: req.session.user.username}, { $set: {
			"products.$[elem].name": req.body.nameProduct,
			"products.$[elem].stockAvailable": req.body.stock,
			"products.$[elem].itemsSold": req.body.sold,
			"products.$[elem].buyingPrice": req.body.buyingPrice,
			"products.$[elem].sellingPrice": req.body.sellingPrice,
			"products.$[elem].SKU": req.body.sku
		}},{ arrayFilters: [{"elem.name": req.body.productName}]}, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("edited product")
			}
		});
		setTimeout(() => {res.redirect("/products"); console.log("redirecting...")}, 1000);
	}
}

app.listen(process.env.PORT || 7000, () => console.log("Server is running... on port 7000 or Heroku_port"));