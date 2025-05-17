const nodemailer = require('nodemailer');

const emailConfig = {
  service: 'gmail',
  auth: {
    user: '5997siddhikhunt@gmail.com',      
    pass: 'panihmdkinzuvwnr'         
  },
  from: 'Task Management <noreply@taskmanagement.com>'
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass
    }
  });
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: emailConfig.from,
      to: options.email,
      subject: options.subject,
      html: options.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
};

const sendOTPEmail = async (email, otp) => {
  try {
    await sendEmail({
      email,
      subject: 'Password Reset OTP',
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Here is your OTP code:</p>
        <h3 style="background: #f0f0f0; padding: 10px; display: inline-block;">${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    });
    return true;
  } catch (error) {
    console.error('OTP email error:', error);
    return false;
  }
};

module.exports = {
  emailConfig,
  sendEmail,
  sendOTPEmail
};
