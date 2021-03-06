const mongoose = require("mongoose");


module.exports = ({mongoConnection}) => {
    let schema = mongoose.Schema({
        text: String,
        roomId: mongoose.Types.ObjectId,
        author: mongoose.Types.ObjectId,
        date: Date
    })

    let Message = mongoConnection.model("Message", schema);

    return Message;
}