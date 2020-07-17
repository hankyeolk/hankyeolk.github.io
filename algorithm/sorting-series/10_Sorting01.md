---
layout: post
title: "자바스크립트로 정렬하기"
subtitle: "삽입, 합병, 버블, 선택 정렬에 대해서"
type: "정렬 시리즈"
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
<br>

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

<br>

### 03. 단순하게 앞,뒤만 비교해서 거품을 꺼져가게 하는, 버블정렬

- 배열을 인자로 받는 bubbleSort 함수는 오름차순으로 배열을 정렬해준다. 
- 0번, 1번 인덱스의 값을 비교하여 큰 요소와 작은 요소의 자리를 바꿔준다. 이 과정을 시작으로 전체를 한 번 돌고, 다시 처음부터 과정을 반복한다. 
- 정렬 방식 중에서 가장 간단하지만 **가장 비효율적**으로 볼 수 있다.
- 버블정렬의 복잡도는 O(N^2) 이다.

<br>

**풀이 진행 방향**
1. 0번, 1번 요소의 크기를 비교하여 작은 것과 큰 것의 자리를 바꿔준다.
2. 배열의 길이만큼 비교가 끝나여 어느정도 정렬이 되면, 다시 처음부터 정렬해준다. 
3. 임시로 저장할 값이 필요하다.
<br>

```js
function bubbleSort(array) {
   let i, j, temp;

   // i에 의한 반복문은 말 그대로 전체 배열의 요소가 정렬이 되었는지 보는 용도.
   // j에 의한 반복문은 한 사이클의 정렬을 비교하는 용도.
   for (i = 0; i < array.length - 1; i += 1) {
      for (j = 0; j < array.length; j += 1) {

         // 만약에 앞에 요소가 하나 뒤의 요소보다 크면
         // 두 수의 위치를 변경해준다.
         if (array[j] > array[j + 1]) {
            temp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = temp
         }
      }
   }

   return array;
}
```

<br>

### 04. 가장 작은 요소의 인덱스를 기억해서 해당 위치로! 선택정렬

- 배열을 인자로 받는 selectSort 함수는 오름차순으로 배열을 정렬해준다. 
- 배열 전체에서 가장 작은 값을 찾아 기존 0번 요소와 자리를 바꾼다. 
- 위의 과정을 반복하여 인자로 들어온 배열을 오름차순으로 정렬한다. 단순하지만 이중 반복문을 돌려야하고, 현실적으로 잘 사용하지 않는다.
- 선택정렬의 복잡도는 O(N^2) 이다.
<br>

```js
function selectSort(array) {
   let minIdx, temp, i, j

   for (i = 0; i < array.length - 1; i += 1) {
      // 0번을 최소 값에 대한 인덱스로 가정한다.
      minIdx = i

      for (j = 1; j < array.length; j += 1) {
         if (array[j] < array[minIdx]) {

            // 가정한 최소 인덱스 보다 작은 값이 발견되면
            // 최소 인덱스를 변경해준다.
            minIdx = j
         }
      }

      // 반복문을 돌아 최소값에 대한 인덱스가 정해지면 
      // 버블 정렬과 비슷한 방식으로 진행
      temp = array[minIdx];
      array[minIdx] = array[i]  // 값의 위치를 서로 변경
      array[i] = temp
   }

   return array;
}
```
