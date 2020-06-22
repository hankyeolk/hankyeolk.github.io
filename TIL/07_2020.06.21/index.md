---
layout: post
title: "TIL 7일차"
subtitle: "재귀함수와 바빌로니아..."
type: "TIL"
createDate: "2020-06-21"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 7
---

### Today's key 🔑

- 제곱근을 구하는 메소드인 `Math.sqrt()` 를 함수로 직접 만들어보기
- 재귀함수를 이용한 알고리즘 문제 풀이

<br>

### 머리 뽀개기 🔥

> 바빌로니아의 점화식을 이용할 수 있는지 모르겠는 제곱근 구하기 문제

- 주어진 숫자의 제곱근을 `Math.sqrt()` 메소드 활용 없이 찾아내는 함수를 만들어 가는 과정은 생각보다 어려웠다. 함수를 구축하는 과정을 수시로 반복하여 머리속에 그려볼 수 있어야 할 것 같다.

- 1.애초에 시작하는 추정값을 0으로 잡자!

```js
function mySqrt(num) {

   // 0 * 0 = 0 이기 때문에 0을 초기값으로 설정했다.
   let guess = 0;
```

<br>

- 2.제곱을 시행한 다음 내가 원하는 제곱근을 찾았는지 확인하자
- 내가 가정한 추정값의 제곱이 num 보다 작거나 같으면 0.001을 더해가자

```js
while (guess * guess <= num) {
  guess += 0.001;
}
```

<br>

- 3.반복문이 완료되어 제곱근의 근사치가 구해지면 소숫점 2자리의 숫자로 표현하자.
- `number.toFixed(자릿수)` 메소드는 '문자열'을 뱉는 다는 것을 잘 알자.

```js
return Number(guess.toFixed(2));
```
