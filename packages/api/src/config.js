module.exports = {
    DBHOST: "mongo",
    DBPORT: 27017,
    DBNAME: "admin",
    DBUSER: "root",
    DBPASSWORD: "password",
    JWTSECRET: process.env.jwtSecret || "secret"
}