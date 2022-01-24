const Router = require('express');
const router = new Router();
const documentController = require('../controllers/DocumentController');

router.post('/create-template', documentController.createTemplate);
// router.post('/create-pdf', documentController.createPdf);
// router.get('/fetch-pdf', documentController.getPdf);


module.exports = router;