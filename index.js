const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const { APP_NAME, BASE_URL_PATH } = require('./src/configs/constants.config');
const apiRoute = require('./src/routes/api.route');

app.use(cors());
app.use(morgan('common'));
app.use(bodyparser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
});

app.get(BASE_URL_PATH, (req, res) => {
    res.status(200).json(`Welcome to the ${APP_NAME}!`);
});

app.use(BASE_URL_PATH, apiRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!!`);
});

module.exports = app;