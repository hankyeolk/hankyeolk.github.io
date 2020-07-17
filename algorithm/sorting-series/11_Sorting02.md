---
layout: post
title: "자바스크립트로 정렬하기"
subtitle: "퀵 정렬에 대해서"
type: "정렬 시리즈"
createDate: "2020-07-17"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 11
---

#### 정렬하기와 자료구조에 대한 블로깅은 ZeroCho님의 블로그 포스트에서 많은 도움을 얻었습니다. 감사합니다. 

[ZeroCho님 블로그 방문하기](https://www.zerocho.com/category/Algorithm/post/57e22a778d6bcf0015231c8b)
<br>


![quick sorting](https://gmlwjd9405.github.io/images/algorithm-quick-sort/quick-sort-concepts.png)

- 함수 quickSort는 인자로 받은 배열을 오름차순으로 정렬합니다.
- 합병 정렬과 비슷하게 재귀를 이용하여 분할 정복 기법을 사용합니다. 최소 단위를 정하고, 문제를 쪼개어 해결합니다. 
- 코드 자체를 이해하는데 시간이 걸리기 때문에, 천천히 그림을 생각하면서 이해한다. 
- 퀵정렬의 시간복잡도는 O(NlogN) 이지만 경우에 따라 다를 수 있다.

<br>

**풀이 진행 방향** 
1. 배열에서 특정한 하나의 값을 고른다. 그 값을 배열의 가장 오른쪽(끝)으로 보낸다. 이 값은 이제 기준이 되는 값이다.
2. 기준값을 기준으로 왼쪽에는 작은 수가, 오른쪽에는 큰 수가 오도록 로직을 구성한다. 
3. 더 이상 비교할 수가 없으면 기준값과 마지막 값의 위치를 바꿔준다. 
4. 완벽한 정렬이 될 때까지, 기준값의 왼쪽, 오른쪽 부분을 재귀로 각각 돌려서 완벽한 정렬을 구축한다.
<br>

```js
// 기준점 기준으로 정렬 후 기준점을 새롭게 만들어주는 함수
function devide(array, left, right, devideIdx) {
   let temp;
   let devideValue = array[devideIdx]

   // left가 right 보다 작다고 가정하고,
   while (left <= right) {

      // 기준값 보다 작으면 왼쪽에 그대로, 
      while (array[left] < devideValue) {
         left += 1;
      }
      // 기준값보다 크면 오른쪽에 그대로,
      while (array[right] > devideValue) {
         right -= 1;
      }
      // 왼쪽이 기준값보다 크고, 오른쪽이 기준값보다 작다면 -> 스위칭
      // 이 부분은 위의 while 반복문에 더이상 해당하지 않을 경우다.
      if (left <= right) {
         temp = array[left];
         array[left] = array[right];
         array[right] = temp;
         left += 1;
         right -= 1;
      }
   }

   // 기준값과 마지막으로 만나는 수를 서로 위치 바꿔준다.
   temp = array[left];
   array[left] = array[devideIdx];
   array[devideIdx] = temp;

   // 기준점의 새로운 위치를 반환
   return left;
}
```
<br>

```js
// 정렬하는 함수, 재귀 사용
function quickSort(array, left, right) {

   // left, right 가 정해지지 않았을 경우,
   if (!left) left = 0;
   if (!right) right = array.length - 1;

   // 기준값으로 배열의 가장 마지막 수를 뽑는다.
   // pointIdx 값에 기준이 옮겨진 인덱스를 넣어준다.
   let pointIdx = right;
   pointIdx = devide(array, left, right - 1, pointIdx)

   // 기준보다 왼쪽을 의미해야 하고, 기준보다 오른쪽을 의미해야 해서,
   if (left < pointIdx - 1) quickSort(array, left, pointIdx - 1);
   if (pointIdx + 1 < right) quickSort(array, pointIdx + 1, right);

   return array;
}
```
