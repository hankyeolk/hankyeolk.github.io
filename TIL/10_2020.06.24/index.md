---
layout: post
title: "TIL 10일차"
subtitle: "클로저와 객체지향 함수"
type: "TIL - 2주차"
createDate: "2020-06-24"
til: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 10
---

### Today's Key 🔑

- 함수 안의 변수에 접근할 수 있는 내부함수. 또는 그런 작동 원리인 '클로저'에 대해서 이해했다.
- 커링과 클로저 모듈 패턴에 대해서 반복적으로 학습했다.
- 클래스와 인스턴스, 그리고 그 인스턴스를 작동하게 하는 속성과 메소드에 대해서 공부했다.
- default parameter와 arguments 키워드, Rest parameter에 대해서 공부하였다.

<br>

#### 블로그에 정리하면서 복습하기 🚀

- 커링 : 고정된 값을 변수에 넣어두고 새로운 내부 함수를 작동시켜가는 클로저 함수

```js
function tagMaker(tag) {
    let startTag = "<" + tag + ">";
    let endTag = "</" + tag + ">";
    
    return function (content) {
      return startTag + content + endTag;
  };
}

// div tag making
let divTag = tagMaker(div);
divTag("we like to party"); // -> <div>we like to party</div>
```
<br>
- 클로저 모듈 : 함수 내부에서 변수를 스코프에 가두어 함수 밖으로 노출 시키지 않는다. 모듈의 패턴이기 때문에 함수를 재사용 하는 것이 쉽고, 변수간 충돌이 없다.

```jsx
function makeCounter() {
    let privateCounter = 0;

    return {
        increment: function() {
            privateCounter ++;
        },
        decrement: function() {
            privateCounter --;
        },
        getValue: function() {
            return privateCounter;
        },
    }
}
```


---

- 클래스 정의와 인스턴스의 속성 생성, new 키워드를 활용한 인스턴스 생성, 메소드 적용하기까지!
<br>

`ES5 문법`
```js
// Car라는 클래스의 인스턴스에 속성 정해주기
function Car(brand, name, color) {
	  this.brand = brand;
    this.name = name;
    this.color = color;
    // this는 new 키워드로 생성될 인스턴스 그 자체를 나타낸다.
}

// Car라는 클래스의 인스턴스가 활용되어질 메소드 생성하기
Car.prototype.refule = function() {

}
Car.prototype.drive = function() {

}

// 인스턴스트 생성하고 속성값 사용하기
let avante = new Car('hyundai', 'avante', 'black')
avante.brand = 'hyundai'

// 메소드 실행
avante.drive()
```
<br>

`ES6 문법`
```js
class Car() {
	  constructor(brand, name, color) {
		  // constructor는 인스턴스를 실행시키는 실행자
		  // Car라는 클래스의 인스턴스에 속성 정해주기
		  this.brand = brand;
		  this.name = name;
      this.color = color;
	}

	// Car라는 클래스의 인스턴스가 활용되어질 메소드 생성하기
	refuel() {
	
	}
	drive() {
	
	}
}
```

<br>

### 추가로 공부하자 💪🏼

- 정규표현식 BAAAAAAAAAAM