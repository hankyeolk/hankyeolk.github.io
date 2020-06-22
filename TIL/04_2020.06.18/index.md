---
layout: post
title: "TIL 4일차"
subtitle: ""
type: "TIL"
createDate: "2020-06-15"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 4
---

#### 메소드 계속

`Array.from(문자열 or 반복이 되는 요소)` → 문자열을 넣으면 단위 문자로 쪼개고 배열로 생성하여 뱉는다. (배열도 넣을 수 있음)

```js
Array.from([1, 2, 3], x => x + x));
// 함수형으로 사용할 수 있다.
// expected output: Array [2, 4, 6]
```

<br>

`Object.keys(객체)` → 해당 객체의 키들을 '문자열' 배열로 변환 → reduce 와 같은 배열의 메소드를 적극 활용할 수 있다.

```js
var obj = {
  apple: 500,
  grape: 2000,
  berry: 30,
};

var sum = Object.keys(obj).reduce(function (pre, value) {
  return pre + obj[value];
}, 0); // 객체 키들의 값을 다 더한 것.
```

<br>

이후에는 코플릿 문제 풀이에 집중.
