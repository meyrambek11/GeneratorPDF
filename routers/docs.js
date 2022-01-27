const Router = require('express');
const router = new Router();
const documentController = require('../controllers/DocumentController');
const templateController = require('../controllers/TemplateController');

router.post('/create-template', templateController.createTemplate); // create template and tags
router.patch('/template/:id', templateController.updateTemplate); // update template
router.get('/templates', templateController.getTemplates); // get all templates
router.get('/tags/:id', templateController.getTagsByTemplateID); //get tags by template ID
router.get('/template/:id', templateController.getTemplateByID); // get template by ID
router.delete('/template/:id', templateController.deleteTemplateByID);

router.post('/generate-document/:id', documentController.generateDocument); // generate document
router.get('/document/:name', documentController.getDocument); // get document from folder by NAME


module.exports = router;