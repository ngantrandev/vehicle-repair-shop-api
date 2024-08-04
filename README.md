# Vehicle Repair Shop API

This project is a RESTful API for Motorcycle Repair Shop Web. It is built using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [MySQL](https://www.mysql.com/).

## 1. Installation and Usage

1. Clone the repository

```bash
git clone https://github.com/ngantrandev/vehicle-repair-shop-api.git
```

2. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
PORT=8000
DB_PORT=3306
DB_HOST= ***** (Your database host)
DB_USER= ***** (Your database user)
DB_PASS= ***** (Your database password)
DB_NAME= ***** (Your database name)

JWT_ACCESS_TOKEN = ***** (Your JWT access token secret for authentication)
EXPIRES_TIME_ACCESS_TOKEN = ***** (Your JWT access token expires time, e.g. 30s, 1h, 1d, 1w, 1m)

GOONG_API_KEY = ***** (GOONG MAP API key for calling API)
GOONG_MAPTILES_KEY = ***** (GOONG MAP API KEY for calling map tiles)
```

3. Install dependencies

```bash
# Install dependencies
npm install

# Start the development server
npm run start
```
