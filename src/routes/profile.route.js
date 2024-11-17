const {
    getUserByUsername,
    updateUserProfile,
} = require('../controllers/profile.controller');
const { upload } = require('../services/uploadImageService');

const router = require('express').Router();

router.get('/:username', getUserByUsername);

router.patch('/:user_id', upload.single('file'), updateUserProfile);

module.exports = router;
