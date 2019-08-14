const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport");

module.exports = ({app}) => {
    app.use(cors());
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());    
}