/*
    스마트 보안관제 서버에서 학습한 비밀번호 보안성 예측모델의 가중치와 구조 다운로드 코드
*/

const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

pwd.passwordModelDistribution('0.2', 'test comment');
