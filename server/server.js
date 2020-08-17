const express = require("express");
const app = express();

// const email_functions = require('./additional_js/emails');

const env = require('dotenv').config({path: __dirname + '/.env'})


// const nodemailer = require('nodemailer');



const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const { resolve } = require("path");


app.use(express.static(process.env.STATIC_DIR));
app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});




app.post('/contact',  async (req, res) => {
    await email_functions.send_contactUs_email(req.body, res);
});


app.get("*", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});

app.listen(process.env.PORT, () => console.log(`Node server listening on port ${process.env.PORT}!`));