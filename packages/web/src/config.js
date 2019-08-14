module.exports = {
    JWTSECRET: process.env.JWT_SECRET || "secret",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie_secret"
}