---
layout: post
title: "Typescript 이해하기 3편"
subtitle: "제네릭부터 조건부 타입까지"
date: 2021-01-20
background: "/img/posts/210120/post-typescript.png"
tags: [ts, frontend, backend, series]
---

> 깃헙 TIL 레포에 기록했던 내용을 정리하여 블로깅합니다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

`목차`

[타입을 추론해주는 꺽쇠매직](#동적으로-타입을-추론하는-제네릭) <br />
[반복문 같은 맵드 타입](#타입스크립트-맵드-타입) <br />
[삼항연산자st. 조건부 타입](#타입스크립트-조건부-타입) <br />

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

## 동적으로 타입을 추론하는 제네릭

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

제네릭 문법은 같은 규칙을 여러 타입에 동일하게 적용할 수 있도록 도와준다. 타입 정보가 동적으로 결정되게 하는 요소이기 때문이다. 고정된 타입을 맞춰서 사용하는 것보다 유연하다. 제네릭 문법을 적용하지 않고, 함수에 입력값과 반환값의 타입을 추정하도록 코드를 작성하면 제네릭이 얼마나 편한지 알 수 있다. (개인적으로 제네릭이 타입스크립트에서 제일 섹시한 문법 같다.)<br />

```ts
function makeArray(defaultValue: string, size: number): string[];
function makeArray(defaultValue: number, size: number): number[];

function makeArray(
  defaultValue: number | string,
  size: number,
): Array<string | number> {
  const arr: Array<string | number> = [];
  for (let i = 0; i < size; i += 1) {
    arr.push(defaultValue);
  }

  return arr;
}

makeArray(1, 5); // Array<number>
makeArray("hi", 5); // Array<stirng>
```

위의 코드에서 `makeArray` 함수는 입력하는 defaultValue의 타입 형태에 따라서 반환값을 알아서 추정해서 반환한다. 하지만, defaultValue에 필요한 타입이 늘어나게 된다면 타입에 대한 정의를 아래처럼 하나하나 해주어야 한다. <br />

```ts
function makeArray(defaultVaule: boolean, size: number): boolean[];

function makeArray(defaultValue: number | string | boolean ...): Array <string | number | boolean> {};
```

<br />

> **반복은 불편해야 한다.**

제네릭 문법을 활용하면 위의 `makeArray` 함수의 입력값에 대한 리턴값 타입 추정을 쉽게 할 수 있다. 쉽게 할 수 있다는 말은 함수의 타입을 일일이 지정할 필요가 없다는 것이다. 제네릭 문법은 `< >` 기호 안에 타입 정보를 입력하는 식으로 사용할 수 있다. <br />

```ts
function makeArray2<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for (let i = 0; i < size; i += 1) {
    arr.push(defaultValue);
  }

  return arr;
}

const arr1 = makeArray2<string>("hi", 5);
const arr2 = makeArray2("hi", 5); // 타입을 알아서 추정해준다.
```

위에서 계속 반복적으로 동일한 코드를 작성해야 했던 불편을 제네릭 문법으로 쉽게 추정시킬 수 있다.

<br />

> **제네릭으로 자료구조 Stack 구현해보기**

제네릭으로 자료구조를 구현하면 편하다. 최근에 들어온 데이터를 가장 먼저 내보내주는 `Stack` 자료구조를 제네릭으로 가볍게 구현해본다. <br />

```ts
class Stack<D> {
  private items: D[] = [];

  push(item: D) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}

const numStack = new Stack<number>();
numStack.push(10);

let strStack: Stack<string>;
strStack = numStack; // Error
```

<br />

> **유연함에도 제약이 필요할때가 있다.**

특정 라이브러리나 프레임워크는 함수에 입력받을 수 있는 타입의 제한을 두는 경우가 있다. 예를들어, 리액트의 속성값(props)는 객체 타입만 허용이 된다. 그래서 컴포넌트 함수에 제네릭 문법을 사용할 경우 우리는 타입을 제한시킬 수 있어야 한다. <br />

타입스크립트는 똑똑해서 제네릭에도 타입을 제한시킬 수 있는 장치를 구비하고 있다. `extends` 키워드를 이용해서 제네릭이 추정할 수 있는 타입의 종류를 제한할 수 있다. `<T extends number | string>` 이렇게 제네릭을 정의하면 `<T>`가 추정할 수 있는 타입은 number, string으로 국한된다. T가 number 또는 string에 할당 가능해야 한다고 생각하면 된다. <br />

```ts
interface Animal {
  kindOf: string;
  age: number;
}

interface Shark extends Animal {
  habitat: string;
}

// keyof 타입 형태로 작성이 되면, 타입에 있는 속성 이름에 할당 가능한 타입이라는 뜻.
// 여기서는 Animal의 kindOf 또는 age로 타입이 정해져야 한다.

function swapProperty<T extends Animal, K extends keyof Animal>(
  p1: T,
  p2: T,
  key: K,
): void {
  const temp = p1[key];
  p1[key] = p2[key];
  p2[key] = temp;
}

const p1: Shark = {
  kindOf: "fish",
  age: 100,
  habitat: "deepSea",
};
const p2: Shark = {
  kindOf: "whale",
  age: 190,
  habitat: "shallowSea",
};
swapProperty(p1, p2, "age");
swapProperty(p1, p2, "habitat"); // Error : Animal에는 habitat이라는 타입 키가 없기 때문!
```

<br />

## 타입스크립트 맵드 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **맵드 타입의 기본 문법**

맵드 타입은 기본적으로 객체 형태의 타입이다. 그래서 인터페이스와 같이 객체 형태의 타입에 어떤 처리를 해주기 위해서 사용된다. 보통, 인터페이스의 속성들을 readonly, optional 속성으로 변경하는 방식으로 사용된다. <br />

사용하는 방법은 중괄호({})안에 대괄호([])로 속성을 표기하는 방식을 사용한다. 제네릭 처럼 타입의 이름을 개발자가 지정하고 `in`이라고 하는 키워드로 속성의 이름을 뒤에오는 것들로 치환한다고 생각하면 편하다. 그러면 대괄호 밖에서 정의된 타입이 그 속성들의 타입이 된다. <br />

```ts
// 두개의 T1은 같은 표기이다.
type T1 = { [K in "prop1" | "prop2"]: boolean };

type T1 = {
  prop1: boolean;
  prop2: boolean;
};
```

마치 함수처럼 사용되는 타입이라 '유틸리티 타입'이라고 불린다. <br />

인터페이스의 모든 속성의 타입을 전혀 다른 타입으로 한 번에 바꿀때도 맵드 타입이 사용된다. 아래의 코드 예시를 한 번 보자. <br />

```ts
interface Shark {
  name: string;
  age: number;
}

type MakeType<T> = { [K in keyof T]?: boolean };
const sharkMap: MakeType<Shark> = {};
sharkMap.name = true;
sharkMap.age = 123; // Error: number 타입은 불린 타입에 할당될 수 없습니다.
```

`MakeType`이라는 타입은 제네릭으로 특정 인터페이스 또는 객체를 받아서 그 인터페이스의 속성을 옵셔널하게 만들고 불린 타입을 할당하게 한다. 우리의 친절한 VSCode는 이 타입의 변환을 잘 캐치한다.<br />

<img src="./img/posts/210120/mapped01.png" style="width: 100%;" />

<br />

> **속성의 타입은 유지하면서 변화주기**

위에 예시처럼 인터페이스나 객체의 속성들에 대한 타입을 일괄적으로 변경할 때만 맵드 타입을 사용하지는 않는다. 오히려 속성들의 타입을 유지하면서 readonly 값을 주거나 optional한 속성으로 만들 필요도 있다. 그런 처리 역시 맵드 타입으로 하면 편하다. <br />

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };

type T1 = Readonly<Shark>;
type T2 = Partial<Shark>;
```

위의 코드에서 `T[P]`라는 문법이 제네릭으로 둘러싸여서 조금 이해하기 힘들 수 있다. 간단하게 대입의 방식을 떠올려보면 좋다. T에는 객체나 인터페이스가 대입될 것이다. P는 `keyof` 키워드로 T에 대입된 인터페이스나 객체의 속성 이름들이 각각 대입된다. 그래서 `T[P]`라고 된 부분을 뜯어보면 **'인터페이스[key]'의 타입을 띄어라** 라는 뜻이다. <br />

그래서 위의 T1은 Shark 인터페이스의 속성들의 타입은 유지하면서, 각 속성에 readonly 속성을 부여했다. T2는 옵셔널 속성으로 변경했을 뿐이다.

<br />

> **타입스크립트의 기본 내장 맵드타입**

위에서 간단하게 구축해본 `Readonly<T>`와 `Partial<T>`는 타입스크립트가 기본적으로 가지고 있는 내장형 맵드타입이다. 그래서 위에서 처럼 따로 타입을 정의하지 않고, 바로 사용할 수 있다. <br />

또 다른 내장 맵드 타입에는 `Pick`이 있다. 이것은 인터페이스나 객체에 대해서 파생 상품을 만드는 느낌의 맵드 타입이다. 아래의 예시 코드로 파악해보자. <br />

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type T3 = Pick<Shark, "age">;
type T4 = Pick<Shark, "age" | "name">;
```

제네릭의 첫 요소는 파생상품을 만들 인터페이스(T)가 온다. 다음 요소로는 그 인터페이스의 키들을 의미하는 K라는 요소가 T의 확장성을 유지한채로 온다. 맵드 타입의 정의부분을 보면 P는 K의 유니온들로 구성되고 인터페이스의 타입은 유지되는 것을 알 수 있다. <br />

그래서 T3라고 하는 타입은 Shark 인터페이스의 모든 속성인 `name, age`를 가질 수도 있고, 위에서처럼 `age`만 가질 수도 있다.

<br />

또 다른 내장 맵드 타입에는 `Record`가 있다. 역시 코드로 파악해보자. <br />

```ts
type Record<K extends number, T> = { [P in K]: T };
type T4 = Recorded<3 | 5, Shark>;
```

Record 맵드 타입도 역시 제네릭으로 그 사용성을 나타낼 수 있다. 첫 요소에는 새로운 인터페이스에 반영할 속성값을 유니온 형태로 넣어서, 이게 어떤 타입으로 확장된 것인지 인식시켜야 한다. 위의 코드에서는 number 타입에 할당 가능한 K들을 입력해야 한다. <br />

그리고 제네릭의 두번째 요소에 타입으로 넣고 싶은 인터페이스 또는 타입을 넣어서 각 속성이 어떤 타입을 지니게 하는지 알려준다. 위의 코드에서는 Shark라고 하는 인터페이스 타입을 넣었다. 그래서 결과적으로 <br />

```ts
interface T4 {
  3: Shark;
  5: Shark;
}
```

라는 타입이 정의 된 것과 마찬가지다.

<br />

> **맵드 타입으로 Enum 타입 구성의 실수 줄이기**

맵드 타입으로 이넘 타입을 조금 편하게(?) 관리할 수 있다. 대괄호 안에서 반복하는 요소에 이넘 타입을 넣어서 빠진 요소가 있는지 확인하는 방식으로 맵드 타입을 사용한다. 직접 예시 코드를 보자.<br />

```ts
enum Fruit {
  Apple, // 0
  Orange,
  Banana,
  Kiwi,
}

const Fruit_Price: { [K in Fruit]: number } = {
  [Fruit.Apple]: 1000,
  [Fruit.Orange]: 1500,
  2: 1200,
  // Error: Kiwi에 대한 값 정의가 없습니다.
};
```

Fruit라고 하는 이넘 타입의 요소들을 K로 받고 있다. 그 때 각각의 K에 대한 타입은 number가 된다. 그래서 Fruit 이넘에 있는 모든 요소에 대한 숫자 값이 정의되어야 한다. `[Fruit.Apple]` 형식으로 부여해도 되고, `2: 1200`처럼 숫자형 이넘의 특징을 잘 살려도 된다. 빠진 요소가 있다면 맵드 타입이 알아서 에러를 보내줄 것이다.

<br />

## 타입스크립트 조건부 타입

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> **조건부 타입 기본 문법**

자바스크립트의 삼항연산자와 생김새가 비슷한 타입 정의가 타입스크립트에도 있다. **조건부 타입**이 그것이다. 기본 문법은 `T extends U ? X : Y`의 형태다. 정말 삼항연산자와 거의 동일한 모양이다. 이때 주의할 점은 삼항연산자가 조건에 따라 다른 **값**을 부여한다면, 조건부 타입은 **다른 타입**을 부여한다는 이야기다. 제네릭 T가 U 타입에 할당이 가능하다면 (T의 타입 범위가 U보다 작다면) X 타입을 가지고, 그렇지 않으면 Y 타입을 가진다. <br />

조건부 타입에서 유니온 타입을 적용하게 되면 우리가 아는 유니온 타입 성립과 조금 다른 결과가 나온다. 아래의 코드를 보자. <br />

```ts
type IsStringType<T> = T extends string ? "string" : "not string";

type T1 = IsStringType<string | number>; // string | not string
type T2 = IsStringType<string> | IsStringType<number>; // = T1
```

`타입 T1`의 경우 string | number가 string 타입보다 범위가 크기 때문에 기본적으로 string 타입에 할당이 불가하다. 그래서 'not string' 타입이 되어야 한다고 생각이 들지만, 조건부 타입에서 유니온 타입을 적용하면 두 타입을 모두 가질 수 있게된다. 그래서 사실상 T1의 타입은 T2의 타입을 정하는 것과 방식이 같다. <br />

위의 코드를 쉽게 설명하면, T에 들어온 유니온 타입을 각각 string에 할당할 수 있는지를 비교하는 것이 조건부 타입이라고 보면 된다. string은 할당 가능하지만, number는 string에 할당이 불가하기 때문에 T1이 'string | not string'의 타입을 가지는 것이다.

<br />

> **Exclude와 Extract 타입**

타입스크립트 내장 타입중에 Exclude, Extract 타입이 있다. 단어 뜻과 비슷하게 동작한다. 이것을 조건부 타입 + 유니온 제네릭으로 쉽게 작성할 수 있어서 기록을 해본다. 이것을 기록하기에 앞서서 유니온 타입에 'never' 타입이 있다면 그것은 제외된다. <br />

```ts
// U에 할당 가능하지 않은 T만 남겨라
type exclude<T, U> = T extends U ? never : T;
type T5 = exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7

// U에 할당 가능한 T만 남겨라
type extract<T, U> = T extends U ? T : never;
type T6 = extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5
```

- `Exclude` 타입은 U에 할당 가능한 T는 빼고 나머지를 타입으로 가지게 해주는 타입이다. <1 | 3 | 5 | 7>에서 1, 5는 할당이 가능하기 때문에 제외하고 <3 | 7>만 타입으로 반영된다.
- `Extract`는 U에 할당 가능한 T만 추출하는 타입니다. 위의 설명과 반대로 동작한다.

<br />

> **ReturnType**

`ReturnType` 역시 타입스크립트 내장 타입이다. 이름에서 유추할 수 있듯이 함수 타입의 리턴값을 그 타입으로 가지게 해주는 유틸리티 타입이다. 내부가 조건부 타입으로 구성되어 있기 때문에 간단하게 알아볼 수 있다. ReturnType을 알아보기 위해서는 `infer`라는 키워드를 알아야 한다. infer 키워드 역시 사전적인 의미와 비슷한데, 타입 추론을 위해서 사용하는 키워드로 반환값을 추론하는데 사용된다. infer 키워드는 값이 정해지지 않은 타입 앞에 와서 그 값의 타입이 무엇인지 추론해준다. `(infer U)[]`라고 되어 있으면 추론되는 U의 타입에 따른 배열이 된다. <br />

```ts
type returntype<T> = T extends (...args: any[]) => infer R ? R : any;

type T7 = returntype<() => string>; // T7: string;
function f1(s: string): number {
  return s.length;
}
type T8 = returntype<typeof f1>; // f1의 반환값을 가진다. T8: number
```

위의 코드에서 살펴보면, 제네릭 T가 R이라는 타입을 반환하는 것으로 추론되는 함수에 할당 가능한지 조건부로 파악한다. 할당이 가능하면 그 타입은 R이 되고 그렇지 않으면 any가 반영된다. T8의 타입을 결정하는 부분에서 함수형 타입인지를 확인하기 위해서 `typeof` 키워드를 사용한 것도 확인할 필요가 있다.

<br />
  
> **Omit 타입**

`Omit`타입 역시 타입스크립트 내장 타입 중 하나다. 사용은 `Omit<T, U>` 형식으로 하고, 제네릭 T 타입에서 U의 키 속성에 해당하는 것을 제외한 나머지를 반환한다. 타입 정의가 함수가 아님에도 불구하고 함수와 같이 무언가를 반환하는 느낌이 강하다. <br />

```ts
type omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
type T11 = omit<Shark, "name" | "age">; // T11: { teeth: boolean }
```

위의 코드에서 U는 제네릭 T의 속성 이름들 중에 할당 가능한 요소로 구성된 유니온이다. 그것들을 T에서 Exclude 타입으로 제외해주고, 남은 것을 Pick 하는 순서로 동작한다. 쉽게 생각해서 인터페이스에서 특정 속성을 제외한 나머지를 타입으로 가지게 해주는 유틸리티 타입이다. **_리액트에서 props를 부분적으로 받는 컴포넌트 코드에 적합할 것 같다._**

<br />

> **여러 타입과 혼용해서 사용하기**

조건부 타입은 여러 다른 타입과 혼용해서 새로운 유틸리티 타입을 만들 때 유용하게 사용된다. 가볍게 하나의 유틸리티 타입을 만들면서 이 부분을 이해해본다. 아래의 코드를 순서적으로 분해해보면서 이해하자.<br />

```ts
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Shark {
  name: string;
  teeth: boolean;
  age: string;
}

type T9 = StringPropertyNames<Shark>; // "name" | "age"
```

`StringPropertyNames`라고 하는 타입이 결정되는 방식이 조금 복잡하다. 맵드 타입과 조건부 타입, 그리고 [keyof T]라는 표현까지.

1. 우선 맵드 타입에서 제네릭 T 타입의 속성 이름들로 K가 구성된다. (유니온 타입)
2. 그 때의 T[K] 즉, K 속성의 타입값이 string인지 아닌지를 조건부 타입에서 결정한다. string이라면 K를 타입으로 지정하니까 T의 속성 이름 자체를 타입으로 배정한다는 뜻이다. 아닐경우 never로 제외시킨다.
3. [keyof T]로 표시된 부분은 말 그대로 제네릭 T의 속성 이름을 이 유틸리티 타입이 반환하는 타입으로 지정하겠다는 뜻이다.

결과적으로 Shark 인터페이스에 이 유틸리티 타입을 적용하면 속성 타입이 string인 `name, age`가 걸러지고 (맵드 & 조건부 타입), 그때의 속성 이름 자체가 유니온 형식으로([keyof T]) T9의 타입에 반영된다.

<br />
