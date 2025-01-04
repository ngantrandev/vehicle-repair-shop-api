import express from 'express';
const router = express.Router();

import {
    getAllInvoices,
    createInvoice,
    exportInvoice,
} from '@/src/controllers/invoices.controller';

router.get('/', getAllInvoices);

router.post('/', createInvoice);

router.post('/export', exportInvoice);

export default router;
