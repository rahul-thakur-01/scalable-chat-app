import {Request, Response} from 'express';
import User from '../models/user-model';




export const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) throw new Error('User already exists');
        
        const newUser = await User.create(req.body);
        const {password, ...data} = newUser.toJSON();
        res.status(201).json(data);
    }catch(err : any){
        res.status(400).json({message: err.message});
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) throw new Error('User not found');
        const {password, ...data} = user.toJSON();
        res.status(200).json(data);
    }catch(err: any){
        res.status(400).json({message: err.message});
    }
}



const userController = {
    createUser,
    getUserById
};

export default userController;