const pg_client = require('../db/connection');
const pdf = require('html-pdf');
const htmlTemplate = require('../documents/htmlTemplate');

class DocumentController{
    async createTemplate(req, res){
        const {userId, title, tags, html} = req.body
        console.log(pg_client);
        var id = 6;
        var name = 'Bertha';
        pg_client.query(`INSERT INTO company (id_comp, name) VALUES (${id}, '${name}');`, (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                
            }
            pg_client.end();
        });


        res.json({msg: "success"});
        // const newPerson = db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name,surname]);
        // res.json((await newPerson).rows[0]);
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