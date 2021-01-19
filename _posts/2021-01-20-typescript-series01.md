---
layout: post
title: "Typescript 이해하기 1편"
subtitle: "자바스크립트에서 한 층 진화하겠습니다."
date: 2021-01-20
background: "/img/posts/210120/post-typescript.png"
tags: [ts, frontend, series]
---

> 깃헙 TIL 레포에 기록했던 내용을 정리하여 블로깅합니다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

`목차`

[Hello Typescript](#Hello-Typescript) <br />
[타입스크립트 기본 타입](#타입스크립트-기본-타입) <br />
[함수에 타입 얹어보기](#타입스크립트-함수-타입) <br />
[객체형 타입 상자 인터페이스](#객체형-타입-상자-인터페이스) <br />

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

## Hello Typescript

타입스크립트는 ms가 개발한 자바스크립트의 확장 언어다. 동적 언어인 자바스크립트와 다르게 요소들에 타입을 정의해주는 **정적 언어**다. 지금까지 알고 있던 모든 자바스크립트의 문법적 요소를 이용할 수 있는건 물론이고, 자바스크립트로 컴파일 되는 환경에서 변수 및 기타 요소들의 타입이 결정된다. 런타임 환경에서 타입이 파악되는 자바스크립트와 가장 차별되는 부분이다. <br />

컴파일 단계에서 계발자의 오류를 감지하기 때문에 프로그램의 에러를 미리 방지할 수 있다. 더군다나 VSCode는 MS에서 개발한 코드 에디터이기 때문에 기본적으로 타입스크립트를 내장하고 있다. 그래서 에러 탐지가 VSCode에서 더욱 편하다. 나도 VSCode에서 타입스크립트로 개발하고 있는데, 에디터가 똑똑해졌다는 느낌을 받는다. <br />

타입이 정의된 클래스나 객체 내부의 메서드를 자동으로 미리 볼 수 있다. 모듈로 불러와진 함수의 절대 경로를 바로 파악해서 해당 파일로 바로 찾아갈 수 있게 해준다. (mac 환경에서는 `cmd + 클릭`) tab키를 통해서 모든 문자를 다 치지 않고 api를 정확하게 완성해주기도 하고, import 되지 못한 모듈을 자동으로 불러올 수 있다. <br />

```ts
function hello(name: string, age: number): string {
  return `hello, my name is ${name} and ${age} years old.`;
}

hello("kang", "28"); // Error: '28'은 number에 할당 될 수 없습니다.
```

<br />

## 타입스크립트 기본 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **String, Number, Boolean 타입**

정말 간단하게 변수의 오른쪽에 타입을 적어주면 된다. let 키워드로 선언하고 할당한 변수는 굳이 이렇게 타입을 꼭 적어주지 않아도 타입스크립트가 자동으로 타입을 추론한다. const 변수는 조금 예외가 있다. <br />

```ts
// String
let str: string = "hankyeol";

// Number
let num: number = 28;

// Boolean
let bool: boolean = true;
```

<p style="display: block; margin-top: 0px; margin-bottom: 40px" > </p>

> **Array, Tuple, Enum 타입**

배열은 익숙한데, 튜플, 이넘(Enum)은 자바스크립트 개발자에게 조금 생소할 수 있다. 나도 그랬다. <br />

- 튜플은 배열형에서 길이가 고정되고, 요소마다 타입이 지정되어 있는 타입을 말한다.
- 이넘(Enum)은 특정한 값, 상수들의 집합을 나타내는 타입이다. 개발자가 요소들의 인덱스를 지정해 줄 수 있다는 특징을 가진다.

```ts
// Array 타입은 아래 2가지 방법 다 사용할 수 있다.
let arr: number[] = [1, 2, 3];
let arr: Array<number> = [1, 2, 3]; // 제네릭 문법

// Tuple
let arr: [string, number] = ["hankyeol", 28];
arr[3]; // -> Error: 3번 인덱스는 없습니다.

// Enum
enum Hankyeol {
  DEVELOPER = 4,
  KOREAN,
  HUMAN,
}
let language: Hankyeol = Hankyeol[5]; // KOREAN
```

<p style="display: block; margin-top: 0px; margin-bottom: 40px" > </p>

> **Any, Void, Never 타입**

- any 타입은 단어 뜻 그대로 모든 타입으로 추론될 수 있는 타입이다. 마법 주문과 같은 타입이지만 명확한 타입을 정해주기 전에 사용하는 것이 좋다.
- void는 값을 설정할 수 없는 타입이다. 변수에는 undefined, null 값만 설정할 수 있고, 함수의 반환 타입으로 정의되어 리턴 값이 없다는 것을 의미한다.
- never 타입은 함수 반환 타입으로 정의되고, 이 함수의 끝에 절대 도달하지 않는다는 의미를 가진다. 유니온 타입과 병행할 시에는 never 타입을 소거 목적으로 사용한다.

```ts
// any
function login(id: any, password: any): boolean {
  return true;
}

// void
function login(id: string, password: string): void {
  console.log(id, password);
}

// never
function login(id: string, password: string): never {
  while (true) {}
}
```

<br />

## 타입스크립트 함수 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **함수의 인자와 반환값에 타입을**

타입스크립트로 함수를 작성할 때는 개별 인자(파라미터)와 함수의 결과값에 해당하는 리턴값에 타입을 정해준다. <br />

타입스크립트로 정의한 함수의 인자에 대해서 특별한 처리가 없다면 모두 필수한 인자로 인식한다. 이 말은 함수 처리에 반드시 들어가지 않는 옵셔널한 인자라도 undefined, null 값 처리를 해야 한다는 것이다. 매번 그렇게 해주는 것은 힘드니까 `?` 기호를 사용해서 옵셔널한 인자라는 것을 알려줄 수 있다. <br />

```ts
function login(id: stirng, password: string, nickname?: string): boolean {
  // nickname은 옵셔널한 인자로 볼 수 있다.
  if (id && password) {
    return true;
  } else {
    return false;
  }
}

// rest parameter도 이렇게 사용가능하다.
function sum(num1: number, ...nums: number[]): number {
  return ...
}
```

<br />

> **Typescript에서 this**

타입스크립트로 정의한 함수에서 this는 인자의 제일 앞에서 그 타입을 정할 수 있다. this라는 이름으로 정의하면 된다. 함수 자체의 인자는 2번째 요소부터 시작하는 것이다. <br />

```ts
function getParam(this: string, index: number): string {
  const params = this.split(",");

  if (index < 0 || params.length <= index) {
    return "";
  }

  return this.split(",")[index];
}
```

<br />

> **구조분해 할당을 이용한 네임드 파라미터**

함수의 파라미터를 구조분해하여 객체 형태로 감싸는 식으로 타입을 할당 할 수 있다. 이 방법은 props를 함수 인자로 많이 전달하는 React 컴포넌트 코드에 자주 사용된다. <br />

함수에 인자가 조금 많아진다 싶으면 구조분해의 개념을 잘 이용한 네임드 파라미터를 이용해주면 좋다. 또 우리의 VSCode는 함수의 인자가 널부러진 것을 보고 빠르게 네임드 파라미터 형식으로 변환해주는 치환 기능도 가지고 있다. VSCode에서 함수를 작성하고 함수 이름에 커서를 가져다 대면 옵션 메뉴가 뜬다. <br />

```ts
function getText({
  name,
  age = 28,
  language,
}: {
  name: string;
  age: number;
  language?: string;
}): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? "seneir" : "junior";

  return `name: ${nameText}, age: ${ageTet}, language: ${language}`;
}

// 사용할 때에도 객체형태로
getText({ name: "hankyeolk", age: 26 });
```

<br />

## 객체형 타입 상자 인터페이스

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **인터페이스의 기본적인 규칙**

인터페이스는 타입으로 정의된 약속, 규칙이라고 볼 수 있다. 즉, 인터페이스로 다양한 요소의 타입을 정할 수 있다고 생각하면 편하겠다. <br />

- 인터페이스로 타입은 interface 키워드에 {} 괄호로 리터럴 하는 것이다. 인터페이스에는 옵셔널한 속성의 타입을 지정할 수 있다.(? 기호) 마찬가지로 하나의 속성에 서로 다른 타입을 지정할 수도 있다.(or 조건과 같다)
- 인터페이스 타입으로 정의된 속성들은 순서가 없다. 인터페이스 타입 내부에 정의되지 않은 속성이 있다면 그것을 호출하거나 메서드 형식으로 사용할 때, 값을 변경할 때 에러 코드를 보게 된다.

```ts
interface Person {
  name: string;
  age?: number;
  birthday: number | string;
}
```

<br />

> **인터페이스 읽기 전용 속성과 인덱스 타입**

- 인터페이스 타입 내부의 속성은 읽기 전용 속성을 가질 수 있다. (readonly) 읽기 전용으로 할당된 속성은 값의 재할당이 불가하다. 선언 시점에만 값을 할당할 수 있다.
- 속성에 대한 이름을 정의하지 않고, 값의 타입만 정하는 인덱스 타입 속성이 있다. `[key: 타입]: 타입` 형태로 인터페이스 내부에 정리된다. key라고하는 이름에는 아무 문자나 와도 된다. 속성 이름에 대한 타입을 검증해서 그 때의 타입이 연결된 타입과 일치하는지 확인한다.
- 인터페이스 속성 이름에는 '문자열', '숫자'가 올 수 있다. 숫자로 온 이름은 내부적으로 문자열로 변환되어서 사용된다.

```ts
interface Book {
  readonly name: string;
  [key: string]: number | string;
}

const Onepiece: Book = {
  name: "dawn",
  price: 4500, // index type에 의해서 반영이 될 수 있다.
};

Onepiece.name = "moon"; // Error : 읽기 전용 속성은 값이 재할당 될 수 없다.
```

<br />

> **인터페이스로 함수 정의하기**

인터페이스로 함수 자체의 타입을 정의할 수 있다. 개별 파라미터에 대한 정의부터 반환값까지 정의 가능하다. 인터페이스로 함수의 타입을 정의할 때, 함수 내부/외부에서 사용될 함수 속성값도 정의할 수 있다. <br />

```ts
interface GetText {
  (name: string, age: number): string;
  totalCall?: number;
}

const getText: GetText = (name, age) => {
  if (getText.totalCall !== undefined) {
    getText.totalCall += 1;
  }
  return `totalcall : ${getText.totalCall}`;
};

getText.totalCall = 0;
getText("", 0); // -> totalcall : 1
```

<br />

> **인터페이스 확장**

인터페이스는 인터페이스 간에 extends 키워드로 확장이 가능하다. 확장의 개념에 맞게 속성 받는 자식은 부모의 모든 속성을 가지게 된다. (가지고 있어야 한다가 맞는 설명 같다.) 하나의 인터페이스는 여러개의 인터페이스로부터 확장 가능하다.<br />

또한 `&` 기호를 사용해서 인터페이스 속성에 대한 교집합격의 인터페이스를 만들 수 있다. 조금 말이 어려운데, `&` 기호를 사용해서 서로 다른 인터페이스에 있는 속성을 모두 가지는 새로운 인터페이스를 만들 수 있다고 생각하면 편할 것 같다. 이렇게 합쳐진 타입을 인터섹션 타입이라고 한다.

```ts
// interface extend
interface Person {
  name: string;
  age: number;
}

interface Developer {
  favoriteLang: string;
}

interface Hankyeol extends Person, Developer {
  liveInSeoul: true;
}

// intersection type
interface Post {
  name: string;
  postId: number;
}

type PP = Person & Post; // Person interface와 합쳤다.
const pp: PP = {
  name: "hankyeol",
  age: 28,
  postId: 19,
};
```

<br />

<div class="comming-soon">다음편에 계속...</div>

<br />
