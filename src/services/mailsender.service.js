const nodemailer = require('nodemailer');

const shopName = process.env.SHOP_NAME || 'Shop Sửa Xe';

const sendMail = async (
    email,
    subject = `đây là mail tự động từ ${shopName}`,
    body
) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: shopName,
            to: email,
            subject: subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);

        return info;
    } catch (error) {
        throw new Error(error);
    }
};

const mailsenderService = {
    sendMail,
};

module.exports = mailsenderService;
