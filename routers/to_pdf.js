const Router = require('express');
const router = new Router();
const toPdfController = require('../controllers/to_pdf');

router.post('/create-pdf', toPdfController.createPdf);
router.get('/fetch-pdf', toPdfController.getPdf);


module.exports = router;