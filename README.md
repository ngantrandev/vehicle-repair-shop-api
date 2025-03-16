# Vehicle Repair Shop API

This project is a RESTful API for Motorcycle Repair Shop Web. It is built using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [MySQL](https://www.mysql.com/).

## 1. Installation and Usage

Step 1. Clone the repository

```bash
git clone https://github.com/ngantrandev/vehicle-repair-shop-api.git
cd vehicle-repair-shop-api
```

Step 2. Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=8000
DB_PORT=3306
DB_HOST=*****  # Your database host
DB_USER=*****  # Your database user
DB_PASS=*****  # Your database password
DB_NAME=*****  # Your database name

JWT_ACCESS_TOKEN=*****  # Your JWT access token
EXPIRES_TIME_ACCESS_TOKEN=*****  # Your JWT token expiration time

GOONG_MAP_BASE_API_ENPOINT=*****  # Your Goong map base API endpoint
GOONG_API_KEY=*****  # Your Goong API key
GOONG_MAPTILES_KEY=*****  # Your Goong maptiles key

VNP_SECRET_KEY=*****  # Your VNP secret key
VNP_TMN_CODE=*****  # Your VNP TMN code
VNP_BASE_URL=*****  # Your VNP base URL
VNP_RETURN_URL=*****  # Your VNP return URL

WEB_URL=*****  # Your web URL
EMAIL_USER=*****  # Your email user
EMAIL_PASS=*****  # Your email password
EMAIL_HOST=*****  # Your email host
SHOP_NAME=*****  # Your shop name
```

Step 3. Install dependencies

```bash
npm install
```

Step 4. Start the development server

```bash
npm run dev
```

## 2. Deploy with Docker

**Step 1**: Make sure you change the database information in the `.env` file to the correct information for the Docker container. For example:

```env
DB_HOST=mysqldbhost
DB_USER=root
DB_PASS=password
DB_NAME=motorcycle_repair_shop_db
```

**Step 2**: Build the Docker image

```bash
docker-compose build
```

**Step 3**: Run the Docker container

```bash
docker-compose up
```
