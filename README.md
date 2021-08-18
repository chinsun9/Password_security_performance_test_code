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

#### src/performanceTestCode1.js

-   유출된 비밀번호와 유출되지 않은 비밀번호를 랜덤으로 100개를 추출하여 10회씩 예측 수행

#### src/performanceLeakAllTest.js

-   유출된 비밀번호에 대해 모든 예측 수행 (1회씩)

#### src/performanceNotLeakAllTest.js

-   유출되지 않은 비밀번호에 대해 모든 예측 수행 (1회씩)
