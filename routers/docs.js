const Router = require('express');
const router = new Router();
const documentController = require('../controllers/DocumentController');

router.post('/create-template', documentController.createTemplate);
router.post('/generate-document/:id', documentController.generateDocument);
router.post('/create-tags', documentController.createTags);

// router.post('/create-pdf', documentController.createPdf);
// router.get('/fetch-pdf', documentController.getPdf);


module.exports = router;