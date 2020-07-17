---
layout: post
title: "자바스크립트로 정렬하기"
subtitle: "계수 정렬에 대해서"
type: "정렬 시리즈"
createDate: "2020-07-17"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 12
---

#### 정렬하기와 자료구조에 대한 블로깅은 ZeroCho님의 블로그 포스트에서 많은 도움을 얻었습니다. 감사합니다. 

[ZeroCho님 블로그 방문하기](https://www.zerocho.com/category/Algorithm/post/57e22a778d6bcf0015231c8b)
<br>

### 정렬할 수 중 가장 큰 값을 알고 요소의 갯수합을 이용한 정렬, 계수정렬

- 이름만 들어도 생소하다.
- 배열의 요소중 가장 큰 값을 알아야 한다. 
- 모든 요소의 갯수를 저장할 공간을 만들고, 0으로 채워준다.
- 배열의 요소들의 갯수를 처음부터 세어서 0으로 만들어놓은 자리에 채워준다. 
- 갯수를 저장한 것을 누적합으로 바꿔주고 누적합에 기반하여 숫자들을 정렬한다. 

말로는 너무 어렵다. 코드를 보면서 이해해보자.

<br>

```js
function countingSort(array, k) {
// k는 배열에서 가장 큰 수이다.
   let count = [], result = [];

   // 갯수를 넣을 공간에 0으로 집어넣는다.
   for (let i = 0; i <= k; i += 1) {
      count[i] = 0;
   }

   // 배열 요소들의 갯수를 세어서 count에 반영
   for (let j = 0; j < array.length; j += 1) {
      count[array[i]] += 1;
   }

   // 누적합 -1 까지 해당하는 요소를 넣어라를 만들어야 한다.
   for (let i = 0; i < k; i += 1) {
      count[i + 1] += count[i]
   }

   // 이제 요소들을 result에 넣어봅시다.
   for (let j = 0; j < array.length; j += 1) {
      result[count[array[j]] - 1] = array[j]
      count[array[j]] -= 1;
   }

   return result;
}
```
