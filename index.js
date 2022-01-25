const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));


const docsRouter = require('./routers/docs')
app.use('/api', docsRouter)

app.listen(3000, () =>{
    console.log("Server is works on port 3000")
})