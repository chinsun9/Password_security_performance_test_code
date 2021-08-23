const PasswordSecurityServer = require('@kihyeon-hong/password_security_server');
const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
const fs = require('fs');

var passwordServer = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

var oriDatas = fs.readFileSync(__dirname + '/../../files/updateLeakPasswordFeatures.txt', 'utf8');
oriDatas = oriDatas.split('\n');

var datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var leakString = [];
var leakDataValue = [];

for (let i = 0; i < datas.length - 1; i++) {
    leakString[i] = datas[i].split(',')[0];
    leakDataValue[i] = 0;
}

fs.writeFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', '', 'utf8');

async function performanceTest() {
    let success = 0;
    let fail = 0;

    for (let i = 0; i < leakString.length; i++) {
        let testPassword = '';
        let testLeakCount = 0;

        testPassword = leakString[i];
        testLeakCount = 0;

        fs.appendFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', `=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===\n`, 'utf8');
        console.log(`=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===`);

        await passwordClient.passwordValidation(testPassword).then(function (result) {
            console.log(result);

            fs.appendFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', `유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}\n`, 'utf8');
            console.log(`유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}`);

            if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.6 ? true : false)) {
                fs.appendFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', `=== 예측 성공 여부: ${true} ===\n\n`, 'utf8');
                console.log(`=== 예측 성공 여부: ${true} ===\n\n`);

                success++;
            } else {
                fs.appendFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', `=== 예측 성공 여부: ${false} ===\n\n`, 'utf8');
                console.log(`=== 예측 성공 여부: ${false} ===\n\n`);

                fail++;
            }
        });
    }

    fs.appendFileSync(__dirname + '/../../files/performanceLeakAllTestLog.log', `예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`, 'utf8');
    console.log(`예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`);
}

performanceTest();
