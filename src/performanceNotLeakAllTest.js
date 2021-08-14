const PasswordSecurityServer = require('@kihyeon-hong/password_security_server');
const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
const fs = require('fs');

var passwordServer = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

var oriDatas = fs.readFileSync(__dirname + '/../files/updateNotLeakPasswordFeatures.txt', 'utf8');
oriDatas = oriDatas.split('\n');

datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var notLeakString = [];
var notLeakDataValue = [];

for (let i = 0; i < datas.length - 1; i++) {
    notLeakString[i] = datas[i].split(',')[0];
    notLeakDataValue[i] = 1;
}

fs.writeFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', '', 'utf8');

async function performanceTest() {
    let success = 0;
    let fail = 0;

    for (let i = 0; i < notLeakString.length; i++) {
        let testPassword = '';
        let testLeakCount = 0;

        testPassword = notLeakString[Math.floor(Math.random() * notLeakString.length)];
        testLeakCount = 1;

        fs.appendFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', `=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===\n`, 'utf8');
        console.log(`=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===`);

        await passwordClient.passwordValidation(testPassword).then(function (result) {
            fs.appendFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', `유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}\n`, 'utf8');
            console.log(`유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}`);

            if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.6 ? true : false)) {
                fs.appendFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', `=== 예측 성공 여부: ${true} ===\n\n`, 'utf8');
                console.log(`=== 예측 성공 여부: ${true} ===\n\n`);

                success++;
            } else {
                fs.appendFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', `=== 예측 성공 여부: ${false} ===\n\n`, 'utf8');
                console.log(`=== 예측 성공 여부: ${false} ===\n\n`);

                fail++;
            }
        });
    }

    fs.appendFileSync(__dirname + '/../files/performanceNotLeakAllTestLog.log', `예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`, 'utf8');
    console.log(`예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`);
}

performanceTest();
