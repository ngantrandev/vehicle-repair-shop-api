import multer, { FileFilterCallback } from 'multer';

const storage = multer.memoryStorage();

export const fileMemoryStorage = multer({ storage: storage });
