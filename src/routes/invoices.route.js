const {
    getAllInvoices,
    createInvoice,
    exportInvoice,
} = require('@/src/controllers/invoices.controller');

const router = require('express').Router();

router.get('/', getAllInvoices);

router.post('/', createInvoice);

router.post('/export', exportInvoice);

module.exports = router;
