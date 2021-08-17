---
layout: post
title: '[시리즈 - 코어 자바스크립트] 자바스크립트 프로토타입'
subtitle: '내실을 다지는 자바스크립트 공부'
date: 2021-06-30
background: '/img/posts/post-dev.png'
tags: [js, series, book]
---

> 이 블로그 콘텐츠에는 책 '코어 자바스크립트'를 읽고 자바스크립트를 깊게 이해하는 내용이 담깁니다.

## 자바스크립트 프로토타입

---

자바스크립트가 프로토타입 기반의 언어라는 점은 많이 들어서 알고 있을 것이다. 클래스 기반의 언어에 있는 상속과는 다르게 특정한 객체 하나를 원형(prototype)으로 삼고 이를 복제하는 방식으로 상속의 훙내낸다. 프로토타입의 개념을 한 번 이해하는 것이 어렵지만 이번에 해내보자.

### 기본

<img src="/img/posts/core-javascript/prototype.png" style="width: 80%; text-align: center; border: 1px solid gray;"/> <br />

위의 이미지의 흐름을 정리하면 다음과 같다.

1. 어떤 생성자 함수를 new 키워드와 함께 호출하면 생성자에서 정의된 내용을 바탕으로 새로운 인스턴스(instance)가 생성된다.
2. 인스턴스가 생성될때 `__proto__`라고 하는 프로퍼티가 자동으로 부여된다.
3. `__proto__` 프로퍼티는 Constructor에 있는 prototype 이라고 하는 프로퍼티를 참조한다.

`prototype`와 `__proto__`는 모두 객체다. prototype 객체에는 인스턴스가 사용할 메서드를 저장한다. 이를 참조하는 `__proto__`를 통해 인스턴스가 이 메서드들에 접근할 수 있다.

```js
const Person = function (name) {
  this._name = name;
};
Person.prototype.getName = function () {
  return this._name;
};

const dobby = new Person('Dobby');
dobby.__proto__.getName(); //undefined
```

위의 예시에서 `dobby.__proto__.getName()`을 찍어보면 undefined가 나오는 것을 알 수 있다. 함수를 메서드로 호출하면 '.' 앞의 객체가 바로 this가 된다. 그래서 getName 메서드가 묶인 this는 `dobby.__proto__` 객체가 된다. 이 객체 내부에는 'name'이라는 프로퍼티가 없기 때문에 정의되지 않은 식별자를 찾을때 뱉는 undefined가 나온 것이다.

```js
dobby.__proto__.name = 'Dobby';
dobby.__proto__.getName(); // 'Dobby'

dobby.getName(); // 'Dobby'
```

`dobby.getName()` 처럼 `__proto__`를 제외하면 this 걱정없이 메서드를 사용할 수 있다. 그 이유는 `__proto__`가 생략 가능한 프로퍼티이기 때문이다. 자바스크립트의 단순한 문법적인 측면이기 때문에 생략 가능하다는 정도로만 이해하고 넘어가자.

정리하면, 'new Constructor() 형태로 인스턴스를 생성하면 생략 가능한 프로퍼티 `__proto__`가 생성되고 이것은 Constructor의 prototype 객체를 참조한다.'

Array라고 하는 생성자를 직접 콘솔에 찍어보면 prototype과 기본 내장 메서드를 이해할 수 있다.

<br />

### prototype 객체 내부의 constructor 프로퍼티

생성자 함수의 prototype 객체에는 constructor라고 하는 자기 자신을 참조하는 프로퍼티가 있다. 생성된 `__proto__` 객체에도 존재한다. 이것은 인스턴스와의 관계를 나타내기 위해 필요한 정보인데, 인스턴스의 원형이 무엇인지를 알 수 있는 수단 역할을 한다.

```js
const array = [1, 2];
Array.prototype.constructor === Array; // true
array.__proto__.constructor === Array; // true
array.constructor === Array; // true

const array2 = new array.constructor(3, 4);
console.log(array2); // [3, 4]
```

<br />

### 프로토타입 체인

#### 메서드 오버라이드

prototype 객체를 참조하는 `__proto__`를 생략할 수 있기 때문에, 인스턴스는 prototype에 정의된 프로퍼티나 메서드를 자신의 것처럼 사용할 수 있는 것처럼 보인다. 아래의 예시를 한 번 보자.

```js
const Person = function (name) {
  this.name = name;
};
Person.prototype.getName = function () {
  return this.name;
};

const IU = new Person('이지은');
IU.getName = function () {
  return 'IU는 ' + this.name + '이다.';
};
console.log(IU.getName()); // 'IU는 이지은이다.'
console.log(IU.__proto__.getName.apply(IU)); // '이지은'
```

IU 인스턴스에 있는 메서드가 호출된다. Person prototype 객체에 등록된 getName 메서드와 동일한 함 수 명이기 때문에 원본이 있는 그 상태에서 다른 대상을 얹은 것이다.

오버라이딩 되지 않고, prototype에 등록된 메서드가 동자가헤 하려면, IU 인스턴스에 있는 `__proto__`에다가 IU 인스턴스를 바라볼 수 있게 등록하면 된다. call, apply 메서드로 바인딩을 해주면 된다. 원본 메서드를 사용하기 위해서 우회를 해야한다는 점이 있다.

<br />

### 프로토타입 체인

`console.dir([1, 2])`를 찍어보면 우리에게 익숙한 pop, push와 같은 메서드가 `__proto__` 프로퍼티 안에 있다는 것을 볼 수 있다. constructor는 `f Array()`로 배열 생성자 함수를 가르키고 있는 것으로 보인다. 그런데 **proto**안에 또 다른 **proto**가 있는 것을 볼 수 있다.

그것은 `console.dir({a: 1})`을 찍어봤을 때의 **proto**와 동일하다는 것을 알 수 있다. 이것은 모든 객체의 **proto**에 Object.prototype이 연결되기 때문이다. 아래의 그림처럼 연결되어 있는 것이다.

<img src="/img/posts/core-javascript/prototype2.png" style="width: 80%; text-align: center; border: 1px solid gray;"/> <br />

**proto**는 생략이 가능한 프로퍼티이기 때문에 배열은 Object.prototype의 내부 메서드를 자신의 것처럼 사용할 수 있다. `array(.__proto__)(.__proto__).hasOwnProperty();` 이렇게 말이다.

이런 것처럼 `__proto__` 프로퍼티 내부에 `__proto__` 프로퍼티가 연쇄적으로 이어진 형태를 프로토타입 체인이라고 한다. 이 체인을 따라가며 검색하는 과정을 프로토타입 체이닝이라고 한다.
