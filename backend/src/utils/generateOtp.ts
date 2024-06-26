import generateRandomString from "./generateRandomString";

const generateOtp = (email: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date();
    const otp_access_token = generateRandomString(32);
    expiry.setMinutes(expiry.getMinutes() + 5);
    const otpData = {
        otp: otp.toString(),
        email,
        expiry,
        attemptLeft: 3,
        otp_access_token
    };
    return otpData;
}

export default generateOtp;