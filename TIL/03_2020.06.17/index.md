---
layout: post
title: "TIL 3일차"
subtitle: "자료를 다루는 기술, 메소드"
type: "TIL"
createDate: "2020-06-17"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 3
---

#### 문자열 메소드

- `.slice()` → 문자열의 일부를 추출하는 것

- `.trim()` → 문자열 **양 끝의 공백** 제거

- 정규표현식 (어렵다) → 계속 공부할 필요가 있어 보인다.
  ![정규표현식 관련 블로그 바로가기](https://beomy.tistory.com/21)

<br>

#### 숫자형 메소드

- `.isInteger(값)` → 정수인지 아닌지 여부를 검사 // → 정수이면 true;

- `.parseInt(값)` → 들어온 값을 정수로 파싱하는 것, 문자열이 들어오면 NaN;

- `.parseInt(값, 진법)` → 진법으로 변환시에도 사용, 10진법이어도 10을 넣는 것이 권장.

- `.parseFloat(값)` → 들어온 값을 실수로 파싱하는 것, 문자열이 들어오면 NaN;

- `.toFixed(남길 소숫점 자릿수)` → 기본은 소숫점 자리 없이 반올림, 이전 소숫점에서 반올림.

<br>

#### Math.메소드()

- `Math.min(값들) / Math.max(값들)` → 최솟값, 최상값

- `Math.floor(값)` → 내림

- `Math.round(값)` → 반올림

- `Math.random()` → 0~1 사이의 난수를 리턴

- `Math.pow(base, exponent)` → base ^^ exponent; 제곱을 찾는 메소드

- `Math.sqrt(값)` → 값의 '제곱근' 호출

- `Math.abs(값)` → 값의 '절대값' 호출

<br>

#### 배열의 메소드

- `Array.isArray(배열) → true` → 배열이 input 되면 true 를 뱉는 메소드

- 배열`.indexOf(element)` → 해당 **element의 인덱스 값**을 뱉는다. / 없는 element는 -1 리턴

- 배열`.includes(element)` → 해당 element 가 있는지 없는지 true, false 리턴

- 배열`.join()` → 배열의 요소들을 합쳐서 하나의 문자열로 만드는 메소드 (기본값은 ,로 구분)

- `.push(element)` → 맨 마지막에 element를 삽입

- `.pop()` → 맨 마지막 요소를 배열에서 삭제

- `.shift()` → 맨 앞의 요소를 배열에서 삭제

- `.unshift(element)` → 배열 맨 앞에 요소 추가

- `.concat()` → immutable, 서로 다른 두 배열을 합치는 메소드. 순서대로 붙인다. 중복 등은 신경 안쓴다.

- 배열 `.slice()` → 원본 배열 손상 없이 똑같이 복제
- `.slice(시작 인덱스, 마지막 인덱스 + 1)` → 쪼개서 찾을 배열을 범위별로 자른다.

<br>

#### 배열의 함수형 메소드 (forEach, map, filter, reduce)

- 배열에 사용되는 함수형 메소드는 파라미터로, 결국 배열의 요소 하나하나를 가르킨다고 할 수 있다.

- `배열.forEach(함수)` → 배열을 반복하는 방법인데, 만들어둔 유틸리티 함수를 통해서 배열의 정보를 손쉽게 가져오는 방법

```js
let arr = ["a", "b", "c"];
function foreach(word) {
  // 파라미터에는 현재 배열의 값, 인덱스, 원본 배열 순이다.
  return word;
}

arr.forEach(foreach); // -> a, b, c 값을 하나씩 가지고 온다.
```

- `배열.map()` → immutable, 원본 배열과 길이는 같지만 형태가 다른 배열을 만들 때 주로 활용

```js
let arr = ["a", "b", "c"];
arr.map(function (word) {
  //파라미터는 .forEach 메소드와 동일하다.
  return word;
}); //-> [a, b, c]
```

- `배열.filter()` → 만들어진 함수에서 조건을 복사한다. immutable

```js
let arr = ["a", "b", "c"];
function getB(word) {
  return word === "b";
}

arr.filter(getB); // -> ['b']
```

- `배열.reduce(reducer <- 함수명, 초기값)` → 배열을 합치기 위한 메소드, 배열의 요소들을 특정 기준으로 합쳐 새로운 하나의 값으로 만드는 함수형 메소드.

```js
// 리듀스 메소드를 활용하기 위해 사용되는 함수 'reducer'
function reducer(accumulator, value, index, array) {
  return accumulator; // 리턴값이 누적값으로 된다는 사실을 기억하자.
}

// 리듀스 사용
array.reduce(reducer, [초기값]);
```
