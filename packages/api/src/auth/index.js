const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("../config");

const opts = {
    secretOrKey: config.JWTSECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer')
}

const getUser = payload => {
    return Promise.resolve({
        _id: "id",
        username: "name",
        toker: "token"
    })
}

module.exports = () => {
    passport.use(new Strategy(opts, async (payload, done) => {
        console.log("payload", payload)
        let user = await getUser(payload);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}