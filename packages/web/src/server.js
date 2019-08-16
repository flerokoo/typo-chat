const express = require("express");
const { createContainer, asValue, asClass, asFunction } = require("awilix");
const registerWebRoutes = require("./routes/web");
const registerAuthRoutes = require("./routes/auth");
const configureAuth = require("./auth/");
const configureApp = require("./configure-app");

let consul = require("consul")



const { HOST, SERVICE_NAME, PORT, DISABLE_CONSUL } = require("./config")
if (!DISABLE_CONSUL) {
    consul = consul({
        host: "consul",
        promisify: true,
    });

    consul.agent.service.register({
        name: SERVICE_NAME,
        address: HOST,
        port: PORT,
        tags: ["web-app"]
    });
}


const container = createContainer();
container.register("app", asFunction(() => express()).singleton());
container.build(asFunction(configureApp));
container.build(asFunction(configureAuth));
container.build(asFunction(registerAuthRoutes));
container.build(asFunction(registerWebRoutes));

const app = container.resolve("app");
app.listen(PORT);
console.log(`Web app listening on ${PORT}`);


const deregister = () => {
    if (DISABLE_CONSUL) return process.exit();
    consul.agent.service.deregister(SERVICE_NAME);
    process.exit();
}

process.on("SIGINT", deregister);
process.on("SIGUSR1", deregister);
process.on("SIGUSR2", deregister);
process.on("uncaughtException", deregister);