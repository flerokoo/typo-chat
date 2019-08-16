const PORT = parseInt(process.env.PORT) || 3000;
const HOST = require("os").hostname();
const SERVICE_NAME = `web-app-${HOST}-${PORT}`;

module.exports = {
    JWTSECRET: process.env.JWT_SECRET || "secret",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie_secret",
    DISABLE_CONSUL: !!process.env.DISABLE_CONSUL,
    SERVICE_NAME,
    PORT,
    HOST
}