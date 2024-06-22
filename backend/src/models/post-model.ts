import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title:      {type: String,required: true},
        content:    {type: String,required: true},
        user:       {type: mongoose.Schema.Types.ObjectId,ref: 'User'}    
    },
    {timestamps: true}
);

postSchema.index({user: 1, createdAt: -1});

const postModel = mongoose.model('Post', postSchema);
export default postModel;