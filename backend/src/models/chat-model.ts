import mongoose from "mongoose";


const chatModel = new mongoose.Schema(
    {
        userOne:        {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        userTwo:        {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        latestMessage:  {type: mongoose.Schema.Types.ObjectId,ref: "Message",},
    },
    {timestamps: true}
);

chatModel.index({userOne: -1}, {unique: true});
chatModel.index({userTwo: -1}, {unique: true});

const Chat = mongoose.model("Chat", chatModel);
export default Chat;