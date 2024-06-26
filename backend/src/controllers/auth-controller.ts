import { Request, Response } from "express";
import Otp from "../models/otp-model";
import User from "../models/user-model";
import jwt from 'jsonwebtoken';
import { sendOtpViaMail } from "../config/nodemailer";
import generateRandomString from "../utils/generateRandomString";
import generateOtp from "../utils/generateOtp";

interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}


export const login = async (req: LoginRequest, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && user.password  === password){
            const existingOtp = await Otp.findOne({email});
            if(existingOtp){
                await Otp.deleteOne({email});
            }
            const otpData = generateOtp(email);
            await Otp.create(otpData);
            // TODO: otp is created, email may not send due to error, handle that 
            sendOtpViaMail(email, user.name, otpData.otp.toString());
            return res.status(200).json(
                {
                    message: 'OTP sent to your email',
                    otp_access_token : otpData.otp_access_token
                }
            );
        }else{
            res.status(401).json({message: 'Invalid email or password'});
        }
    }
    catch(err: any){
        res.status(500).json({message: err.message});
    }
}

interface optInterface extends Request{
    body : {
        email: string;
        otp: string;
    }
}

export const verifyOtp = async (req: optInterface, res: Response) => {
    try{
        const otp_access_token = req.params.otp_access_token;
        const {email, otp} = req.body;
        const otpData = await Otp.findOne({email});
        if(otpData){
            if(otpData.otp_access_token !== otp_access_token) throw new Error('Invalid OTP Access Token');
            if(otpData.attemptLeft <= 0) throw new Error('OTP attempt limit exceeded');
            if(otpData.expiry < new Date()) throw new Error('OTP expired');
            if(otpData.otp !== otp){
                const newOtpData = {
                    ...otpData,
                    attemptLeft: otpData.attemptLeft - 1
                };
                await Otp.updateOne({email}, newOtpData);
                throw new Error('Invalid OTP');
            }   
            await Otp.deleteOne({email});
            const user = await User.findOne({email});
            if(user){
                const {password, ...rest} = user.toJSON();
                res.cookie('access_token', jwt.sign({id: user.id, email: user.email}, 'secret', {expiresIn: '1h'}))
                .status(200).json(rest);
            }else res.status(401).json({message: 'User not found'}); 
        }else{
            res.status(401).json({message: 'Please request for new OTP'});
        }
    }catch(err : any){
        res.status(500).json({message: err.message});
    }
}

const authController = {
    login,
    verifyOtp
};

export default authController;

