---
layout: post
title: "PRE-TOY 문제풀이 01"
subtitle: "최대공약수 구하기"
type: "Javascript"
createDate: "2020-06-25 시작"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 4
---

### 생각하자 1. 최대공약수 구하기 🦔

- 조건 1. 함수 gcd는 두 정수를 받는다.
- 조건 2. 함수 gcd는 두 수의 최대 공약수를 리턴한다.

최대공약수를 구하는 알고리즘은 재귀를 다루는 것에 있어서 기본과 같은 것이다. 물론 나는 문제를 접할때까지 그런 사실을 알지 못했다. 수학과 관련된 문제를 프로그래밍으로 해결하기 위해서는 규칙을 찾아야 한다. 그러기 위해서는 모다? => 그렇다. **대입과 반복을 통한 규칙 찾기다!**
<br>

**문제를 잘라서 풀어보기1.**  두 수가 같을 때는 num1, num2가 각각 최대공약수다. 

```js
function gcd (num1, num2) {
   
   if (num1 % num2 === 0) {
      return num2;
   }

}
```
<br>

**문제를 잘라서 풀어보기2.**  num1이 크다고 가정했지만, 사실 어떤 수가 들어올 지 모른다. 그래서 나는 일단 num1이 크다는 것을 가정하고, num2에 큰 수가 들어왔을 때 무조건 큰 수를 첫 인자로 받을 수 있는 장치를 마련했다. > 답은 역시 재귀.

```js 

   if (num1 % num2 === num1) {
      return gcd(num2, num1);
   }

```
<br>

**문제를 잘라서 풀어보기3.**  두 수의 나머지가 0이 될때까지 계속 나눠 가는데, 규칙은 1.큰 수를 작은 수로 나누고,  2.두 수의 나머지를 이전 나누기의 작은 수에 계속 나눠가는 것!.

```js
   // 두 수중 num1이 크다고 가정했기에 이렇게 작성 가능하다.
   return gcd(num2, num1 % num2);
```
<br>

그래서 완성된 함수식은 다음과 같다.

```js
function gcd(num1, num2) {

  if (num1 % num2 === 0) {
      return num2
  }
  if (num1 % num2 === num1) {
      return gcd(num2, num1)
  }
  
  return gcd(num2, num1 % num2);
}
```
<br>

한줄평, ***역시 수학적인 머리는 타고날 필요는 있지만, 그것이 아니라면 대입해서 규칙을 찾자!***