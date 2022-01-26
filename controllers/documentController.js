const pg_client = require('../db/connection');
const pdf = require('html-pdf');
const doc = require('html-docx-js');
const fs = require('fs');

const FORMAT_DOCUMENTS = [
  'pdf',
  'docx'
]

class DocumentController {
  async generateDocument(req, res) {
    const id = await req.params.id; // templateID
    pg_client.query('SELECT template_body,title from templates where id = $1', [id], (err, result) => {
      if (err) throw err;
      else {
        let htmlTemplate = result.rows[0].template_body;
        let tags = req.body.tags;
        let format = req.body.format;
        for (let i = 0; i < tags.length; i++) {
          const name = tags[i].name;
          const value = tags[i].value;
          htmlTemplate = htmlTemplate.replace(`[${name}]`, value);
        }
        let title = result.rows[0].title
        let data = Date.now().toString();
        let docName = `${title}_${data}`
        if (format == FORMAT_DOCUMENTS[0]) {
          pdf.create(htmlTemplate, {}).toFile(`controllers/documents/${docName}.${format}`, (err) => {
            if (err) {
              res.status(400).json(err);
            }
            res.json(`${docName}.${format}`);
          });
        } else if (format == FORMAT_DOCUMENTS[1]) {
          let docx = doc.asBlob(htmlTemplate);
          fs.writeFile(`controllers/documents/${docName}.${format}`, docx, function (err) {
            if (err) {
              res.status(400).json(err);
            }

            res.json(`${docName}.${format}`);
          });
        } else {
          res.json({
            msg: "Choose right format of document"
          });
        }


      }
    });

  }

  //get document

  async getDocument(req, res) {
    const docName = req.params.name
    res.sendFile(`${__dirname}/documents/${docName}`)
  }

}


module.exports = new DocumentController();