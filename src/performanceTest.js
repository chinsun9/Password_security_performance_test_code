/*
 * 평가 항목: 키보안 레벨 정확도
 * 시험 내용: 인공지능 출입키 암호검증 모듈은 비밀번호가 유추당할 확률을 측정하여 보안 수준을 측정한다.
 * 이를 시험하기 위해 무작위로 수집한 비밀번호 목록에 대해 검증을 수행하도록 하고, 미리 정해 둔 각 비밀번호 보안 수준에 대해 올바른 판단을 내리는지 수행한다.
 * 비밀번호 1개당 10회 검증을 수행하며, 모두 올바른 결과로 출력하는지 확인한다.
 */
const PasswordSecurityClient = require(__dirname + '/../PasswordSecurity');
const fs = require('fs');

var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

/*
 * leakPasswords.txt 파일에서 미리 키보안레벨을 라벨링 해놓은 비밀번호 데이터 68,582개를 전처리
 */
var oriDatas = fs.readFileSync(__dirname + '/../files/leakPasswords.txt', 'utf8');
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

/*
 * notLeakPasswords.txt 파일에서 미리 키보안레벨을 라벨링 해놓은 비밀번호 데이터 64,865개를 전처리
 */
oriDatas = fs.readFileSync(__dirname + '/../files/notLeakPasswords.txt', 'utf8');
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

/*
 * 스마트 보안 게이트웨이의 인공지능 출입키 암호검증 모듈을 이용하여 평가한 비밀번호의 보안성을 기록
 * 평가를 위해 로그 파일(performance.log) 생성 및 초기화
 */
fs.writeFileSync(__dirname + '/../files/performance.log', '', 'utf8');

/*
 * 키보안 레벨 정확도 평가 메소드
 * 1개의 비밀번호는 총 10회씩 유출 여부 예측에 사용되며, 100개의 비밀번호에 대해 키보안 레벨 정확도 평가 수행
 * 정확도 평가 결과는 로그 파일(performance.lg)에 저장하고 콘솔로 출력
 */
