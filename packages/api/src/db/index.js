
const { isValidId } = require("./mdb-helpers")

module.exports = ({mongoConnection, MessageModel, UserModel, RoomModel}) => {

    const getMessagesByRoomId = async roomId => {
        if (!isValidId(roomId)) {
            return null;
        }
        let result = await MessageModel.find({ roomId }).exec();

        return result;
    }

    const postMessage = async (roomId, userId, text) => {
        let message = new MessageModel({
            roomId,
            text,
            date: new Date(),
            author: userId
        })

        await message.save();
    }

    const registerUser = async (username, password) => {
        let user = new UserModel({username});
        user.setPassword(password);
        await user.save();        
    }

    const getUserByName = async username => {
        let result = await UserModel.findOne({username});
        return result;
    }

    const jwtAuthenticate = async (username, password) => {
        let user = await getUserByName(username);
        if (!user) {
            return { error : "No user found"}
        }

        if (!user.validatePassword(password)) {
            return { error: "Wrong password"};
        }

        const result = user.toAuthJSON();

        return result;
    }

    const getRoom = async _id => {
        if (!isValidId(_id)) return null;
        let room = await RoomModel.findById(_id);
        return room;
    }

    const createRoom = async () => {
        let room = new RoomModel();        
        await room.save();
        return room._id;
    }

    return {
        getMessagesByRoomId,
        postMessage,
        registerUser,
        getUserByName,
        createRoom,
        jwtAuthenticate,
        getRoom
    }

}
