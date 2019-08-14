const mongoose = require("mongoose");

module.exports = ({mongoConnection}) => {
    let schema = mongoose.Schema({
        text: String,
        roomId: Number,
        author: String,
        date: Date
    })

    let Message = mongoConnection.model("Message", schema);

    return Message;
}