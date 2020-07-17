---
layout: post
title: "자바스크립트로 자료구조 공부하기 02"
subtitle: "스택과 큐에 대해서"
type: "자료구조 시리즈"
createDate: "2020-07-17"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 14
---

#### 정렬하기와 자료구조에 대한 블로깅은 ZeroCho님의 블로그 포스트에서 많은 도움을 얻었습니다. 감사합니다. 

[ZeroCho님 블로그 방문하기](https://www.zerocho.com/category/Algorithm/post/57e22a778d6bcf0015231c8b)
<br>

### 가장 나중에 집어넣은 데이터를 가장 먼저 추출하는, 스택(Stack) 
<br>

![stack-image](https://learnersbucket.com/wp-content/uploads/2018/12/stack-2-1.png)

- 마지막에 집어넣은 데이터를 먼저 배출하는 LIFO 방식 (Last In First Out)
- 배열에서 push, pop이 해당한다. 
- 가장 마지막에 있는 데이터를 확인할 수 있다. (보통 stackTop 이라고 부름)
<br>

```js
class Node {
   constructor(data, next) {
      this.data = data;
      this.next = null
   }
}

class Stack {
   constructor(top, count) {
      // 가장 마지막에 들어온 top에 해당하는 값
      this.top = null;
      this.count = 0;
   }

   push() {
      // return 값으로는 증가한 배열의 길이를 담는다.
   }

   pop() {
      // return 값으로는 top에서 나온 값 그 자체를 담는다. 여기서는 data!
   }

   stackTop() {
      // return 값으로는 가장 마지막에 있는 값을 담는다.
   }
}
```
<br>

이제 작성해야 하는 것은 Stack 객체의 각각의 메소드 구현이다.

- push 메소드는 기존에 아는 것 처럼 새로운 노드를 추가하고, 그 안에 값을 담는 것이다. 맨 마지막 노드가 만들어지는 것이고 스텍의 길이가 1 커져야 한다.
- pop 메소드는 역시 맨 마지막 노드의 값 자체를 빼야하는 메소드이다. 길이를 1 줄이고, 빼낸 값 그 자체를 리턴해야 한다.
- stackTop 메소드는 현재 stack 객체의 마지막 노드에 담긴 값을 리턴해야 한다. this.data를 이용하면 될 것이다. 
<br>

```js
   push(data) {
      let node = new Node(data);

      // 새롭게 생성된 노드는 이전의 top 값과 연결된다. 
      node.next = this.top;
      this.top = node;

      // push 메소드 자체가 리턴하는 값은 늘어난 stack의 크기
      return this.count += 1
   }


   pop() {
      // top 값이 없다면, false
      if (!this.top) {
         return false;
      }

      // top 값이 있다면
      // 맨 끝에 있는 data를 뽑아내고, top에는 바로 앞에 있는 값을 연결시킨다.
      let data = this.top.data;
      this.top = this.top.next

      this.count -= 1;

      return data;
   }


   stackTop() {
      // 현재 top 값으로 있는 것을 리턴
      return this.top.data;
   }
```

<br>

### 일상생활 속 줄 세우기 개념, 큐(Queue)

- 가장 먼저 들어온 데이터가 가장 먼제 밖으로 나온다. FIFO 방식 (First In First Out)
- 배열에서 push 하고, shift로 꺼내는 방식 > 큐 개념에서는 enqueue, dequeue라고 한다.
- 가장 앞의 값을 알 수 있는 front가 있다.
<br>

```js
class Node {
   constructor(data, next) {
      this.data = data;
      this.next = null;
   }
}

class Queue {
   constructor(count, head, rear) {
      // rear는 맨 끝을 의미한다.
      this.count = 0;
      this.head = null;
      this.rear = null;
   }  
}
```
<br>

이제 생각해봐야 하는 것은 Queue에서 사용되는 메소드 들이다.

- enqueue : 새로운 데이터를 가장 뒤에 집어넣는 형태, 생성된 노드가 없다면 가장 첫 값을 넣는다고 생각하면 된다. 즉 이 경우에는 head에 새로운 노드가 연결되는 것!
- dequeue : 제일 앞에 있는 데이터를 빼내는 것, 배열의 shift 메소드와 동일하다.
- front : 객체의 제일 앞에 있는 요소를 뱉어내는 것.
<br>

```js
   enqueue(data) {
      let node = new Node(data);

      // 첫 시작하는 값이 없다면,
      if (!this.head) {
         this.head = node;
      } else {
         this.rear.next = node;
      }

      this.rear = node;
      return this.count += 1; // 결국에는 크기를 1 늘려준 부분을 보여줘야 한다.
   }


   dequeue() {
      // 만약 연결된 값이 없다면, 즉 enqueue된 값이 없다면
      if (!this.head) {
         return false;
      }

      // head에 다음 요소를 연결시키고 크기 1 줄이기
      let data = this.head.data;
      this.head = this.head.next;
      this.count -= 1;

      return data;
   }


   front() {
      return this.head.data;
   }
```

<br>

이렇게 큐와 스택을 정리해볼 수 있었다. 자바스크립트의 훌륭한 배열 시스템 만큼 스택과 큐를 빠르고 간편하게 정의할 수 있는 것은 없다. 데이터를 집어 넣을때에는 push, unshift 메소드를 활용하고, 인덱스를 이용해서 언제든지 마지막, 처음 값을 찾을 수 있다. 또한 pop과 shift 메소드로 꺼내고 싶은 값을 앞, 뒤에서 자유롭게 꺼낼 수 있다. 이 얼마나 훌륭한 메소드들인가! 😆