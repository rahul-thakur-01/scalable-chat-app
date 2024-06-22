import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content:  { type: String, trim: true },
    chat:     { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {timestamps: true}  
);

messageSchema.index({chat: 1, createdAt: -1});


const Message = mongoose.model("Message", messageSchema);
export default Message;