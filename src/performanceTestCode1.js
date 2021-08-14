const PasswordSecurityServer = require('@kihyeon-hong/password_security_server');
const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
const fs = require('fs');

var passwordServer = new PasswordSecurityServer.PasswordSecurity.PasswordSecurity();
var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

/*
    키보안레벨정확도
    정확도 80%, 1개당 10번 검증하고 총 100개 비밀번호(랜덤으로 추출)
    
 */

var oriDatas = fs.readFileSync(__dirname + '/../files/updateLeakPasswordFeatures.txt', 'utf8');
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

oriDatas = fs.readFileSync(__dirname + '/../files/updateNotLeakPasswordFeatures.txt', 'utf8');
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

fs.writeFileSync(__dirname + '/../files/performanceTestLog.log', '', 'utf8');

async function performanceTest() {
    let success = 0;
    let fail = 0;

    for (let i = 0; i < 100; i++) {
        let testPassword = '';
        let testLeakCount = 0;

        if (i % 2 == 0) {
            testPassword = leakString[Math.floor(Math.random() * leakString.length)];
            testLeakCount = 0;
        } else {
            testPassword = notLeakString[Math.floor(Math.random() * notLeakString.length)];
            testLeakCount = 1;
        }

        fs.appendFileSync(__dirname + '/../files/performanceTestLog.log', `=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===\n`, 'utf8');
        console.log(`=== 테스트 데이터: ${testPassword}, 실제 유출 여부: ${testLeakCount == 0 ? true : false} ===`);

        for (let j = 0; j < 10; j++) {
            await passwordClient.passwordValidation(testPassword).then(function (result) {
                fs.appendFileSync(__dirname + '/../files/performanceTestLog.log', `${j + 1} 번째 유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}\n`, 'utf8');
                console.log(`${j + 1} 번째 유출 여부 예측: ${result.predictPoint < 0.6 ? true : false}`);

                if (j == 9) {
                    if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.6 ? true : false)) {
                        fs.appendFileSync(__dirname + '/../files/performanceTestLog.log', `=== 예측 성공 여부: ${true} ===\n\n`, 'utf8');
                        console.log(`=== 예측 성공 여부: ${true} ===\n\n`);

                        success++;
                    } else {
                        fs.appendFileSync(__dirname + '/../files/performanceTestLog.log', `=== 예측 성공 여부: ${false} ===\n\n`, 'utf8');
                        console.log(`=== 예측 성공 여부: ${false} ===\n\n`);

                        fail++;
                    }
                }
            });
        }
    }

    fs.appendFileSync(__dirname + '/../files/performanceTestLog.log', `예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`, 'utf8');
    console.log(`예측 성공: ${success}, 예측 실패: ${fail}, 예측 정확도 ${(success / (success + fail)) * 100}%`);
}

performanceTest();
