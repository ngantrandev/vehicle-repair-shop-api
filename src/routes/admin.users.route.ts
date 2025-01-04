import express from 'express';
const router = express.Router();

import { getAllUser } from '@/src/controllers/admin.users.controller';
import {
    createUser,
    deactivateUser,
    getUserById,
    updateUser,
} from '@/src/controllers/admin.user.controller';

router.get('/', getAllUser);

router.get('/:user_id', getUserById);

router.post('/', createUser);

router.patch('/:user_id', updateUser);

router.patch('/:user_id/deactivate', deactivateUser);

export default router;
