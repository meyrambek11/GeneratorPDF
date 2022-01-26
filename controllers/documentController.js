const pg_client = require('../db/connection');
const pdf = require('html-pdf');
const doc = require('html-docx-js');
const fs = require('fs');

const FORMAT_DOCUMENTS = [
    'pdf',
    'docx'
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

    async generateDocument(req, res){
        const id = await req.params.id; // templateID
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
                let data = Date.now().toString();
                let docName = `${title}_${data}`
                if(format == FORMAT_DOCUMENTS[0]){
                    pdf.create(htmlTemplate, {}).toFile(`controllers/documents/${docName}.${format}`, (err) => {
                        if(err) {
                            res.status(400).json(err);
                        }
                        res.json(`${docName}.${format}`);
                    });
                }
                else if(format == FORMAT_DOCUMENTS[1]){
                    let docx = doc.asBlob(htmlTemplate);
                    fs.writeFile(`controllers/documents/${docName}.${format}`,docx, function (err){
                        if(err) {
                            res.status(400).json(err);
                        }
            
                        res.json(`${docName}.${format}`);
                     });
                }
                else{
                    res.json({msg: "Choose right format of document"});
                }
                
                
            }
        });
        
    }

    //get all Templates
    async getTemplates(req,res){
        pg_client.query('SELECT title,user_id,id FROM templates', (err, result) => { 
            if (err) throw err;
            else {
                res.status(200).json(result.rows)
            }
         });
    }

    // get tags by template id;
    async getTagsByTemplateID(req,res){
        const id = req.params.id;
        const tags_id = (await pg_client.query('SELECT tag_id from template_tags_relationship where template_id = $1', [id])).rows;
        if(!tags_id){
            res.status(400).json({success: false})
        }
        let tagNamesArr = [];
        for(let i=0;i<tags_id.length;i++){
            let tag_id = tags_id[i].tag_id;
            const tag_name = (await pg_client.query('SELECT name from tags where id = $1', [tag_id]) ).rows[0];
            if(!tag_name){
                res.status(400).json({success: false})
            }
            tagNamesArr.push(tag_name.name)
        }
        res.status(200).json(tagNamesArr)
    }


    //get template by id
    async getTemplateByID(req,res){
        const id = req.params.id;
        pg_client.query('SELECT title,template_body FROM templates where id = $1', [id], (err, result) => { 
            if (err) throw err;
            else {
                res.status(200).json(result.rows)
            }
        });
    }

    //delete template
    async deleteTemplateByID(req,res){
        const id = req.params.id;
        
    }


    //get document

    async getDocument(req,res){
        const docName = req.params.name
        res.sendFile(`${__dirname}/documents/${docName}`)
    }

}


module.exports = new DocumentController();