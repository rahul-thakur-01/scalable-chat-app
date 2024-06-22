import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:       {type: String,required: true,unique: true,lowercase:true,trim:true},
        name:        {type: String,required: true,},
        password:    {type: String,required: true,},
        bio:         {type: String},
        image:       {type: String},
        accountType: {type: String,enum: ['private', 'public', 'closed'],default: 'public'},
        groupChat:   [{type: mongoose.Schema.Types.ObjectId,ref: 'GroupChat'}],
    },
    {timestamps: true}
);

userSchema.index({email: 1} ,{unique: true});
userSchema.index({name: 1});


const userModel = mongoose.model("User", userSchema);
export default userModel;