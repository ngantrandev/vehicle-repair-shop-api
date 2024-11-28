const { getAllInvoices, createInvoice } = require('@/src/controllers/invoices.controller');

const router = require('express').Router();

router.get('/', getAllInvoices);

router.post('/', createInvoice);

module.exports = router;
