const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadImgService = {
    upload,
};

module.exports = uploadImgService;
