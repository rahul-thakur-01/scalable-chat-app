import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
    {
        chatName:       { type: String, trim: true },
        groupAdmin:     {type: mongoose.Schema.Types.ObjectId, ref: "User" },
        latestMessage:  {type: mongoose.Schema.Types.ObjectId,ref: "Message"},
    },
    {timestamps: true}
);


const GroupChat = mongoose.model("GroupChat", groupChatSchema);
export default GroupChat;