const express = require("express");
const { createContainer, asValue, asClass, asFunction } = require("awilix");
const registerWebRoutes = require("./routes/web");
const registerAuthRoutes = require("./routes/auth");
const configureAuth = require("./auth/");
const configureApp = require("./configure-app");
const consul = require("consul")({
    host: "consul",
    promisify: true,
});



const PORT = parseInt(process.env.PORT) || 3000;
const HOST = require("os").hostname();
const NAME = `web-app-${HOST}-${PORT}`;

consul.agent.service.register({
    name: NAME,
    address: HOST,
    port: PORT,
    tags: ["web-app"]
});


const container = createContainer();
container.register("app", asFunction(() => express()).singleton());
container.build(asFunction(configureApp));
container.build(asFunction(configureAuth));
container.build(asFunction(registerAuthRoutes));
container.build(asFunction(registerWebRoutes));

const app = container.resolve("app");
app.listen(PORT);
console.log(`Web app listening on ${PORT}`);