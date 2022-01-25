const pg_client = require('../db/connection');
const tag_type = require('./consts/tag_type');
const pdf = require('html-pdf');
const doc = require('html-docx-js');
const fs = require('fs')

const FORMAT_DOCUMENTS = [
    'pdf',
    'doc'
]

class DocumentController{
    async createTemplate(req, res){
        const {userId, title, tags, html} = req.body
        let tagList = [];
        let templateId = 0;
        for (let i = 0; i < tags.length; i++){
            let name = tags[i].name;
            let value = tags[i].value;
            let type = tags[i].type;

            pg_client.query(`INSERT INTO tags (name, value, type) VALUES ('${name}', '${value}', '${type}') RETURNING id`, (err, result) => { 
                if (err) throw err;
                else {
                    tagList.push(result.rows[0].id)
                    console.log('Tags successfully inserted');
                }
             });
        }

        pg_client.query(`INSERT INTO templates (user_id, template_body, title) VALUES (${userId}, '${htmlTemplate}', '${title}') RETURNING id`, (err, result) => { 
            if (err) throw err;
            else {
                templateId = result.rows[0].id;
                console.log(templateId);
                console.log('Template successfully inserted');

                for (let i = 0; i < tagList.length; i++){
                    pg_client.query(`INSERT INTO template_tags_relationship (template_id, tag_id) VALUES (${templateId}, ${tagList[i]})`, (err, result) => { 
                        if (err) throw err;
                        else {
                            console.log('Template tags relationship successfully inserted');
                        }
                    });
                }
            }
        });

        res.json({msg: "success"});
    }

    async createTags(req, res){
        const {tags} = req.body;
        for (let i = 0; i < tags.length; i++){
            let name = tags[i].name;
            let value = tags[i].value;
            let type = tags[i].type;

            if (type != tag_type.SELECT) {
              
            }

            pg_client.query(`INSERT INTO tags (name, value, type) VALUES ('${name}', '${value}', '${type}')`, (err, result) => { 
                if (err) throw err;
                else {
                    tagList.push(result.rows[0].id)
                    console.log('Tags successfully inserted');
                }
             });
        }

        res.json({msg: "success"});
    }

    async generateDocument(req, res){
        const id = await req.params.id; // templateID
        //const tagsID = await pg_client.query('SELECT tags_id from template_tags_relationship where template_id = $1' [id]);
        pg_client.query('SELECT template_body,title from templates where id = $1', [id], (err, result) => { 
            if (err) throw err;
            else {
                let htmlTemplate = result.rows[0].template_body;
                let tags = req.body.tags;
                let format = req.body.format;
                for(let i=0;i<tags.length;i++){
                    const name = tags[i].name;
                    const value = tags[i].value;
                    htmlTemplate = htmlTemplate.replace(`[${name}]`, value);
                }
                let title = result.rows[0].title
                if(format == FORMAT_DOCUMENTS[0]){
                    pdf.create(htmlTemplate, {}).toFile(`controllers/creatingPDF/${title}.pdf`, (err) => {
                        if(err) {
                            res.status(400).json(err);
                        }
            
                        res.json({msg: "success"});
                    });
                }
                else if(format == FORMAT_DOCUMENTS[1]){
                    let docx = doc.asBlob(htmlTemplate);
                    fs.writeFile(`controllers/creatingPDF/${title}.docx`,docx, function (err){
                        if(err) {
                            res.status(400).json(err);
                        }
            
                        res.json({msg: "success"});
                     });
                }
                
                
            }
        });
        
    }

    async getPdf(req,res){
        res.sendFile(`${__dirname}/creatingPDF/result.pdf`)
    }

}

/*var HtmlDocx = require('html-docx-js');
var fs = require('fs');
var html = 'fasfasfasdfsfsdfsf';

var docx = HtmlDocx.asBlob(html);
fs.writeFile('helloworld3.docx',docx, function (err){
   if (err) return console.log(err);
   console.log('done');
});*/

module.exports = new DocumentController();