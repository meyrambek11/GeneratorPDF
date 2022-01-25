const pg_client = require('../db/connection');
const tag_type = require('./consts/tag_type');
const pdf = require('html-pdf');

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
        //const id = await req.params.id; // templateID
        //const tagsID = await pg_client.query('SELECT tags_id from template_tags_relationship where template_id = $1' [id]);
        //const htmlTemplate = await pg_client.query('SELECT templateBody from templates where id - $1' [id]);
        let htmlTemplate = require('../documents/htmlTemplate');
        const tags = [
            {
                name: "clientName",
                value: "Zhalgas"
            }
        ]
        const clientNewValue = tags[0].value;
        const clientNewName = tags[0].name;
        htmlTemplate = htmlTemplate.replace(`[${clientNewName}]`, clientNewValue);
        pdf.create(htmlTemplate, {}).toFile('controllers/creatingPDF/result.pdf', (err) => {
            if(err) {
                res.status(400).json(err);
            }

            res.json({msg: "success"});
        });

        
        
        // const newPerson = db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name,surname]);
        // res.json((await newPerson).rows[0]);
    }

    async createPdf(req,res){
       
    }
    async getPdf(req,res){
        res.sendFile(`${__dirname}/creatingPDF/result.pdf`)
    }

}

module.exports = new DocumentController();