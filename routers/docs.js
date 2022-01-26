const Router = require('express');
const router = new Router();
const documentController = require('../controllers/DocumentController');

router.post('/create-template', documentController.createTemplate); // create template and tags
router.post('/generate-document/:id', documentController.generateDocument); // generate document
router.get('/get-templates', documentController.getTemplates); // get all templates
router.get('/get-tags/:id', documentController.getTagsByTemplateID); //get tages by template ID
router.get('/get-templates/:id', documentController.getTemplateByID); // get template by ID
router.delete('/delete-templates/:id', documentController.deleteTemplateByID);
router.get('/get-document/:name', documentController.getDocument); // get document from folder by NAME


module.exports = router;