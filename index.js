const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const morgan = require('morgan');

const pdfTemplate = require('./documents/htmlTemplate');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(3000, () =>{
    console.log("Server is working...")
})