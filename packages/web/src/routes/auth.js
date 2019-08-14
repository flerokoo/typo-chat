
const passport = require("passport");
const axios = require("axios").default;
const reactResponse = require("./react-response")

module.exports = ({app}) => {

    const requireNoLogin = (req, res, next) => req.isAuthenticated()
        ? res.redirect("/")
        : next();

    app.get("/login", requireNoLogin, (req, res, next) => {
        const html = `
        <form method="POST" action="/api/users/auth">
        <input type="text" name="username"/>
        <input type="text" name="password"/>
        <input type="submit"/>
        </form>
        `;
        // res.set('Content-Type', 'text/html');
        // res.end(html);

        reactResponse(req, res, next);
    });

    app.get("/register", requireNoLogin, (req, res) => {
        res.write("LOGIN SUKA")
        res.end();
    });

}