const {
    getUserByUsername,
    updateUserProfile,
} = require('@/src/controllers/profile.controller');
const { upload } = require('@/src/services/uploadImage.service');

const router = require('express').Router();

router.get('/:username', getUserByUsername);

router.patch('/:user_id', upload.single('file'), updateUserProfile);

module.exports = router;
