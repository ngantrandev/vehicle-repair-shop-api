const router = require('express').Router();

const {
    importGoods,
    getImportList,
    getExportList,
} = require('@/src/controllers/inventories.controller');

router.get('/import-list', getImportList);

router.get('/export-list', getExportList);

router.post('/import-goods', importGoods);

module.exports = router;
