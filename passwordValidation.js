/*
    비밀번호 보안성 예측모델 예시 코드
*/

const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

pwd.passwordValidation('q1w2e3r4').then(function (result) {
    console.log(result);
});
