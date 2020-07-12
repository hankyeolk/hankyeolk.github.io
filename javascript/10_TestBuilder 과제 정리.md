---
layout: post
title: "PRE-TestBuilder 과제 정리"
subtitle: "테스트 기반의 과제 풀이, 반복문을 이용한 테스트 진행"
type: "Javascript"
createDate: "2020-07-12"
js: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 10
---

#### 2주차에 진행한 PRE-Testbuilder 과제에 대해서 정리합니다.

신용카드 카드번호 구성에 특정 조건에 따라 카드 브랜드를 리턴하는 함수를 작성해야 한다. 카드번호와 관련된 조건은 보통 앞 자리 몇개가 XX 번호로 구성된다는 형식이다. 더불어 주어진 조건은 카드 번호의 길이. 두 조건이 잘 맞으면 정해진 카드 브랜드를 알려주는 함수다. 
<br>

나는 그 중에서도 카드 번호 조건이 가장 길고, 경우의 수가 가장 많은 'China UnionPay'에 대해서 어떻게 테스트를 간단하게 돌릴 수 있었는지 정리하고자 한다. start 🚀

<br>

#### 01. 어떻게 모든 경우의 수를 나열하겠어, 반복문을 돌리는 거지

유니언 페이 카드번호 조건은 다음과 같다. 모든 경우의 수에 대한 테스트를 돌리기 위해 몇 가지의 함수를 작성해야 했다.

- 카드번호는 다음의 수로 시작해야 한다. 622126 ~ 622925, 6282 ~ 6288, 624 ~ 626. (경우의 수가 엄청나다.)
- 카드번호의 길이는 16자리에서 19자리 사이다. 
- 나올 수 있는 모든 경우에 대해서 chai test를 돌릴 수 있어야 한다.
<br>

위의 조건을 충족하기 위해서 우선 카드 번호를 배열로 구성해주는 함수를 작성하고, 모든 카드 번호 구성을 한 배열에 합쳐줬다.
<br>

```js
// 카드 앞자리 범위에 대한 모든 요소를 배열에 넣는 함수.
// 시작과 끝으로 들어오는 인자가 number 타입이라 string으로 변경해준다.

function cardNumMaker(start, end) {
   let arr = []

   for (let i = start; i <= end; i += 1) {
      arr.push(String(i))
   }

   return arr;
}
```

위의 함수로 어마무시한 유니언 페이 카드의 카드 범위를 조금 손쉽게 다룰 수 있다. 이제 찾아진 모든 카드 시작 번호들을 한 배열에 합친다. 여기서는 rest operator의 개념을 사용했다.
<br>

```js
const union = [...cardNumMaker(622126, 622925), ...cardNumMaker(6282, 6288), ...cardNumberMaker(624, 626)]
```

<br>

#### 02. 이제 조건을 세워 카드가 China UnionPay 인지 알려주자.

조건문의 식이 조금 길어지겠지만, 정확했다. start 🚀
<br>

```js
   // cardNumber은 함수의 인자로 들어오는 카드 번호 문자열이다.

   if (
      (union.includes(cardNumber.slice(0, 4)) 
      || union.includes(cardNumber.slice(0, 6)) 
      || union.includes(cardNumber.slice(0, 3))) 
      && (cardNumber.length >= 16 && cardNumber.length <= 19)) {
         
         return 'China UnionPay';

      }
```

<br>

#### 03. 모든 경우에 대해서 테스트를 돌리자.

모든 준비는 다 되었다. 다만, 테스트에 돌릴 경우의 수는 16~19 자리에 해당하는 카드 번호의 문자열이다. 그래서 나는 이미 만들어진 카드 번호 앞자리 뒤에 카드 길이에 맞게 뒤붙여지는 임의의 카드 번호를 줘야했다. 그래서 카드 앞자리 번호와 길이를 인자로 받아 뒤에 카드 길이만큼 '1'을 붙여주는 함수를 만들었다.
<br>

```js
function restMaker(info, leng) {

   //카드 앞자리 번호의 길이를 전체 길이에서 빼준다.
   const rest = leng - Number(info.length)
   const addOne = ''

   for (i = 1; i <= rest; i += 1) {
      addOne = addOne + '1';
   }

   return addOne; // -> (622126)1111111111
}
```
<br>

그 다음은 이제 chai 테스트로 즉시 실행하는 반복문을 만들어야 한다. 여기서는 IIFE 라고 하는 즉시 실행 함수의 개념을 이용했다. 즉시 실행하고자 하는 함수 구문을 ()로 두르고 그 함수를 실행하기 위해 마지막에 실행 ()를 취해주면 된다. `(function(){})()` 이렇게!
<br>

```js
   for (let i = 0; i < union.length; i += 1) {
      for (let j = 16; j <= 19; j += 1) {

         // IIFE start!
         (function () {
         it(`has a prefix of ${union[i]} and a length of ${j}`, function () {
            cardBrand(union[i] + restMaker(union[i], j)).should.equal('China UnionPay')
         })
      })()

    }
  }

// -> 'has a prefix of 622126 and a length of 16, 622126111111111 === china unionpay  
```

<br>

테스트 빌더 과제는 이전에 배운 조건문과 반복문을 잘 활용해서 함수를 구성하고, 직접 모든 경우에 대한 테스트를 돌려야 했다. 생각해보면 단순한 반복문과 함수를 구현하는 과정이었지만, 내가 직접 만든 함수로 컴퓨터가 원하는 행동을 한다는 것이 너무 신기했다. 정말 재미있는 과제였다. 😆