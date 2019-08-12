const { createContainer, asValue, asClass, asFunction } = require("awilix");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const connectToDatabase = require("./src/db/connect");
const configureMiddlewares = require("./src/middlewares");
const registerMessageRoutes = require("./src/routes/messages");
const registerUserRoutes = require("./src/routes/users");
const registerRoomRouters = require("./src/routes/rooms");

const container = createContainer();

const consul = require("consul")({
    host: "consul",
    promisify: true
});

const PORT = parseInt(process.env.PORT) || 3000;
const HOST = require("os").hostname();
const NAME = `api-${HOST}:${PORT}`;

connectToDatabase().then(async db => {

    await consul.agent.service.register({
        name: NAME,
        address: HOST,
        port: PORT,
        tags: ["api"]
    });

    // container.register("mongoConnection", asValue(mongoConnection));
    container.register("db", asValue(db));
    container.register("app", asFunction(express).singleton());
    container.register("router", asFunction(() => express.Router()));  
    container.build(configureMiddlewares)
    container.build(registerMessageRoutes);
    container.build(registerUserRoutes);
    container.build(registerRoomRouters);

    const app = container.resolve("app");

    app.get("/", async (req, res) => {
        let services = await consul.agent.services(); 
        res.end(NAME + "\n\n" + JSON.stringify(services, null, 3));
    })

    app.listen(3000);
    console.log("Listening on 3000")
    
});


const deregister = () => {
    consul.agent.service.deregister(NAME);
    process.exit();
}

process.on("SIGINT", deregister);
process.on("SIGUSR1", deregister);
process.on("SIGUSR2", deregister);
process.on("uncaughtException", deregister);