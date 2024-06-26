import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: String,
            required: true,
            length: 6
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        expiry: {
            type: Date,
            required: true,
        },
        attemptLeft: {
            type: Number,
            required: true,
        },
        otp_access_token: {
            type: String,
            required: true
        }
    }
);

const Otp = mongoose.model('OTP', otpSchema);
export default Otp;