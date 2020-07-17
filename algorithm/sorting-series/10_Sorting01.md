---
layout: post
title: "자바스크립트로 정렬하기"
subtitle: "삽입, 합병, 버블, 선택 정렬에 대해서"
type: "Javascript"
createDate: "2020-07-17"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 10
---

#### 정렬하기와 자료구조에 대한 블로깅은 ZeroCho님의 블로그 포스트에서 많은 도움을 얻었습니다. 감사합니다. 

[ZeroCho님 블로그 방문하기](https://www.zerocho.com/category/Algorithm/post/57e22a778d6bcf0015231c8b)
<br>

### 01. 요소들을 하나하나 비교하여 작은 숫자를 앞으로, 삽입정렬

- 배열을 인자로 받는 insertSort 함수는 오름차순으로 배열을 정렬해준다. 
- 인덱스 1번 요소부터 앞에 있는 모든 요소들과 크기를 비교해서 알맞는 위치에 위치시킨다. 
- 반복문이 2개 필요하고, 비교하는 값을 임시적으로 저장할 변수가 필요하다. 
- 삽입정렬의 복잡도는 O(N^2) 이다.
<br>

**풀이 진행 방향**

1. 반복문에서 사용할 변수를 지정하고 1번 인덱스 요소부터 값을 **임시 저장하여 비교**한다.
2. 새로운 반복문에서는 임시 저장된 값(temp)과 앞의 요소들을 다 비교한다. 
3. 저장한 값이 직전 앞에 값보다 작으면 한 칸씩 뒤로 값들을 민다.
4. 내부 for 반복문이 false 가 되면 반복문을 종료하고 해당 자리에 값을 넣는다.


```js
function insertSort(array) {
   let i = 1, j, temp;

   // 인덱스 1번 요소부터 temp에 값을 잠깐 저장한다. 
   for (i; i < array.length; i += 1) {
      temp = array[i]

      for (j = i - 1; j >= 0 && temp < array[j]; j -= 1) {
         array[j + 1] = array[j]
      }

      // j = -1 이 될 수도 있다.
      array[j + 1] = temp;
   }

   return array;
}
```

<br>

### 02. 전체배열을 해결될 때까지 쪼개서 생각한다. 합병정렬

- 배열을 인자로 받는 mergeSort 함수는 오름차순으로 배열을 정렬해준다. 
- 전체 배열을 정렬이 될 때까지 분할해준다.  
- 정렬이 필요없는 최소 단위까지 쪼개지면 그것들을 역순으로 다시 합병해준다. (merge) > 재귀가 필요할 것이다. 
- 정렬한 값을 담을 새로운 배열이 필요하기 때문에 메모리 소모가 조금 있다.
- 삽입정렬의 복잡도는 O(NlogN) 이다.
<br>

**풀이 진행 방향**

1. 인자로 들어온 배열의 길이가 1이면 정렬이 필요없으니 그대로 리턴한다. (최소 단위 설정)
2. 배열을 반으로 나누는 작업을 하기 위하여 slice 메소드를 활용해준다. 
3. 분할한 배열이 정렬이 되어있지 않거나, 최소단위가 아니라면 재귀를 돌려준다. 
4. 분할이 최소단위까지 완료되거나 정렬이 필요한 최소 단계까지 오면 재귀로 배열을 병합해준다.
<br>

```js
// 최소단위로 분할된 배열들을 비교하여 합쳐주는 함수
function merging(left, right) {
   
   let result = [];

   while (left.length !== 0 && right.length !==0){

      // 분할된 배열에서 제일 앞에 요소들을 계속 비교해간다.
      if (left[0] < right[0]) {
         result.push(left.shift())
      } else {
         result.push(right.shift())
      }
   }

   // 분할된 배열중에 남은 요소가 있다면 다시 다 넣어준다.
   while (left.length !== 0) result.push(left.shift())
   while (right.length !== 0) result.push(right.shift())

   return result;
}

// 최종적으로 정렬을 진행하는 함수
function mergeSort(array) {

   if (array.length === 1) return array;

   let left = array.slice(0, Math.floor(array.length / 2));
   let right = array.slice(Math.floor(array.length / 2), array.length);

   // 최소 분할 단계까지 쪼개서 다시 정렬 후 합병한다.
   return merging(mergeSort(left), mergeSort(right))
}
```