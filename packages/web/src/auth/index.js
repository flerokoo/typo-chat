const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("../config");
// const config = {}a


const opts = {
    secretOrKey: config.JWTSECRET    
}

opts.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme('bearer'),
    req => req.cookies ? req.cookies["Authorization"] : undefined
])

const getUser = payload => {
    return Promise.resolve({
        _id: payload.id,
        username: payload.username
    })
}

module.exports = () => {
    passport.use(new Strategy(opts, async (payload, done, info) => {
        let user = await getUser(payload);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}