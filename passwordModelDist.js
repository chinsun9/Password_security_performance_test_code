/*


*/

const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

pwd.passwordModelDistribution('0.2', 'test comment');
