const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const app = express();

const apiRoute = require('@/src/routes/api.route');
const { BASE_URL_PATH, APP_NAME } = require('@/src/configs/constants.config');

app.use(cors());
app.use(morgan('common'));
app.use(bodyparser.json({ limit: '50mb' }));

fs.access('./uploads', (error) => {
    if (error) {
        fs.mkdirSync('./uploads');
    }
});

fs.access('./invoices', (error) => {
    if (error) {
        fs.mkdirSync('./invoices');
    }
});

app.use(`${BASE_URL_PATH}/uploads`, express.static('uploads'));

app.use(`${BASE_URL_PATH}/invoices`, express.static('invoices'));

app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
});

app.get(BASE_URL_PATH, (req, res) => {
    res.status(200).json(`Welcome to the ${APP_NAME}!`);
});

app.use(BASE_URL_PATH, apiRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}!!`);
});

module.exports = app;
