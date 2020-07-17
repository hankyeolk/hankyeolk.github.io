---
layout: post
title: "자바스크립트로 자료구조 공부하기 01"
subtitle: "연결 리스트에 대해서"
type: "자료구조 시리즈"
createDate: "2020-07-17"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 13
---

#### 정렬하기와 자료구조에 대한 블로깅은 ZeroCho님의 블로그 포스트에서 많은 도움을 얻었습니다. 감사합니다. 

[ZeroCho님 블로그 방문하기](https://www.zerocho.com/category/Algorithm/post/57e22a778d6bcf0015231c8b)
<br>

### 여러개의 노드로 데이터간의 연결성을 나타내는 노드

연결 리스트는 여러개의 노드로 구성되어 있다. 그 노드들은 각각의 데이터를 가지고 있고, 자신에게 *연결되어 있는 다음 노드의 주소*를 가진다. 노드별로 새로운 데이터를 추가하거나, 데이터의 위치를 찾고, 연결성을 제거할 수 있는 기능이 필요하다.
<br>

말 그대로, 자바스크립트의 '배열'을 언어로 구현하는 작업이라고 할 수 있다. 연결된 노드간의 연결성이 중요하다. 이제 배열... 아니 연결 리스트를 구현해보자.
<br>

```js
class Node {
   constructor(data, next) {
      this.data = data;
      this.next = null;
   }
}

class Linkedlist {
   constructor(length, head) {
      this.length = 0;
      this.head = null;
   }

   // 앞으로 여기에 메소드를 하나씩 만들어 갈 예정
}
```
<br>

위의 코드처럼 연결 리스트를 즉시 실행함수로 선언하여 new 키워드로 새로운 연결 리스트를 구성할 수 있다. 이제 배열의 메소드처럼 연결된 노드에 *값을 넣고, 삭제하고, 위치를 찾는 함수*를 구현해보자.
<br>

우선 배열의 push 메소드 처럼 **데이터를 가장 마지막 노드에 추가하는 함수**를 작성한다.

- 앞에서 부터 차례대로 노드가 구성되어 있는지 확인한다.
- 노드가 구성되어 있다면 마지막 노드에 새로운 노드를 연결하고, 그곳에 값을 부여한다. 그 마지막 노드의 next값은 null이다.
- 제일 첫 노드, 즉 head에 연결된 노드가 없으면 새 노드를 구성하고, 값을 부여한다.
- 모든 과정에서 길이를 늘여주는 것은 당연하다.
<br>

```js
   push(value) {
      let current = this.head;
      let node = new Node(value)

      if (!current) {
         this.head = node;
         this.length += 1;
         return node;
      } else {
         while (current.next) {
         current = current.next;
         }

         current.next = node;
         this.length += 1;
         return node;
      }
   }
```

<br>

다음으로, 배열에서 **인덱스를 넣어 값을 찾아내는 것**과 동일한 search 함수를 구현해보고자 한다.

- 인자로 인덱스 넘버를 받아야 한다. 
- push 함수처럼 head node에서 시작하고, 올바른 위치를 찾기 위해 카운트 요소를 준비한다.
- 카운트가 인덱스 넘버와 같으면 그때의 값을 뱉는다.
<br>

```js
   search(idx) {
      let current = this.head;
      let count = 0;

      while (count < idx) {
         current = current.next
         count += 1;
      }

      return current.data;
   }
```

<br>

마지막으로 해당하는 인덱스의 값을 삭제하는 remove 함수를 구현한다.

- 인자로 받은 인덱스에 해당하는 노드를 찾는다.
- 해당 노드의 next 요소를 다음 노드의 것으로 교채해준다. 
- 연결 리스트의 크기를 감소시키는 과정을 잊지 않는다.
<br>

```js
   remove(idx) {
      let current = this.head;
      let before, remove;
      let count = 0;

      // idx === 0 즉, 제일 첫 노드를 삭제하는 경우
      if (idx === 0) {
         remove = this.head;

         // head에 위치를 두번째 노드로 바꾼다.
         this.head = this.head.next
         this.length -= 1;
         return remove;
      
      } else {
         while(count < idx) {
            before = current;
            count += 1;
            current = current.next;
         }

         // while문이 끝나면 idx에 해당하는 node에 도착!
         remove = current;
         before.next = current.next;

         this.length -= 1;
         return remove;
      }
   }
```

<br>

이해하기가 참 쉽지 않다. 이 부분은 ES6 문법인 class 키워드를 사용해서 해결할 수 있을 것 같다. 그래서 도전할 생각이다. 정말 쉬운것이 하나도 없다. 
<br>

*수정_2020.07.17.오후 5시 29분*
<br>
위의 코드들을 class 를 이용한 ES6 문법으로 수정했다.