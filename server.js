// Server file for the POS


// require express npm package
const express = require("express");

const mongo = require("mongodb");

const app = express();

const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

const PORT = 7000;

app.use(express.static("static"));
app.set("view engine", "ejs");
