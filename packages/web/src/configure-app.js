const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const express = require("express")

module.exports = ({app}) => {
    console.log("CONFs")
    app.use(session({
        secret: "session-secret",
        saveUninitialized: false,
        resave: true ,
        cookie: {
            httpOnly: true
        }
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/s", express.static("public"));
}