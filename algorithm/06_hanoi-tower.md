---
layout: post
title: "자바스크립트를 이용한 하노이탑 풀이"
subtitle: "재귀는 끝이 없다."
type: "Javascript - 재귀"
createDate: "2020-07-10"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 6
---

하노이의 탑은 어린 아이들의 사고력을 키우기 위해서 고리를 옮기는 블록으로 유명하다. 이 문제는 사실 재귀의 개념을 사용하는 알고리즘에서 가장 유명하다. 나도 예전에 파이썬 언어를 배울 때 풀었던 기억이 있다. 그래서 자바스크립트 언어를 이용해서 하노이의 탑을 풀어보고자 한다. 하노이의 탑은 총 옮겨진 횟수를 찾을 수도 있고, 이동 경로 자체를 배열로 담아낼 수 있다. 그러면 start 🚀
<br>

**문제를 잘라서 생각해보기 01** 하노이의 탑은 보통 3개의 기둥을 기준으로 한다. 1번, 2번, 3번 기둥이 있다. 각각의 기둥 이름을 start, by, end 로 지정한다. 우선, 고리가 하나인 경우에는 start에서 end로 넘겨주면 된다. 고리의 개수는 n개로 받고, 시작 기둥은 1, 마지막 결과가 쌓일 기둥은 3이다.
<br>

```js
function putNumber(n) {

   const result = [];

   hanoi(n, start, end) {
      // 고리가 1개일 경우에는 1번 기둥 -> 3번 기둥으로 단순 이동
      if (n === 1) {
         result.push([start, end]);
      }
   }

   hanoi(n, 1, 3)
   return result;
}
```
<br>

**문제를 잘라서 생각해보기 02** 고리가 2개 이상일 경우에 코드가 가낭 중요하다. 쪼개서 생각해볼 때, 고리가 2개이면 작은 고리를 2번에 넣고, 긴 것을 3번에 넣고, 다시 작은 고리를 3번으로 옮기면 된다. 그러면 우리는 중간에 있는 기둥에 대한 정의를 해주어야 하고, n이 2개 이상인 경우에는 해당 중간 기둥(by, 2번 기둥)을 이용하는 코드를 작성한다. 기둥은 각각 1, 2, 3 이라는 번호가 있기 때문에 총 6에서 start와 end를 빼주면 by의 번호가 나온다.
<br>

```js
   hanoi(n, start, end) {
      // 중간의 기둥에 대한 설정을 한다.
      const by = 6 - start - end;

      if (n === 1) {
         result.push([start, end])
      } else {
         hanoi(n - 1, start, by)
         ...
      }
   }
```
<br>

**문제를 잘라서 생각해보기 03** 가장 위의 고리를 중간으로 옮겼으면 아래에 있는 고리를 무조건 3번(end)으로 보내야 한다. 그리고 다시 중간 기둥(2번, by)에 있는 친구를 3번으로 옮겨준다. 그러면 완성!
<br>

```js
   ...
   else {
      hanoi(n - 1, start, by)
      result.push([start, end])
      hanoi(n - 1, by, end)
   }

   // 3개의 고리를 1 -> 3번 기둥에 옮겨라
   hanoi(3, 1, 3)

   return result.length
   // length를 하면 총 이동 횟수를 알 수 있다.
```
