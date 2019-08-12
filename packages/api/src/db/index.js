
module.exports = ({mongoConnection, MessageModel, UserModel, RoomModel}) => {

    const getMessagesByRoomId = async roomId => {
        let result = await MessageModel.find({ roomId }).exec();
        return result;
    }

    const postMessage = async (roomId, text) => {
        let message = new MessageModel({
            roomId,
            text,
            date: new Date()
        })

        await message.save();
    }

    const registerUser = async (username, password) => {
        let user = new UserModel({username});
        user.setPassword(password);
        await user.save();        
    }

    const getUserByName = async username => {
        let result = await UserModel.find({username});
        return result;
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
        createRoom
    }

}
