---
layout: post
title: "Javascript 문법 정리"
subtitle: "function 잘 알고 가기 01"
type: "Javascript"
createDate: "2020-07-09"
js: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 7
---

자바스크립트를 주 언어로 선택하면서 정말로 나에게 정말로 떼어놓을 수 없는 존재는 바로, function이다. 함수. 함수가 동작하는 방식을 이해하고, 함수를 잘 작성하게 되면 어느정도의 자바스크립트를 이해했다고 할 수 있을 것이다. (물론 무궁무진하지만..)
<br>

그래서 앞으로 몇 번의 포스팅으로 자바스크립트의 함수를 이해는 것에 있어서 유용한 정보들을 블로그에 정리하고, 작성하려 한다. 
<br>

#### 함수에서 this 다루기

이미 TIL과 블로깅을 통해서 함수에 this를 다루는 방법을 공부했다. 오늘 이 블로그에서 그 부분을 정확하게 짚어갔으면 하고, 앞으로 this를 새롭게 만나게 되면 언제든지 이 글을 수정할 것이다.
<br>

```js
functionName.call(참조할 this 객체, 인자);
functionName.apply(참조할 this 객체, [인자]);

functionName.bind(참조할 this 객체); // -> 객체를 함수에 묶어준다.
functionName(인자) // -> binding 된 함수는 객체에서 참고하여 인자에 대한 실행을 한다.
```

<br>

#### arguments와 rest parameter

**01. arguments**
<br>

함수에 들어올 인자가 몇개가 될 지 가늠할 수 없는 상황에서, 함수 내부에서 유사배열의 형태로 사용이 가능하다. 인덱스를 통한 조회와 .length 같은 전역 메소드를 사용 가능하다. arguments 자체가 반복 가능한 객체(iterable)로 분류되기 때문에 `for ~ of` 구문을 활용한 반복도 가능하다.
<br>

```js
function sum() {
  let result = 0;
  for (let item of arguments) {
    result += item;
  }
  return result;
}

sum(1, 2, 3, 4); // -> 10
``` 
그래서 위와 같은 코드도 작성을 할 수 있다.
<br>

**02. Rest Parameter**
<br>

이와 비슷하게, 나머지 매개변수를 이용하면 여러개로 들어오는 인자들을 '배열 처럼' 사용할 수 있다. rest parameter는 실제 배열로 처리되어 배열의 메소드를 적극 활용할 수 있다. 다만, 함수의 파라미터 중 정해진 요소가 있다면, 무조건 마지막 파라미터에만 rest parameter를 지정할 수 있다는 단점이 있다.
<br>

```js
function sum(name, ...args) {
  console.log(name)
  return args.reduce((acc, cv) => acc + cv, 0);
}

sum('kk', 1, 2, 3, 4); // -> console('kk')  return : 10
```

<br>

#### 화살표 함수

- 파라미터가 하나면 괄호 생략, 실행 구문이 하나면 중괄호도 생략 가능
- 화살표 함수는 new 키워드와 함께 사용할 수 **없다**. (생성자 함수 불가)
- 화살표 함수는 스스로의 this를 가지지 않는다. 다만, 함수가 정의된 스코프 내에서 존재하는 this를 가르킨다. > 따라서 **call, apply, bind 메소드로 this 자체를 지정해줄 수 없다.**

```js
function Person(name) {
  this.name = name;
  this.getName = () => {
    // 이렇게 선언 된다면, this는 Person 함수 내부 스코프에 존재하는 this를 가진다.
    return this.name;
  }
}

const kim = new Person('kim')
kim.getName() // -> 'kim'
kim.getName.call({name: 'park'}) // -> 'kim'
```

- 객체 개별 속성의 값에 함수를 정의하는 경우, 화살표 함수를 사용하면 전역 객체를 조회할 것이다. > 이때에는 화살표 함수를 사용하지 않는다. 
- 함수 자체를 다른 함수의 파라미터로 넣는 경우 (콜백함수의 경우), 화살표 함수는 선언 당시의 스코프에 있는 this를 가지고 오기 때문에 편하다. > **함수를 값으로 다루는 경우에 편하다고 할 수 있다.**