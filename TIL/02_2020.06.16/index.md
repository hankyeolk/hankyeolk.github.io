---
layout: post
title: "TIL 2일차"
subtitle: "코드스테이츠 Full Pre 5기 과정을 시작하면서"
type: "TIL"
createDate: "2020-06-15"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 2
---

**pseudocode** : 프로그램의 절차 하나하나를 우리가 실제로 사용하는 일반 언어를 이용해서 작성하는 것

<br>

**Javascript 공부를 하면서 '모르는 것'을 잘 검색하는 방법**

- MDN + 검색하고자 하는 것
- 자연어 형태로 검색하기 `how to ~ in javascript`
- 키워드 기반으로 검색하기
- 콘솔창에 뜨는 에러 자체를 구글에 검색해보기

<br>

#### 배열

```js
//선언과 할당 방법
let 배열이름 = [요소, 요소, ...]
배열이름[인덱스 번호]; // 해당 인덱스에 맞는 값 조회
배열이름[인덱스 번호] = 값 // 배열에 해당 인덱스의 값을 변경

// 이차원 배열을 표현
let list = [
	[요소, 요소, ..],
	[요소, 요소, ...]
]  // 이렇게 여러 배열을 설정할 수 있다.

list[인덱스][인덱스] // -> 이차원 배열의 값을 알 수 있다.

array이름.length; // 배열의 길이
// 배열의 길이를 벗어난 인덱스를 호출하면 -> undefined
array이름.push(값); // 배열 마지막에 추가 //.명령() -> method 라고 한다.
array이름.pop(); // 배열 마지막 요소 삭제
```

<br>

#### 반복문

for 구문

- 반복할 조건에 대해서 '초기화', '조건식', '증감문' 순서로 넣어준다.
- for 괄호 안에서 각 조건에 대해 ';'로 구분

```js
// for 구문
let sum = 1;
for (let n = 2; n <= 4; n = n + 1) {
  sum = sum + n;
}

// while 구문
let sum = 1;
let n = 2;
while (n < 5) {
  sum = sum + n;
  n = n + 1;
}
```

<br>

#### 데이터 끝판왕, 객체

- 객체를 선언하고 할당하는 방법 중에서 'Dot notation'과 'Bracket notation'을 학습했다.

```js
let user = {
	firstName: 'hk',
	lastName: 'kang',
	email: 'hkkang@dd.com',
	city: 'seoul'
};

객체 값을 사용하는 방법
1. Dot notation
객체 이름.키 이름
user.firstName;
user.city;

2. Bracket notation
객체 이름['키 이름'];

user['firstName'];
user['city'];

// 객체 생성과 값 할당하기
객체명['추가 키'] = '추가 값';
객체명.추가키 = 추가 값 / ['배열형태도', '가능해요']

delete 객체명.삭제할키명
'키 값' in 객체명 // 객체 안에 해당 값이 있는지 true or false 조회
```

<br>

#### 문자열 메소드

- 메소드 : .함수() 형태로 사용된다. 자료를 기반으로 해당하는 데이터를 쉽게 조작할 수 있게 도와주는 특별한 함수
- 문자열의 경우 배열과 비슷하게 '인덱스' 기반으로 조회할 수 있지만, 해당 인덱스의 값 자체는 변경할 수 없다.

```js
let str = "test";
str[0] = k; // -> 'kest' 가 되는 것은 아니다.
```

- `.indexOf(찾을 값);` → 찾고자 하는 값의 인덱스가 없으면 **-1** 호출

- `.lastIndexOf(찾을 값);` → 찾고자 하는 값을 **뒤에서 부터** 찾는다.

- `.includes(찾을 값);` → 값이 있는지 없는지 true / false

- `.split(분리 기준의 문자열)` → 문자열을 분리 기준으로 쪼개어 배열로 반환한다. ('\n') 줄바꿈

- `.substring(시작 인덱스, 끝 인덱스)` → 마지막 인덱스는 포함하지 않고 해당 인덱스 범위의 문자열을 긁어온다.

- `.toLowerCase()` → 소문자 변형

- `.toUpperCase()` → 대문자 변형

- immutable : 원본 값이 변하지 않는다. 변하지 않는 값을 리턴한다.
- 문자열 메소드는 모두 immutable
- 메소드로 추출된 문자열의 데이터를 활용하기 위해서는 변수에 직접 다시 할당해주어야 한다.
