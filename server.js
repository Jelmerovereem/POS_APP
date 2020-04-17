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

app.listen(() => console.log("Server is running..."));