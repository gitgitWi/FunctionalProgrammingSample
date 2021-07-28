# [인프런 함수형 프로그래밍](https://www.inflearn.com/course/functional-es6) 수강 후 개인적으로 실습한 내용 저장

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/fp-210727)

- `JavaScript` 코드 -> `TypeScript` 코드로 바꿔 봄
- `finnhub.io` API 활용, Amazon 최근 1년 일봉 차트 데이터 활용

## 회고

- 눈으로만 빠르게 강의를 들었을 때는 설명도 깔끔하고 코드도 길지 않아서 좋았음
  - 특히 병렬 프로그래밍 부분에서는 엄청난 깨달음을 얻은 느낌이었음

- 그런데 막상 실습을 해보니, 역시나 쉽게 활용하기 꽤 어려웠음
  - 당연히, 아직 익숙한 코드 구조가 아니어서 그럴듯
  - `pipe`, `go`를 사용해서 함수들을 합성하는 것이 중요한데, 처음에 잡은 코드 구조(인자 배열 순서)가 계속 반복되기 때문에 이게 익숙하지 않으면 갈수록 코드가 어떻게 돌아가는 건지 파악하기 어려워짐
    - 코드가 간결해서 오히려 잘 모르면 파악하기 더 어려운 듯한..?
  - 강의 코드 구조가 강력한 컨벤션에 바탕한 것이 아니라면, 강의 코드를 바탕으로 좀더 알아보기 편하게 변화시켜 볼 필요는 있을 것 같음

- 그러다보니 FP에 익숙한 FE 개발자들이 많지는 않을 것 같기도 하고, 팀에서 유지 보수 가능한 코드를 만들 수 있을지 의문

- 사용성도 약간 의문
  - 잘 쓰면 당연히 좋을텐데, 프로젝트 전반적인 구조보다는 데이터 정제나 탐색 등 정도에서 사용할 수 있을 듯
  - 강의 내용도 `iterable` 객체를 어떻게 다룰 것인가에 초점이 맞춰져있음
  - 서버 API에서 클라이언트에 데이터 보내기 전에 클라이언트가 다루기 쉽게 JSON 만들때 등등
  - 알고리즘 문제 풀 때도 좋을 것 같음
