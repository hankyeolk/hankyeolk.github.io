---
layout: post
title: "TIL 11일차"
subtitle: "기본적인 Html/Css와 클로저,this에 대한 깊은 공부1"
type: "TIL - 2주차"
createDate: "2020-06-25"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 11
---

### Today's Key 🔑

- 오랜만에 Html과 Css에 대한 개념 정리를 할 수 있었다.
- 내일은 트위터 목업과 자기소개 페이지 목업을 만들 예정이다.
- 클로저와 this에 대해서 잘 이해가 가지 않아서 조금 더 공부했다.
- Pre Off toy 문제를 몇개 풀었다.
- Test-builder에서 해결 안되는 문제가 계속 발목을 잡는다.
- Javascript Koans Advanced 문제를 결국 다 해결했다. -> 자동 Pull?
<br>

### 추가로 공부하자 💪🏼

- this 를 조금 더 정확하게 이해하고, this binding에 대해서 공부 필요
- 객체 지향적으로 코드를 편하게 다룰 수 있도록 열심히 공부할 필요성을 느꼈다.
<br>

### 정리하면서 복습하자 🚀

**클로저**를 이해하는 것에 있어서.

- **특징** : 부모 함수의 지역 변수를 사용할 수 있는 내부 함수. + 외부에서 (전역 등) 설정된 변수를 사용할 수 있다. 
- **장점** : 부모 함수 자체를 새로운 변수에 할당해서 변수간 재사용을 가능하게 하고, 어떻게 보면 전혀 새로운 함수를 만드는 것과 같다. (ex. 커링) 
- **따라서** : 같은 함수 본문 정의를 공유하지만, 서로 전혀 다른 맥락과 구문의 환경을 저장한다고 할 수 있다.
<br>

Javascript `this`를 이해하는 것에 있어서 1.
<br>

우선적으로 **MDN의 this 문서**를 따라가보고자 한다.

```js
const test = {
  prop: 42,
  func: function() {
    return this.prop;
  },
};

console.log(test.func());
// expected output: 42
```
여기서 this는 test라는 객체 자체를 의미한다는 것을 알 수 있다. func 키의 값으로 함수를 소환하고, 그 안의 this는 test 객체 자체를 받는다. 
<br>

this를 사용하는 것은 함수를 어떻게 불러내는지에 따라서 다를 수 있다. 

여기서는 `call()` , `apply()` 메소드를 사용할 때, this를 어떻게 활용하는지 보여준다. 

```js

function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(o, 5, 7); // 16

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(o, [10, 20]); // 34

```
call, apply 메소드를 활용할 때는, 해당 메소드의 처음 인자로 특정 변수나 값 등을 넣지 않으면 자연스럽게 this를 전역으로 처리한다. 그렇게 처리를 원치 않으면 `null`, `undefined` 처리가 필수이다.