async function performanceTest() {
    /*
     * 키보안 레벨 정확도 평가를 위해 성공, 실패 기록
     * success: 보안성이 미흡한 비밀번호를 미흡한 비밀번호로 평가하였거나, 보안성이 우수한 비밀번호를 우수한 비밀번호로 평가
     * fail: 보안성이 미흡한 비밀번호를 우수한 비밀번호로 평가하였거나, 우수한 비밀번호를 미흡한 비밀번호로 평가
     */
    let success = 0;
    let fail = 0;

    /*
     * 총 100개의 비밀번호에 대해 키보안 레벨 정확도 평가
     */
    for (let i = 0; i < 100; i++) {
        let testPassword = '';
        let testLeakCount = 0;

        /*
         * 100회의 키보안 레벨 정확도 평가 중 50회는 미흡한 비밀번호, 50회는 우수한 비밀번호에 대해 보안성 평가를 수행
         * 이를 위해, 각 시행횟수가 짝수일 때는 미흡한 비밀번호에서 랜덤으로 비밀번호 데이터를 추출하며, 홀수일 경우에는 우수한 비밀번호에서 랜덤으로 비밀번호 데이터를 추출
         * 보안성이 미흡한 비밀번호는 0으로 라벨링하며, 우수한 비밀번호는 1로 라벨링
         * 예측 결과가 0 ~ 0.5면 미흡한 비밀번호, 0.5 ~ 1이면 우수한 비밀번호로 예측한 것으로 한다.
         */
        if (i % 2 == 0) {
            testPassword = leakString[Math.floor(Math.random() * leakString.length)];
            testLeakCount = 0;
        } else {
            testPassword = notLeakString[Math.floor(Math.random() * notLeakString.length)];
            testLeakCount = 1;
        }

        /*
         * 로그 파일(performance.log)에 비밀번호, 실제 키보안레벨을 기록
         */
        fs.appendFileSync(__dirname + '/../files/performance.log', `===  ${i + 1} 번째 테스트 비밀번호: ${testPassword},  실제 키보안레벨: ${testLeakCount == 0 ? '미흡' : '우수'}  ===\n`, 'utf8');
        console.log(`===  ${i + 1} 번째 테스트 비밀번호: ${testPassword},  실제 키보안레벨: ${testLeakCount == 0 ? '미흡' : '우수'}  ===`);

        /*
         * 랜덤으로 추출한 비밀번호에 대해 키보안레벨 예측 수행
         * 1개의 비밀번호는 10회씩 평가하며, 결과를 로그 파일(performance.log)에 기록하고, 콘솔로 출력
         */
        for (let j = 0; j < 10; j++) {
            await passwordClient.passwordValidation(testPassword).then(function (result) {
                console.log(result);

                fs.appendFileSync(
                    __dirname + '/../files/performance.log',
                    `키보안레벨 테스트 비밀번호: "${testPassword}",  실제 키보안레벨: ${testLeakCount == 0 ? '미흡' : '우수'},  예측 키보안레벨: ${result.predictPoint < 0.5 ? '미흡' : '우수'}`,
                    'utf8'
                );

                if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.5 ? true : false)) {
                    fs.appendFileSync(__dirname + '/../files/performance.log', `,  예측 성공 여부: ${'예측 성공'}\n`, 'utf8');
                } else {
                    fs.appendFileSync(__dirname + '/../files/performance.log', `,  예측 성공 여부: ${'예측 실패'}\n`, 'utf8');
                }

                if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.5 ? true : false)) {
                    console.log(
                        `키보안레벨 테스트 비밀번호: "${testPassword}",  실제 키보안레벨: ${testLeakCount == 0 ? '미흡' : '우수'},  예측 키보안레벨: ${
                            result.predictPoint < 0.5 ? '미흡' : '우수'
                        },  예측 성공 여부: 예측 성공`
                    );
                } else {
                    console.log(
                        `키보안레벨 테스트 비밀번호: "${testPassword}",  실제 키보안레벨: ${testLeakCount == 0 ? '미흡' : '우수'},  예측 키보안레벨: ${
                            result.predictPoint < 0.5 ? '미흡' : '우수'
                        },  예측 성공 여부: 예측 실패`
                    );
                }

                /*
                 * 보안성이 미흡한 비밀번호를 미흡한 비밀번호로 평가하였거나, 보안성이 우수한 비밀번호를 우수한 비밀번호로 평가할 경우 성공
                 * 보안성이 미흡한 비밀번호를 우수한 비밀번호로 평가하였거나, 우수한 비밀번호를 미흡한 비밀번호로 평가할 경우 실패
                 */
                if (j == 9) {
                    if ((testLeakCount == 0 ? true : false) == (result.predictPoint < 0.5 ? true : false)) {
                        fs.appendFileSync(__dirname + '/../files/performance.log', `===  예측 성공 여부: ${'예측 성공'}  ===\n\n`, 'utf8');
                        console.log(`===  예측 성공 여부: ${'예측 성공'}  ===\n\n`);

                        success++;
                    } else {
                        fs.appendFileSync(__dirname + '/../files/performance.log', `===  예측 성공 여부: ${'예측 실패'}  ===\n\n`, 'utf8');
                        console.log(`===  예측 성공 여부: ${'예측 실패'}  ===\n\n`);

                        fail++;
                    }
                }
            });
        }
    }

    /*
     * 100회의 키보안 레벨 정확도 평가 후 결과를 로그 파일(performance.log)에 기록하고 콘솔로 출력
     */
    fs.appendFileSync(__dirname + '/../files/performance.log', `예측 성공: ${success}회, 예측 실패: ${fail}회, 예측 정확도 ${(success / (success + fail)) * 100}%`, 'utf8');
    console.log(`예측 성공: ${success}회, 예측 실패: ${fail}회, 예측 정확도 ${(success / (success + fail)) * 100}%`);
}

/*
 * 키보안 레벨 정확도 평가 수행
 */
performanceTest();
