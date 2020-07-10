---
layout: post
title: "객체와 배열의 중첩형태인 데이터에 잘 접근하기"
subtitle: "JSON 데이터 다루기"
type: "Javascript - 재귀"
createDate: "2020-07-10"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 5
---

### JSON 형식으로 들어온 데이터에서 내가 원하는 데이터 찾기

- 조건 1. 객체, 배열이 중첩되어 있는 구조에서 정확한 데이터 찾기
- 조건 2. 객체의 키에 대한 값은 어느정도 알고 있다고 가정한다.
<br>

```js
입력 예시 : findMe(DATA, 'kelly')
출력 예시 : 29 // kelly의 나이
데이터 예시 

let DATA = {
   "el": [
      {
         "name": "Joe",
         "age": 20
      },
      {
         "name": "Mary",
         "age": 27,
         "book": [
            {
               "name": "Blow",
               "age": 15
            },
            {
               "name": "Blow",
               "age": 15,
               "book": [
                  {
                     "name": "kelly",
                     "age": 29
                  }
               ]
            }
         ]
      }
   ]
}
```

<br>

이 문제는 리커전 과제에서 stringifyJSON 함수를 구현하면서, 다중으로 둘러쌓인 구조의 데이터를 문자열로 변환할 때에 재귀의 개념을 사용했던 것을 활용할 수 있어야 한다. 데이터 구조를 자연스럽게 순환시키면서 내가 원하는 값에 도달할 때까지 재귀가 작동해야 한다. start 🚀
<br>

#### 01. 우선 들어오는 데이터가 배열인지, 객체인지 구분하는 큰 틀을 짜자.

```js
function findMe(data, value) {

   if (Array.isArray(data)) {
      // 배열 형태가 들어오면 for loop로 순회하면서 체크!
      for (let i = 0; i < data.length; i += 1) {

      }

   } else if(typeof data === 'object') {
      // 객체 형태로 들어오면 for~in 구문을 사용!
      for (prop in data) {

      }

   }
}
```

<br>

#### 02. name이라는 키에 값이 우리가 원하는 'value와 같은지 비교한다. 같다면 그 때의 age 값을 리턴!

```js
      for (let i = 0; i < data.length; i += 1) {
         if (data[i] === value) {
            return data[i].age
         } 
         if (...) {
            ...
         }
      }
      ...
      for (prop in data) {
         if (data[prop] === value) {
            return data[prop]
         }
         if (...) {

         }
      }
```

<br>

#### 03. 만약 같지 않다면 'book' 이라는 요소가 있는지 찾아보고 그게 맞다면 재귀로 다시 체크하도록 돌려준다.

```js
...
   if ('book' in data[i]) {
      return findMe(data[i].book, value)
   }

```
<br>

위의 제귀 코드를 통해서 로직은 데이터의 원하는 값이 있는 순간까지 재귀를 돌리게 된다. 원하는 값을 찾고 다시 역순으로 탈출점을 찾아서 원하는 값을 내주면 된다. 이런 코드를 상세하게 작성하기 위해서는 끊임없이 생각을 해야했다. 🏊🏼‍♀️🏊🏼‍♀️🏊🏼‍♀️