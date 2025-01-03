import express from 'express';
const router = express.Router();

const {
    getUserByUsername,
    updateUserProfile,
} = require('@/src/controllers/profile.controller');
import { fileMemoryStorage } from '@/src/services/storage.service';

router.get('/:username', getUserByUsername);

router.patch('/:user_id', fileMemoryStorage.single('file'), updateUserProfile);

export default router;
