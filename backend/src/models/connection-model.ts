import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
    {
        follower:   {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
        following:  {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true}
    },
    {timestamps: true,}
);

connectionSchema.index({follower: 1, following: 1}, {unique: true});

const connectionModel = mongoose.model("Connection", connectionSchema);
export default connectionModel;