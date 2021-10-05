const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

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

app.listen(65001, () => {
    request.get({ url: 'https://api.ipify.org' }, function (err, response, body) {
        console.log('server running at ' + body + ':65001');
    });
});
