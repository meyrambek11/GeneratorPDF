//const db = require('../db')
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index');

class toPdfController{
    async createPdf(req,res){
        pdf.create(pdfTemplate(req.body), {}).toFile('controllers/creatingPDF/result.pdf', (err) => {
            if(err) {
                res.send(Promise.reject());
            }
    
            res.send(Promise.resolve());
        });
    }
    async getPdf(req,res){
        res.sendFile(`${__dirname}/creatingPDF/result.pdf`)
    }

}

module.exports = new toPdfController();