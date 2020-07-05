---
layout: post
title: "Javascript에서 사용되는 this의 5가지 패턴"
subtitle: "크게는 3가지 패턴으로 압축가능하다."
type: "Javascirpt - this"
createDate: "2020.07.05"
js: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 1
---

### Javascript 언어에서 this는 다섯가지 패턴을 가지고 활용된다.

1. Global하게는 **window 객체 그 자체**
2. 함수() 형태로 실행될 때는 직계 부모 객체인 **window 그 자체**  :  **function invocation**
3. 메소드 호출시에 해당 직계 부모 객체 그 자체  :  **method invocation**
4. 클래스를 이용하여 인스턴스를 만드는 **construction mode**
5. `.call`, `.apply` 형태로 사용되는 특수한 메소드 활용

<br>

**1,2,3.** 사실상 메소드 호출을 통해서 **직계의 부모 객체를 의미**하는 this
<br>

```js
var obj = {
    fn: function(a,b) {
        return this; // -> 어디서 작동하든 부모 객체 자체를 가지고 오는 함수.
    }
};

var obj2 = {
    method: obj.fn
};
```
위와 같이 선언된 각기 다른 두 객체를 이용해서 this의 속성을 알아보자.
<br>

우선적으로 콘솔에 아래와 같이 여러가지의 실행문을 적는다고 생각한다.

```js
console.log(this);
console.log(obj.fn());
console.log(obj2.method());
```
위의 3가지 실행문의 결과가 어떻게 console에 찍힐지에 대해서 설명하고자 한다. 

- 우선적으로 가장 위에 찍힌 일반적인 this는 직계 부모 객체인 `window` 그 자체를 찍는다.
- 두번째 실행문은 obj 객체의 fn이라는 키를 찾아서 해당 메소드를 실행하고, 그때의 return 값인 this는 직계 부모 객체인 `obj` 를 소환한다.
- 세번째 실행문은 method 라는 이름을 가진 메소드를 불러 오고 그 메소드는 obj에서 선언된 fn 메소드를 실행한다. 여기서 주의할 점, this는 실행 시점의 직계 부모를 찾는다. 따라서 이 실행문에 의해 콘솔에 찍히는 값은 `obj2` 그 자체가 된다고 할 수 있다.
<br>

```js
// 정답에 대해서
window
obj
obj2
```

<br>

**4.** 클래스를 이용한 새로운 객체 생성시에 사용하는 construction으로 생성된 **instance 그 자체**를 의미하는 this
<br>

```js
function Car(brand, name, price) {
	this.brand = brand;
	this.name = name;
	this.price = price;
}

let avante = new Car(...)
avante.brand = ...
```
<br>

여기에서 new 키워드를 통해서 새로운 인스턴스 avante가 생성되었다. 생성되는 순간에 construction을 이용하여 this가 소환되고 this는 avante라고 하는 인스턴스 (개별요소) 자체를 의미하고 Car 라고 하는 클래스가 가진 메소드를 이용할 수 있게 한다.

<br>

**5.** call과 apply 메소드를 활용한 this 다루기
<br>

`.call()` 메소드와 `.apply()` 메소드의 차이는 파라미터로 받는 형태가 ',' 로 구분되었냐 아니면 배열이냐의 차이다. 아래의 예시를 보면 두 메소드의 활용 방식에 대한 차이를 정확하게 구분할 수 있다.
<br>

call과 apply 메소드는 첫 인자로 객체를 받고, 그때 **첫 인자로 받은 그 객체는 this**가 된다.
<br>

```js
var add = function(x, y) {
	this.val = x + y;
}

var obj = {
	val: 0
};

add.apply(obj, [2, 8]) // -> obj.val = 10
add.call(obj, 2, 8) // -> obj.val = 10
```
<br>

동일한 형태로 사용되었지만, 배열로 받냐, 아니면 일반 파라미터 형태로 받느냐의 차이가 있다. 추후에 call과 apply가 함수에서 어떻게 활용되는지 정리하고자 한다.
