const PORT = parseInt(process.env.PORT) || 3000;
const HOST = require("os").hostname();
const SERVICE_NAME = `api-${HOST}-${PORT}`;

module.exports = {
    DBHOST: "mongo",
    DBPORT: 27017,
    DBNAME: "admin",
    DBUSER: "root",
    DBPASSWORD: "password",
    PORT,
    SERVICE_NAME,
    HOST,
    DISABLE_CONSUL: !!process.env.DISABLE_CONSUL,
    JWTSECRET: process.env.JWT_SECRET || "secret",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie_secret"
}