const mongoose = require("mongoose");
const crypto =  require('crypto');

module.exports = ({mongoConnection, config}) => {
    let schema = mongoose.Schema({
        
    });

    let Room = mongoConnection.model("Room", schema);    

    return Room;
}