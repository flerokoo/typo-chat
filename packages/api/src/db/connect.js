
const mongoose = require("mongoose");
const globalConfig = require("../config");
const createUserModel = require("../models/user");
const createMessageModel = require("../models/message");
const createRoomModel = require("../models/room");
const { createContainer, asValue, asFunction } = require("awilix");
const createAdapter = require("./index");

module.exports = (config = globalConfig) => new Promise((resolve, reject) => {    
    const dbUrl = `mongodb://${config.DBUSER}:${config.DBPASSWORD}@${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`;
    mongoose.connect(dbUrl, {useNewUrlParser: true, poolSize: 5});
    const mongoConnection = mongoose.connection;

    mongoConnection.once("open", () => {

        let container = createContainer();
        container.register("config", asValue(config));
        container.register("mongoConnection", asValue(mongoConnection));
        container.register("UserModel", asFunction(createUserModel));
        container.register("MessageModel", asFunction(createMessageModel));
        container.register("RoomModel", asFunction(createRoomModel));

        resolve(container.build(createAdapter));
    });
});