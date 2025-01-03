import express from 'express';
const router = express.Router();

const {
    getAllInvoices,
    createInvoice,
    exportInvoice,
} = require('@/src/controllers/invoices.controller');

router.get('/', getAllInvoices);

router.post('/', createInvoice);

router.post('/export', exportInvoice);

export default router;
