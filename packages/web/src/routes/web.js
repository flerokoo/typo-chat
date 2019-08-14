const passport = require("passport");
const reactResponse = require("./react-response")
module.exports = ({app}) => {
    
    const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });

    app.get("/*", auth, (req, res) => {
        reactResponse(req, res)
    });

}