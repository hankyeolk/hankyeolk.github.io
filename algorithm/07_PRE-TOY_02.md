---
layout: post
title: "별이 3개인 문제 중 정리가 필요한 문제"
subtitle: "별 3개는 거뜬하게?"
type: "Javascript"
createDate: "2020-07-11"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 7
---

#### 같은 문자가 대,소문자를 구분하지 않고 반복되지 않는 단어, isogram

- 빈 문자열은 isogram 으로 간주한다는 것을 탈출조건으로 해준다.
- 문자의 대,소문자를 구분하지 않기 때문에 미리 toLowerCase()를 해준다.
- 0번 값을 뒤의 요소들과 비교해서 같은게 있으면 false, 그렇지 않다면 재귀로 0번 인덱스를 새롭게 만들어준다.
<br>

```js
   str = str.toLowerCase();

   if (str.length === 0) {
      return true;
   }

   for (let i = 1; i < str.length; i += 1) {
      if (str[0] === str[i]) {
         return false
      }
   }

   // 재귀
   return isIsogram(str.slice(1))
```

<br>

#### 나를 시달리게 했던 runLength 🙃

- ex. wwwggopp 가 인자로 들어오면 결과로 3w2g1o2p 이렇게 반복되는 알파벳의 갯수를 붙인 문자열로 반환해야 한다. 
- 연속되어 반복되지 않으면 갯수 카운트를 다르게 측정해야 한다. (이 부분을 잘 인지 못하고 넵다 반복문을 돌렸다.)
- 0번 인자를 비교대상으로 정하고 0번 부터 뒤에 요소들을 다 비교해서 같으면 임시 빈 배열에 넣는다. 임시 빈 배열의 길이가 해당 문자가 반복되는 정도. 뒤의 요소와 다른 시점에서 break문을 인식한다.
- 임시배열은 반복문에서 초기화 되고, 문자열은 임시 배열 길이만큼 slice 한다.
- 인자로 들어오는 문자열은 단순 알파벳이 붙은 형태이다.
<br>

```js
function runLength(str) {
   let result = [];

   while (str.length !== 0) {
      let temp = [];

      for (i = 0; i < str.length; i += 1) {
         if (str[0] === str[i]) {
            temp.push(str[0])
         } else {
            break
         }
      }

      result.push(temp.length)
      result.push(temp[0])
   }

   return result.join('');
}
```

<br>

#### 숫자만 들어오는 배열 요소들의 합을 가지고 노는 문제

- ex. [1, 2, 6, 13, 54] -> 1+2+6+13 < 54 이기 때문에 true를 반환한다. 이런 배열인지 아닌지를 찾는 문제
- 빈 배열은 true 처리를 하고, 1+2+6 < 13 이렇게 모든 요소에 대해서 조건이 통해야 한다.
- 조건을 하나라도 충족시키지 못하면 false!
<br>

```js
function superIncreasing(arr) {

   if (arr.length < 2) {
      return true;
   }
   if (arr.length === 2) {
      if (arr[0] < arr[1]) {
         return true;
      }
   }

   let sum = arr.slice(0, arr.length - 1).reduce((acc, cv) => {return acc + cv}, 0)

   if (sum < arr[arr.length - 1]) {
      return superIncreasing(arr.slice(0, arr.length - 1))
   } else {
      return false;
   }
}
```
<br>

풀고나서 회고, 사실 위 처럼 복잡하게 풀지 않았어도 될 것 같다. arr의 0번 인덱스와 1번 인덱스를 비교하고 true 이면 그 둘을 더해서 다시 다음 인덱스오 비교하고 하는 식으로 간단하게 풀 수 있지 않았을까 생각한다. 아래에 생각한 간단한 풀이를 적어본다.
<br>

```js
function superIncreasing(arr) {
   let sum = arr[0];
   
   for (let i = 1; i < arr.length; i += 1) {
      if (arr[i] > sum) {
         sum = sum + arr[i]
      } else {
         return false
      }
   }

   return true;
}
```
