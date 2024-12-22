const router = require('express').Router();

const {
    importGoods,
    getImportList,
    getExportList,
    getImportNotes,
    getExportNotes,
} = require('@/src/controllers/inventories.controller');

router.get('/import-list', getImportList);

router.get('/export-list', getExportList);

router.post('/import-goods', importGoods);

router.get('/imports-note', getImportNotes);

router.get('/exports-note', getExportNotes);

module.exports = router;
