module.exports = {
    DBHOST: "mongo",
    DBPORT: 27017,
    DBNAME: "admin",
    DBUSER: "root",
    DBPASSWORD: "password",
    JWTSECRET: process.env.JWT_SECRET || "secret",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie_secret"
}