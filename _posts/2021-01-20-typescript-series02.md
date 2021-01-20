---
layout: post
title: "Typescript 이해하기 2편"
subtitle: "이넘부터 타입 호환성까지"
date: 2021-01-20
background: "/img/posts/210120/post-typescript.png"
tags: [ts, frontend, backend, series]
---

> 깃헙 TIL 레포에 기록했던 내용을 정리하여 블로깅합니다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

`목차`

[이놈이 아니라 이넘](#타입스크립트-이넘-타입) <br />
[타입스크립트에서 클래스](#타입스크립트-클래스의-타입) <br />
[감당할 수 있는 타입의 범위](#타입스크립트-타입-호환성) <br />

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

## 타입스크립트 이넘 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **이넘의 기본**

이넘은 자바스크립트 개발자에게는 정말 생소한 개념이다. 생긴새와 처음 봤을때의 느낌은 객체와 배열을 섞은 새로운 자료형 타입이라는 것이다. 근데 그 느낌이 얼추 맞다. <br />

Enum은 특정 값들의 집합을 의미한다. 사용 방식은 인터페이스와 비슷한데, `enum 타입 이름 {}` 형태로 적용할 수 있다. 타입스크립트에서는 숫자형과 문자형 이넘을 지원한다. 두 형태를 복합적으로 사용하는 복합형 이넘이 있지만, 가급적이면 같은 형태로 정의하는 것이 좋다.

<br />

> **숫자형 이넘**

숫자형 이넘은 기본 초기값이 배열의 인덱스처럼 0이다. 그리고 초기값을 기준으로 1씩 늘어간다. 배열과의 차이점은 초기값을 개발자가 지정할 수 있다는 점이다. 사용방법은 객체를 다루는 것과 비슷하다.<br />

숫자형 이넘은 리버스 맵핑을 지원한다. 이넘에 등록된 각각의 키와 값으로 서로의 값을 얻을 수 있는 것이다. 숫자형 이넘만 가능하다. <br />

```ts
// up ~ left 순서로 1 ~ 4가 지정된다.
enum Direction {
  up = 1,
  right,
  down,
  left,
}

function robotWork(command: string, work: Direction): void {
  ...
}

robotWork('robot go straight', Direction.right);

// reverse mapping
const upValue = Direction.up;
const upKey = Direction[upValue];
```

<br />

> **문자형 이넘**

문자형 이넘은 숫자형 이넘과 정의하고 사용하는 방법이 비슷하다. 차이점은 숫자형의 경우 제일 첫 요소에게 초기값을 지정하면 자동으로 그 값이 증가하여 부여되지만, 문자형 이넘은 각 요소에 명확한 값으로 초기화가 필요하다. <br />

```ts
enum Direction {
  up = "up"
  right = "right"
  down = "down"
  left = "left"
}
```

<br />

## 타입스크립트 클래스의 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **기본적으로 자바스크립트로 클래스를 정의하는 것과 비슷하다.**

클래스 내부의 맴버 변수, 객체가 생성될 때 호출되는 생성자 컨스트럭터(constructor), 그리고 특정 동작을 만드는 메서드까지, 클래스를 정의하는 방법에서 타입스크립트는 자바스크립트와 비슷하다. `extends` 키워드로 클래스 상속을 받는 것도 동일하다. <br />

```ts
class Person {
  // 멤버 변수
  name: string;
  constructor(name: string) {
    // 멤버 변수 초기화
    this.name = name;
  }
  sayHello() {
    console.log(`hi, i am ${this.name}`);
  }
}

class Hankyeol extends Person {
  constructor(name: string) {
    // 상속받은 자식 클래스에서
    // constructor를 사용하려면 반드시 super 키워드를 사용해야 한다.
    // super는 부모 클래스의 constructor를 호출한다.
    super(name);
  }
}
```

<br />

> **키워드로 멤버 변수 공개 범위 정하기**

타입스크립트를 사용하면 클래스를 통한 객체 생성 및 상속시에 **부모 클래스의 멤버 변수, 메서드의 공개 범위를 지정**할 수 있다. `private`, `protected`, `public`이라는 키워드를 멤버 변수 앞에 붙여 지정한다. <br />

- `public`은 단어 뜻 그대로 외부에도 노출되고 상속시에 자식 클래스에도 노출되는 범위를 지정한다. 키워드 없이 클래스를 생성할 때, public이 디폴트라고 생각하면 편하다.
- `private`는 개인적이라는 뜻처럼, 외부에도 노출되지 않고 상속이 되는 자식 클래스에도 노출되지 않는다. `#` 기호로 사용할 수 있다. (# 기호는 최근에 추가된 자바스크립트의 표준이다.)
- `protected` 키워드는 상속받는 클래스에만 노출되는 범위를 지정한다. 외부에서는 접근할 수 없도록 보호하는 샘이다. constructor에 붙이면 외부에서 객체를 생성하지 못하도록 막을 수 있다.
- `readonly` 속성 역시 있다. constructor로 멤버 변수에 처음 값을 할당한 이후에는 값을 변경할 수 없다.

```ts
class Shark {
  protected familyMember: string;
  public character: string;
  private constructor(familyMember: string, character: string) {
    ...
  }
}

const babyShark = new Shark('baby', 'charm') // Error: constructor is private
```

<br />

> **멤버 변수 지정 생략하기**

멤버 변수를 지정하고, constructor로 초기화 해주는 코드를 매번 작성하는 것은 정말 번거로운 일이다. 위에서 멤버 변수 사용 범위를 결정하는 키워드를 이용해서 타입스크립트로 클래스를 조금 더 편하게 작성할 수 있다. <br />

constructor 함수의 인자에 들어오는 인자에 사용 범위에 대한 키워드를 붙여주면 된다. <br />

```ts
class Shark {
  constructor(public character: string) {
    // public으로 정의한 요소는 자동으로 멤버 변수로 인식한다.
    // this로 초기화 하는 코드도 필요없다.
  }
}
```

<br />

> **static, abstract 키워드**

class 내부에서 static으로 정의된 멤버 변수와 메서드는 절대적인 값이라고 생각하면 편하다. 클래스로 생성되는 어떤 객체와도 상관없이 내부에서 고정된 값이다. static 키워드로 정의된 변수, 메서드는 앞에 **정적**이라는 말이 붙는다. (적적 멤버 변수, 정적 메서드) <br />

정적 멤버 변수와 정적 메서드는 `클래스명.변수/메서드` 형태로 클래스 이름 자체에 붙어서 호출하고 사용한다. <br />

```ts
class Shark {
  static maxAge = 150;
  constructor(public age: number) {}

  eatHuman(): string {
    // eatingAge 메서드는 정적 메서드라 아래와 같이 사용한다.
    return Shark.eatingAge(this.age) ? "yammy" : "Hmm..";
  }

  static eatingAge(age: number): boolean {
    // maxAge 변수는 정적 멤버 변수라 '클래스명.변수'로 호출한다.
    return Shark.maxAge <= 50;
  }
}
```

<br />

abstract 키워드가 붙은 클래스는 new 키워드로 객체를 생성할 수 없다. 말 그대로 클래스가 추상화 된다는 느낌이다. 또한 abstract는 클래스 내부에서 정의된 메서드 앞에도 붙을 수 있다. 그 클래스를 상속 받는 자식 클래스에서는 abstract가 붙은 메서드를 반드시 정의해주어야 한다. <br />

```ts
abstract class Aligator { ... }
const aligator = new Aligator // Error: cannot create an instance of abstract class

class Shark {
  ...
  abstract eatHuman() {};
}

class BabyShark extends Shark {
  ...
  eatHuman() {...}
}
```

<br />

## 타입스크립트 타입 호환성

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **할당할 수 있는 타입/값의 범위로 따지면 편하다.**

타입 호환성은 정적 타입 언어가 가지는 특성이다. 어떤 타입을 다른 타입으로 취급할 수 있을지? 호환해서 사용할 수 있을지를 판단해주는 특성이라고 생각하면 된다. 타입에 호환성을 따지는 이유는 컴파일 단계에서 호환되지 않는 것을 찾기 위함이다. <br />

특정 변수를 다른 변수에 할당하기 위해서는 그 타입에 할당이 가능해야 한다. 즉, 할당하려는 대상의 타입에 호환되어야 한다는 뜻이다. 호환 여부는 타입의 범위가 큰 것에 작은 것이 호환 된다고 생각하면 쉽다. <br />

```ts
function boundary(a: number, b: number | string): void {
  const v1: number | string = a;
  const v2: number = b; // Error
}
```

위의 코드에서 v2의 경우에는 number 타입만 할당 가능한데, number | string의 값이 될 수 있는 b를 할당하려고 했기 때문에, 그 할당의 범위 크기 비교에서 호환이 이루어 질 수 없어 에러가 났다. `string | number > number`

<br />

> **Structure Typing**

타입스크립트는 값 자체로 타입 호환성을 비교하지 않는다. 값을 가지고 있는 타입의 내부 구조에 기반한다. 그래서 서로 다른 이름으로 정의된 타입들의 내부 구조 즉, 속성의 이름과 그 속성의 타입이 같다면 타입 호환이 가능하다고 판단하는 것이다. <br />

```ts
interface Human {
  name: string;
  age: number;
}

interface Unicorn {
  name: string;
  age: number;
}

const woman: Human = { name: "", age: 20 };
const wnicorn: Unicorn = woman; // 타입이 호환된다!
```

<br />

> **Interface 타입의 호환성**

특정 인터페이스(A)가 다른 인터페이스(B)로 할당되기 위한 조건은 다음과 같다. 쉽게 이해하기 위해서 등호로 크기 비교 느낌을 가져가겠다.

- A에 정의된 속성의 이름은 모두 B에도 동일하게 있어야 한다. `A속성이름 <= B속성이름`
- 이름이 같은 속성에 대해서, A의 속성이 B의 속성에 할당 가능해야 한다. `A 개별 속성 타입 <= B 개별 속성 타입`
- A가 할당될 수 있는 값의 범위가 B보다 넓다. (이 부분을 잘 이해해야 한다.)

```ts
interface Human {
  name: string;
}
interface Shark {
  name: string;
  tooth: number;
}

const baby = { name: "baby", tooth: "28", poop: true };

const babyHuman: Human = baby; // ok
const babyShark: Shark = baby; // Error 타입 호환이 안된다.
babyHuman = babyShark; // 문제 없다. name이 동일하기 때문이다. (값의 범위!)
```

그래서 인터페이스 타입의 호환을 맞출때는 옵셔널 속성(?로 정의)에 주의해야 한다. 옵셔널한 속성은 있을 수도 있고, 없을 수도 있는 속성이라서 값의 범위를 넓여주는 역할을 하게된다.

<br />

> **함수의 타입 호환성**

특정한 함수(A)에 다른 함수(B)를 할당하기 위해서는 다음의 조건을 만족해야 한다. 조건을 둘째치고 가장 중요한 것은 함수의 실행시점에 **그 함수가 어떤 타입을 띄고 있는지**, 그리고 **타입의 범위가 어떤지**가 중요하다.

- A의 매개변수 개수가 B의 개수보다 많아야 한다. 쉽게 생각해서 함수를 동작하기 위해 필요한 매개변수가 많은 것을 적은 것에 할당 할 수 없다는 말이다.
- 같은 위치의 매개변수는 타입 호환성이 맞아야 한다.
- B의 리턴값에 대한 타입이 A의 리턴값 타입보다 그 범위가 작아야 한다.

```ts
// 각 함수 타입 정의
type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => string | number;

// 함수
let f1: F1 = (a, b) => `${a}, ${b.length}`;
let f2: F2 = (a, b) => `${a}, ${b}`;
let f3: F3 = a => `${a}`;
let f4: F4 = a => (a < 10 ? a : "not a");

// 할당 검사
f1 = f3; // ok -> f1의 매개변수가 더 많다. (감당해야 할 값의 범위가 작다.)
f3 = f1; // Error -> 매개변수 차이가 난다.

f1 = f2; // ok -> b라는 매개변수가 f2의 b에 호환된다.
f2 = f1; // Error -> f2의 b 매개변수에 범위가 더 넓어서 호환이 되지 않는다.

f4 = f3; // ok
f3 = f4; // Error -> f4로 호출할 때 반환될 수 있는 값의 타입이 더 넓다.
```

<br />

<div class="comming-soon">to be continue ..</div>

<br />
