import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log('Email Host:', process.env.EMAIL_HOST);
console.log('Email Port:', process.env.EMAIL_PORT);
console.log('Email Secure:', process.env.EMAIL_SECURE);
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpViaMail = (senderEmailId: string, name: string,  otp: string): void => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: senderEmailId,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`, 
    html: 
    `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
        <p>Hello, ${name} </p>
        <p>Thank you for using our service. Your OTP code is:</p>
        <div style="font-size: 24px; color: #ffffff; background-color: #007bff; padding: 10px; text-align: center; border-radius: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>Please use this code to complete your process. If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>xyz corporation</p>
        <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #888;">If you have any questions, contact us at <a href="mailto:admin@rahulthakur.dev">admin@rahulthakur.dev</a>.</p>
      </div>    
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Message sent:', info.messageId);
  });
};