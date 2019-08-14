const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport");
const session = require("express-session");
const config = require("./config")
const cookieParser = require("cookie-parser")

module.exports = ({app}) => {
    app.use(cors());
    app.use(cookieParser(config.COOKIE_SECRET))
    app.use(session({
        secret: config.COOKIE_SECRET,
        cookie: {
            httpOnly: true
        }
    }))
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());    
}