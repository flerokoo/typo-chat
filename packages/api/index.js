const { createContainer, asValue, asClass, asFunction } = require("awilix");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const connectToDatabase = require("./src/db/connect");
const configureMiddlewares = require("./src/middlewares");
const registerMessageRoutes = require("./src/routes/messages");
const registerUserRoutes = require("./src/routes/users");
const registerRoomRouters = require("./src/routes/rooms");
const configureAuth = require("./src/auth/");

const container = createContainer();

if (!config.DISABLE_CONSUL) {
    const consul = require("consul")({
        host: "consul",
        promisify: true
    });

    consul.agent.service.register({
        name: config.SERVICE_NAME,
        address: config.HOST,
        port: config.PORT,
        tags: ["api"]
    });
}

connectToDatabase().then(async db => {    

    // container.register("mongoConnection", asValue(mongoConnection));
    container.register("db", asValue(db));
    container.register("app", asFunction(express).singleton());
    container.register("router", asFunction(() => express.Router()));  
    container.build(configureMiddlewares)
    container.build(configureAuth)
    container.build(registerMessageRoutes);
    container.build(registerUserRoutes);
    container.build(registerRoomRouters);

    const app = container.resolve("app");

    app.get("/", async (req, res) => {
        let services = await consul.agent.services(); 
        res.end(NAME + "\n\n" + JSON.stringify(services, null, 3));
    })

    app.listen(config.PORT);
    console.log(`API server listening on ${config.PORT}`);
    
});


const deregister = () => {
    consul.agent.service.deregister(NAME);
    process.exit();
}

process.on("SIGINT", deregister);
process.on("SIGUSR1", deregister);
process.on("SIGUSR2", deregister);
process.on("uncaughtException", deregister);