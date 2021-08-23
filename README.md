# Password_security_performance_test_code

## Password_security_performance_test_code

### install

#### ./.npmrc

```text
//npm.pkg.github.com/:_authToken=발급받은 ReadOnly_key
@kihyeon-hong:registry=https://npm.pkg.github.com/
```

#### npm install

```bash
npm install
```

### Usage

#### mainController.js

-   학습된 모델의 가중치와 구조를 받아 올 서버 주소와 포트

```javascript
pwd.serverAddressUpdate('100.25.199.10:65001');
```

-   받아올 모델의 버전과 코멘트

```javascript
pwd.passwordModelDistribution('0.2', 'test comment');
```

-   받아온 모델을 이용하여 비밀번호 유출 여부 예측

```javascript
pwd.passwordValidation('pds$66wo@d').then(function (result) {
    console.log(result);

    pwd.passwordValidation('q1w2e3r4').then(function (result) {
        console.log(result);
    });
});
```

#### src/performanceTestCode.js

-   유출된 비밀번호와 유출되지 않은 비밀번호를 랜덤으로 100개를 추출하여 10회씩 예측 수행

```text
=== 테스트 데이터: krek, 실제 유출 여부: 유출된 비밀번호 ===
1 번째 유출 여부 예측: 유출된 비밀번호
2 번째 유출 여부 예측: 유출된 비밀번호
3 번째 유출 여부 예측: 유출된 비밀번호
4 번째 유출 여부 예측: 유출된 비밀번호
5 번째 유출 여부 예측: 유출된 비밀번호
6 번째 유출 여부 예측: 유출된 비밀번호
7 번째 유출 여부 예측: 유출된 비밀번호
8 번째 유출 여부 예측: 유출된 비밀번호
9 번째 유출 여부 예측: 유출된 비밀번호
10 번째 유출 여부 예측: 유출된 비밀번호
=== 예측 성공 여부: 예측 성공 ===

=== 테스트 데이터: RILGTCCLi, 실제 유출 여부: 유출되지 않은 비밀번호 ===
1 번째 유출 여부 예측: 유출되지 않은 비밀번호
2 번째 유출 여부 예측: 유출되지 않은 비밀번호
3 번째 유출 여부 예측: 유출되지 않은 비밀번호
4 번째 유출 여부 예측: 유출되지 않은 비밀번호
5 번째 유출 여부 예측: 유출되지 않은 비밀번호
6 번째 유출 여부 예측: 유출되지 않은 비밀번호
7 번째 유출 여부 예측: 유출되지 않은 비밀번호
8 번째 유출 여부 예측: 유출되지 않은 비밀번호
9 번째 유출 여부 예측: 유출되지 않은 비밀번호
10 번째 유출 여부 예측: 유출되지 않은 비밀번호
=== 예측 성공 여부: 예측 성공 ===

...

예측 성공: 94회, 예측 실패: 6회, 예측 정확도 94%
```

#### src/performanceLeakAllTest.js

-   유출된 비밀번호에 대해 모든 예측 수행 (1회씩)

```text
=== 테스트 데이터: yandro, 실제 유출 여부: true ===
유출 여부 예측: true
=== 예측 성공 여부: true ===

=== 테스트 데이터: 98085, 실제 유출 여부: true ===
유출 여부 예측: true
=== 예측 성공 여부: true ===

=== 테스트 데이터: asd1, 실제 유출 여부: true ===
유출 여부 예측: true
=== 예측 성공 여부: true ===
```

#### src/performanceNotLeakAllTest.js

-   유출되지 않은 비밀번호에 대해 모든 예측 수행 (1회씩)

```text
=== 테스트 데이터: ccrjk11332, 실제 유출 여부: false ===
유출 여부 예측: false
=== 예측 성공 여부: true ===

=== 테스트 데이터: hq6JWSKIGANS%*, 실제 유출 여부: false ===
유출 여부 예측: false
=== 예측 성공 여부: true ===

=== 테스트 데이터: FREMONTBOBBR12&#, 실제 유출 여부: false ===
유출 여부 예측: false
=== 예측 성공 여부: true ===
```
