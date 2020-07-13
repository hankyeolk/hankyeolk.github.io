---
layout: post
title: "별이 4개인 문제 정리 02"
subtitle: "소수 이용하기"
type: "Javascript"
createDate: "2020-07-12"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 9
---

### 몇 번째 소수 구하기 

- ex. n = 16 으로 주어지면 2부터 시작하여 16번째인 소수 53을 리턴해야 한다.
- 소수인지 아닌지를 알 수 있는 함수가 필요할 것이다.

<br>

솔직하게 고백해서, 1이 소수라고 생각했다. 그래서 몇 번의 오류가 났다. 이런 초등 수학도 배우지 못한.. 소수는 자기 자신과 1만 약수로 가지는 수이다. 그래서 1은 소수가 될 수 없다. 
<br>
이 문제를 해결하기 위해서는 약수 성질을 이용해서 소수인지 아닌지를 구분하는 함수가 필요했다. 나름대로 함수를 작성했지만, 나중에 더 깔끔한 함수를 발견했다. 일단 내가 생각해서 작성한 소수 구별 함수를 아래에 적는다.
<br>

```js
function onlyTwo(num) {
   
   if (num < 2) {
      return false
   
   } else {
      let temp = [];
      for (let i = 1; i <= num; i += 1) {
         if (num % i === 0) {
            temp.push(i)
         }
      }

      if (temp.length === 2) {
         return true;
      } else {
         return false;
      }
   }

}
```
<br>

반복문으로 완성된 temp의 길이가 2라면, 자기 자신과 1만 들어 있다는 사실을 알 수 있다. 이 점을 이용했다. 이제 문제에 대한 코드를 작성하려고 한다. 소수를 구별하는 함수가 잘 작성되었다면, 문제에 대한 코드는 이해하기 쉽다.
<br>

```js
function primeMover(n) {

   let result = [];
   let check = 2; // 소수는 2부터 시작이기에 점검하는 수를 2로 시작!

   // n === 0 이 되는 시점에 반복문이 끝난다.
   while (n !== 0) {
      if (onlyTwo(check) === true) {
         result.push(check)
         n -= 1;
      }
      check += 1
   }

   return result[result.length - 1]
}
```