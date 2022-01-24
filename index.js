const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const morgan = require('morgan')

const pdfTemplate = require('./documents');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));



app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})



app.listen(3000, () =>{
    console.log("Server is working...")
})