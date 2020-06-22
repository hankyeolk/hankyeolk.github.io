---
layout: post
title: "TIL 6일차"
subtitle: "재귀함수와 if 조건문의 습격"
type: "TIL"
createDate: "2020-06-20"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 6
---

### Today's key 🔑

- 재귀를 이용하여 알고리즘 문제를 해결할 수 있다.
- 규칙이 있는 조건에 대해서 적극적으로 생각할 수 있다.

<br>

### 머리 뽀개기 🔥

> % 연산자를 이용하지 않고 숫자의 나머지 구하기

자바스크립트에서 % 연산자는 두 수의 나머지를 구해주는 아주 훌륭한 연산자다. 오늘 풀어본 문제는 이 % 연산자 없이 함수에 들어온 인자의 나머지를 구하는 알고리즘 문제였다.

```js
function modulo(num1, num2) {
  // 1. 둘 중 하나가 NaN 인지 아닌지
  if (num1 === NaN || num2 === NaN) {
    return NaN;
  } else {
    // 2. num1, num2 가 특정 값을 리턴할 때.
    if (num1 === 0) {
      return 0;
    } else if (num2 === 0) {
      return NaN;
    } else if (num1 === 1) {
      return 1;
    } else if (num1 === -1) {
      return -1;
    } else if (num1 === num2) {
      return 0;

      // 3. 본격적으로 함수의 두 인자의 크기를 비교하자
    } else if (num1 > num2) {
      if (num1 > 0 && num2 < 0) {
        let numPlus2 = num2 * -1;
        return num1 - Math.floor(num1 / numPlus2) * numPlus2;
      } else if (num1 > 0 && num2 > 0) {
        return num1 - Math.floor(num1 / num2) * num2;
      } else if (num1 < 0 && num2 < 0) {
        return num1;
      }
    } else if (num1 < num2) {
      if (num1 > 0 && num2 > 0) {
        return num1;
      } else if (num1 < 0 && num2 > 0) {
        let numPlus = num1 * -1;
        return (numPlus - Math.floor(numPlus / num2) * num2) * -1;
      } else if (num1 < 0 && num2 < 0) {
        let numPlus = num1 * -1;
        let numPlus2 = num2 * -1;
        return (numPlus - Math.floor(numPlus / numPlus2) * numPlus2) * -1;
      }
    }
  }
}
```

- 위의 문제를 풀면서 아직도 알고리즘을 명확한 기준과 폭 넓은 구조로 생각하지 못한다는 것을 알았다.
- 더불어, 수학을 배울 때, '나머지'에 대해서 얼마나 무관심 했는지 알게 되었다.

아래는 동일한 문제를 쪼개서 명확하게 작성하려고 노력한 흔적이다.

1. num2 가 NaN 이거나 0 일 경우 -> return NaN

```js
if (isNaN(num2) || num2 === 0) {
  return NaN;
}
```

2. 절대값의 크기를 서로 비교하고 서로의 차이를 이용할 예정이기 때문에 +/- 기호를 변수로 만들어준다.

```js
// 절대값 형성 이전에 +/- 를 미리 구분해준다.

let plusMinus =
  if (num1 > 0) {
     return 1
  } else {
     return -1
  }
```

3. `Math.abs()` 메소드를 활용해서 두 수의 절대값을 표현한다.

```js
num1 = Math.abs(num1);
num2 = Math.abs(num2);
```

4. 비교를 위한 반복문 작성하기

```js
while (num1 >= num2) {
  num1 = num1 - num2;
}

// num1이 음수라면 나머지 값이 음수로 나오게 된다.
return num1 * plusMinus;
```
