/*
    스마트 보안관제 서버 주소 설정 코드
*/

const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

pwd.serverAddressUpdate('100.25.199.10:65001');
