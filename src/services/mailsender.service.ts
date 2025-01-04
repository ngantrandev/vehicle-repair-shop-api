const nodemailer = require('nodemailer');

const shopName = process.env.SHOP_NAME || 'Shop Sửa Xe';
const mailUser = process.env.EMAIL_USER || '';
const mailPass = process.env.EMAIL_PASS || '';
const mailHost = process.env.EMAIL_HOST || '';

export const sendMail = async (
    email: string,
    subject: string = `đây là mail tự động từ ${shopName}`,
    body: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            service: mailHost,
            auth: {
                user: mailUser,
                pass: mailPass,
            },
        });

        const mailFrom = `${shopName} <${mailUser}>`;

        const mailOptions = {
            from: mailFrom,
            to: email,
            subject: subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);

        return info;
    } catch (error: any) {
        throw new Error(error);
    }
};
