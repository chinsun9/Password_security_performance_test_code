const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PasswordSecurityClient = require(__dirname + '/PasswordSecurity');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

app.get('/validation', (req, res, next) => {
    pwd.passwordValidation(req.query.password).then(function (result) {
        res.json(result);
    });
});


const staticDir = path.join(__dirname, './view');
const spaIndex = path.join(staticDir, 'index.html');

app.use(express.static(staticDir));

app.get('*', (_, res) => {
    res.sendFile(spaIndex);
});

app.listen(65001, () => {
    request.get({ url: 'https://api.ipify.org' }, function (err, response, body) {
        console.log('server running at ' + body + ':65001');
    });
});
