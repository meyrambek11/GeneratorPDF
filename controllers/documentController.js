const pg_client = require('../db/connection');
const pdf = require('html-pdf');
const htmlTemplate = require('../documents/htmlTemplate');

class DocumentController{
    async createTemplate(req, res){
        const {userId, title, tags, html} = req.body
        var tagList = [];
        var templateId = 0;
        for (let i = 0; i < tags.length; i++){
            let name = tags[i].name;
            let value = tags[i].value;
            let type = tags[i].type;

            pg_client.query(`INSERT INTO tags (name, value, type) VALUES ('${name}', '${value}', '${type}') RETURNING id`, (err, res) => { 
                if (err) throw err;
                else tagList.push(res.rows[0].id)
             });
        }

        pg_client.query(`INSERT INTO templates (userId, title, html) VALUES (${userId}, '${title}', '${html}')RETURNING id`, (err, res) => { 
            if (err) throw err;
            else templateId = res.rows[0].id
        });

        for (let i = 0; i < tagList.length; i++){
            pg_client.query(`INSERT INTO tags (name, value, type) VALUES ('${name}', '${value}', '${type}') RETURNING id`, (err, res) => { 
                if (err) throw err;
                else tagList.push(res.rows[0].id)
             });
        }
        res.json({msg: "success"});

        // pg_client.query(`INSERT INTO template (id_comp, name) VALUES (${id}, '${name}');`, (err, res) => {
        //     if (err) throw err;
        //     else res.json({msg: "success"});
        // });

    }

    async generateDocument(req, res){
        const {userId, title, tags, html} = req.body;
        res.json({msg: "success"});
        // const newPerson = db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name,surname]);
        // res.json((await newPerson).rows[0]);
    }

    async createPdf(req,res){
        pdf.create(htmlTemplate(req.body), {}).toFile('controllers/creatingPDF/result.pdf', (err) => {
            if(err) {
                res.status(400).json(err);
            }

            res.json({msg: "success"});
        });
    }
    async getPdf(req,res){
        res.sendFile(`${__dirname}/creatingPDF/result.pdf`)
    }

}

module.exports = new DocumentController();