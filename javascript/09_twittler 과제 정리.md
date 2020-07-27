---
layout: post
title: "PRE-twittler 과제 정리"
subtitle: "DOM을 잘 다루자!"
type: "Javascript"
createDate: "2020-07-10"
js: false
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 9
---

#### twittler 목업을 구현하고 데이터를 기반으로 랜덤한 트윗을 받거나, 사용자에게 입력 받은 데이터를 트윗으로 바꾸는 과제를 진행하였습니다. 해당 부분에서 꼭 기억하고 싶은 코드를 기록합니다.

---

<br>

우선적으로 DOM을 다루는 영역이기에 이벤트를 달고 싶은 DOM 객체들에 대해서 먼저 정리한다.

```js
const tmpl = document.querySelector("#eachTwit"); // template tag
const twitEl = document.importNode(tmpl.content, true); // template 조작

// ul tag
const twitList = document.querySelector("#twit-list");

// 등록 버튼, 갱신 버튼
const registerButton = document.querySelector("#register");
const renewButton = document.querySelector("#renew-button");
```

<br>

#### 01. 브라우저에 프로그램이 로드 되었을 때, 기본적으로 5개의 트윗이 보여지는 코드

- DATA 배열에서 각 데이터 객체를 조회해서 가지고 와야함.
- onload 되었을 때 이벤트가 작동 되어야 함. 새로고침 되어도 작동.
- **document.importNode(tmpl.content, true)** 를 사용하여 템플릿 테그 내부 요소에 콘텐츠 들을 입력시켜준다.
  <br>

```js
function loadTwit(obj) {
  // obj의 요소를 반복적으로 돌아야 하기 때문에 forEach 메소드 활용
  obj.forEach((el) => {
    twitEl.querySelector("#user-name").textContent = el["user"];
    twitEl.querySelector(".twit-date").textContent = el["created_at"];
    twitEl.querySelector(".twit").textContent = el["message"];

    // 한 사이클이 돌고 나서 ul 태그에 입력된 템플릿 태그 내부 요소들을
    // 제일 윗 요소로 넣어주기 .prepend()
    return twitList.prepend(twitEl);
  });
}

// 이벤트 걸어주기
window.onload = loadTwit(DATA);
```

<br>

#### 02. 반복적인 요소를 간단한 함수로 처리하기

- 사용자로부터 입력 받은 트윗이나, 랜덤하게 생성된 트윗을 DATA 배열에 개별 요소로 저장하는 작업을 개별 이벤트에서 다룬다.
- DATA 배열의 제일 첫 요소 정보를 가지고 와서 트윗 형태로 뿌려주는 함수를 처리하자.
- 사실 위의 코드와 거의 동일하다.
  <br>

```js
function spitTwit() {
  twitEl.querySelector("#user-name").textContent = DATA[0]["user"];
  twitEl.querySelector(".twit-date").textContent = DATA[0]["created_at"];
  twitEl.querySelector(".twit").textContent = DATA[0]["message"];

  return twitList.prepend(twitEl);
}
```

<br>

#### 03. 유저가 직접 입력하는 폼에서 들어오는 데이터로 트윗 반영해주기

- 두 개의 입력폼(유저 이름, 트윗 내용)에 모든 정보가 다 들어와야 새로운 트윗 생성
- 둘 중 하나라도 데이터가 입력되지 않으면 error!
  <br>

```js
function pushRegister() {
  let userName = document.querySelector("#userName").value;
  let userTwit = document.querySelector("#comment").value;
  let twit = {};

  // 모든 입력이 있다면, 이벤트 진행
  if (userName !== "" && userTwit !== "") {
    twit.user = userName;
    twit.message = userTwit;
    twit.created_at = new Date().format;

    DATA.unshift(twit);

    return spitTwit();
  }

  // 입력이 하나라도 없으면, 이벤트 진행 x
  if (userName !== "" || userTwit !== "") {
    alert("Plseae write all of your twit information");
  }
}

// 이벤트 달기
registerButton.onclick = pushRegister;
```

<br>

#### 필터링 이후 다시 돌아가는 버튼 구현하기

- display: none; 처리가 된 템플릿 엘리먼트들의 display 요소를 block으로 설정해준다.
- 버튼 이름을 원래의 것으로 바꿔준다.
- 필터링 코드 아래에 반영해준다.
  <br>

```js
function renewButton() {
  // Dom에서 li 태그 목록은 유사배열 형태로
  // iterable (반복 가능한 객체) 하다.
  for (let el of twitList.children) {
    // ul 태그 아래에는 li 목록들이 있다.
    el.style.diplay = "block";
  }

  // 갱신 버튼의 요소를 변경해준다.
  renewButton.onclick = pushRegister;
  renewButton.textContent = "Renew Button";
}
```

<br>

트위틀러 과제는 아무래도 필터링이 가장 어려웠다. 그리고 버튼 요소를 변경하는 부분에서 많은 공부를 할 수 있었던 것 같다. 재미있다. 너무!
<br>

필터링을 구현하는 코드 관련한 블로그의 링크는 아래와 같다
<br>

[filtering code gogo](https://hankyeolk.github.io/TIL/18_2020.07.02)
