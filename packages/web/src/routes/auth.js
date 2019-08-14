
const passport = require("passport");
const axios = require("axios").default;
const reactResponse = require("./react-response")

module.exports = ({app}) => {

    const noAuth =  function(req, res, next) {
        passport.authenticate('jwt', function(err, user, info) {
            
            if (err) { 
                return next(err); 
            }
            
            if (!user) { 
                return next(); 
            }

            res.redirect("/")
            
        })(req, res, next);
    }


    app.get("/login", noAuth, (req, res, next) => {
        reactResponse(req, res, next);
    });

    app.get("/register", noAuth, (req, res) => {
        
        reactResponse(req, res, next);
    });

}