# Password_security_performance_test_code

## Password_security_performance_test_code

### install

#### git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_performance_test_code.git
cd Password_security_performance_test_code
git clone https://github.com/KiHyeon-Hong/Password_security_client.git PasswordSecurity
cd PasswordSecurity
npm install
cd ..
```

### Usage

#### src/performanceTest.js

-   유출된 비밀번호와 유출되지 않은 비밀번호를 랜덤으로 100개를 추출하여 10회씩 예측 수행

```bash
node performanceTest.js
```

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

### files

-   files/leakPasswords.txt: 무작위로 수집한 유출된 비밀번호 목록
-   files/notLeakPasswords.txt: 무작위로 수집한 유출되지 않은 비밀번호 목록
-   PasswordSecurity/: 출입키 암호검증 인공지능 모듈
-   src/performanceTest.js: 키보안레벨 정확도 평가 소스 코드
