---
layout: post
title: '😈 Redux-Saga를 동작시키는 기본적인 방법'
subtitle: '캔디 크러쉬 사가 말고 리덕스 사가'
date: 2021-02-07
background: '/img/posts/post-dev.png'
tags: [frontend, redux]
---

`블로그 목차`

- [리덕스 미들웨어](#리덕스-미들웨어)
- [리덕스 사가와 제너레이터](#리덕스-사가와-제너레이터)
- [리덕스 사가 시작하기](#리덕스-사가-시작하기)
- [사가 함수와 부수효과 함수들](#사가-함수와-부수효과-함수들)

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## 리덕스 미들웨어

`redux-saga`는 리덕스 생태계를 지탱하고 있는 다양한 미들웨어 중 핫한 미들웨어다. 미들웨어는(middleware Express.js로 서버를 구축할 때 사용되는 여러 미들웨어와 사용성과 느낌이 거의 비슷하다. next라는 메서드로 다음 동작을 부르는 것도 동일하다.(보통 리덕스에서는 리듀서를 호출한다.) 최종적인 동작 처리 이전에 특수한 동작을 만들어내는 역할을 하는 점도 비슷하다. 리덕스에서 최종적인 처리는 상태값에 대한 어떤 변화를 의미한다. 특수한 동작은 비동기 처리등을 들 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

`redux-thunk`도 대표적이고 간단한 리덕스 미들웨어다. 가벼운 비동기처리 목적으로 많이 사용된다. 모듈 자체로 불러와서 사용할 수도 있지만 미들웨어 그 자체로 응용하기 좋은 [코드](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)로 구성되어있다. 하지만 api로 여러 비동기적 동작을 처리하는 것에는 조금 무리가 있어서 제너레이터 문법 기반의 `redux-saga`가 많이 주목받고 있다. 그리고 오늘 다뤄볼 내용도 리덕스 사가다.

<img src="/img/posts/210207/redux-flow.png" style="width: 100%; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## 리덕스 사가와 제너레이터

리덕스 사가는 자바스크립트의 [제너레이터](https://github.com/hankyeolk/TIL/blob/main/Redux/03_saga.md#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0-%EB%AC%B8%EB%B2%95) 문법을 이용한다. `function*` 형태의 특수한 함수로 생성된 제너레이터 객체는 `{ value, done }` 속성을 가지고 있는 정말 특수한 객체다. 제너레이터 함수 내부에서 yield라고 하는 키워드로 다음 값, 동작을 제어한다. 그래서 `while(true)`와 같이 프로그램을 터트리는 무한루프도 제너레이터 함수 내부에서 사용할 수 있다. yield 키워드를 만나면 뒤의 로직이나 값을 전달하고 우선 함수에서 벗어나기 때문이다. `.next()`라고 하는 메서드를 받았을 때만 다음 동작을 처리하기 때문에 비동기적인 처리를 제어하기 좋다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

리덕스 사가가 제너레이터 문법 기반인 것도 비동기적 처리의 인식과 제어를 잘 통제하기 위함이다. 리듀서에 정의된 특정한 액션을 기다리다가 액션이 발생하는 시점에서 yield에 등록된 함수나 로직이 동작하게 하는 것이다. 이런 처리들은 리덕스 사가에 미리 정의된 여러 부수효과(effects) 함수들로 동작하게 된다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## 리덕스 사가 시작하기

리덕스에서 동작하는 것이기 때문에 기본적으로 **액션, (액션 생성자), 리듀서, 스토어**는 구성이 되어있어야 한다. 결국 리덕스를 사용하는 이유는 '상태값 변화'이기 때문이다. 간단하게 유저의 로그인을 인지하는 리덕스 로직을 구성해보면서 사가의 사용법을 확인해보자.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

```js
// reducer/user.js

// action
const LOGIN_REQ = 'LOGIN_REQ';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const loginRequestAction = (userData) => ({
  type: 'LOGIN_REQ',
  data: userData
});

// initialState
const INITIAL_STATE = {
  loginPendding: false,
  loginDone: false,
  loginError: null,
  userData: null
};

// reducer
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return {
        ...state,
        loginPendding: true,
        loginDone: false,
        loginError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginPendding: false,
        loginDone: true,
        userData: action.data
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginPendding: false,
        loginError: action.error
      };
  }
};

export { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAIL, loginRequestAction };
export default reducer;
```

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

위에서처럼 간단하게 로그인 요청에 의한 상태값을 변경할 리듀서 로직을 구성했다. switch 구문에서 기본적인 리듀서 코드가 장황하기 때문에 immer와 같은 패키지를 이용하거나 [createReducer](https://github.com/hankyeolk/TIL/blob/main/Redux/02_reselect.md#%EC%97%AC%EB%9F%AC%EA%B0%80%EC%A7%80-redux-helper%EB%A1%9C-%EC%BD%94%EB%93%9C-%EB%B3%B5%EC%9E%A1%EB%8F%84-%EC%A1%B0%EA%B8%88-%EC%A4%84%EC%9D%B4%EA%B8%B0)와 같은 유틸리티 함수를 직접 구현해서 사용하면 좋다. 우선 일단은 베이직하게 사용한다.

<p style="display: block; margin-top: 0px; margin-bottom: 28px" > </p>

리덕스 사가는 스토어를 만들때 미들웨어로 연결하고, 동작하는 구문을 넣어주면 된다. 그건 어떻게 하냐고? 아래의 코드처럼 하면된다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

```js
// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import rootSaga from './saga';

// 여러 상태값을 변경하는 리듀서들을 하나의 리듀서 함수로 함친다.
const rootReducer = combineReducers({ user });

// 사가 미들웨어를 생성해서 스토어에 연결해준다.
const sagaMiddleware = createSagaMiddleware();

// store 생성
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// 사가 미들웨어에서 통합 사가 함수를 실행시킨다.
sagaMiddleware.run(rootSaga);

export default store;
```

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

하나씩 천천히 알아보자. 리덕스 사가에서 `createSagaMiddleware`를 불러와서 사가 미들웨어 객체를 생성해준다. 생성된 사가 미들웨어를 리덕스 스토어에 `applyMiddleware` 함수의 인자로 넘겨주면 등록된 스토어 상태값을 변경할 때 사가 함수들을 인식할 준비가 되었다. 사가 미들웨어 객체에 있는 `run` 메서드에 통합적인 `rootSaga` 함수를 연결해주면 정말 사가를 사용할 기본 세팅을 끝이다. 이제 남은 것은 rootSaga를 작성하러 가는 일뿐이다!

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

## 사가 함수와 부수효과 함수들

본격적으로 비동기적 액션을 인식하고 상태값을 변경하게 하는 사가 함수들을 작성해보자. 리덕스 스토어에 연결한 rootSaga에 여러 사가 함수들을 연결해주어 사가 함수가 액션을 인식할 수 있도록 처리해주면 된다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

```js
// saga/index.js
import { all, fork } from 'redux-saga/effects';
import userSaga from './user';

// yield 키워드 뒤에 리덕스 사가의 부수효과 함수가 온다.
export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
```

리덕스 사가의 부수효과 함수가 대부분의 비동기 처리를 한다고 보면 된다. 부수효과 함수를 사용하려면 yield로 그 제약을 걸어줄 필요가 있다. rootSaga 제너레이터 함수 내부에 등록된 yield 키워드에는 `all`이라고 하는 부수효과 함수가 붙는다. 단어 뜻 그대로 함수 내부 배열에 등록된 사가 함수들을 리덕스 사가 미들웨어에 등록하는 부수효과 함수다. 등록된 함수가 동시에 실행될 수 있도록 처리한다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

`fork` 부수효과 함수는 액션을 발생시킨다. 사실 rootSaga의 all 함수 내부에서 fork로 사가 함수를 등록해도 되고, 바로 호출하는 형식으로 구성해도 된다. `yield all([userSaga()])` 이런식으로!

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

이제 정말 로그인 액션이 발생한 것을 감지하고 비동기적인 서버 처리 이후의 응답에 따라서 리덕스 상태값을 변경하는 userSaga 함수를 작성해보자.

<p style="display: block; margin-top: 0px; margin-bottom: 28px" > </p>

```js
// login 요청을 보내는 api
// api 함수는 유일하게 제너레이터 함수가 아니다!
function loginApi(data) {
  return axios.post('/api/login', data);
}

// login 요청에 대한 액션이 감지되었을때 상태값 처리를 위해 동작하는 사가 함수
function* loginRequest(action) {
  const userData = yield call(loginApi, action.data);

  try {
    yield put({ type: LOGIN_SUCCESS, data: userData });
  } catch (err) {
    yield put({ type: LOGIN_FAIL, error: err.response.data });
  }
}

// 로그인 요청이 들어오는지를 감지하는 제너레이터 함수
// addEventListener 함수와 그 사용법이 비슷하다.
function* waitLogin() {
  yield takeLatest(LOGIN_REQ, loginRequest);
}

function* waitLogin2() {
  // 제너레이터 문법은 이렇게 무한반복 구문도 yield로 제어할 수 있다.
  while (true) {
    yield take(LOGIN_REQ, loginRequest);
  }
}

// userSaga 함수 등록
export default function* userSaga() {
  yield all([waitLogin()]);
}
```

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

`userSaga`라고 하는 제너레이터 사가 함수에 역시 마찬가지로 all 부수효과 함수가 등록된 것을 볼 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

`waitLogin` 제너레이터 함수는 `takeLatest`라고 하는 사가 부수효과 함수를 동작 시킨다. 동일한 액션에 대한 요청이 여러번 들어올 경우 가장 최근 즉, 가장 마지막 요청을 우선해서 처리하는 부수효과 함수다. 부수효과 내부에서 어떤 액션을 감지할 지 등록하고, 액션이 감지되면 동작시킬 사가함수를 등록한다. 함수를 액션 이름에 등록해서 사용하는 모습이 `addEventListener`와 비슷하다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

등록된 `loginRequest` 제너레이터 함수는 api를 직접적으로 호출한다. yield 키워드 뒤에 `call`이라고 하는 부수효과 함수 내부에서 api가 호출 된 것을 볼 수 있다. 단어 뜻 그대로 비동기 액션을 호출한다. 동기적인 처리를 한다. 첫 인자로 등록한 api 함수에 두번째 인자들을 파라미터로 넘긴다. loginRequest 함수가 실질적으로 컴포넌트 로직에 들어간다는 것을 우리는 알 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 12px" > </p>

loginRequest 함수의 `try ~ catch` 구문 내부에서 액션을 디스패치 시키는 것과 그 로직이 비슷해보인다. `put`이라고 하는 부수효과 함수가 액션 객체를 업데이트 해주는 역할을 한다. 직접적으로 리듀서에 작성한 액션 생성자를 불러와도 되고, 위의 코드처럼 액션 객체 자체를 만들어줄 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

<img src="/img/posts/210207/login-flow.png" style="width: 100%; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 28px" > </p>

그 외에 정말 다양한 리덕스 사가의 부수효과 함수가 있다. 자주 사용하는 부수효과 함수를 마지막으로 정리해본다. 부수효과 함수 앞에서는 yield 키워드로 제약을 걸어준다는 것을 잊지말자

- `take` : 첫 인자로 액션을 등록해서 액션이 발생하는 것을 감지한다. 액션이 발생하면 두번째 인자에 반영한 함수를 호출한다. take가 prefix 형태로 붙은 부수효과 함수는 보통 액션을 감지하고 등록한 함수를 동작시킨다. 하지만 액션을 감지하는 것이 단발적이다.
- `takeEvery` : take 함수와 사용방법은 비슷하지만 비동기적으로 액션을 기다린다. 단발적이지 않다.
- `throttle` : 등록한 시간만큼 요청을 보낼 수 없도록 제한을 거는 부수효과 함수다.

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

나는 리덕스를 사용해서 리액트 프로젝트의 전역적인 상태값을 관리하면서 코드를 작성하고 있다. 당연히 api를 통해서 비동기적인 상태값 변경을 처리하는 로직이 있다. 그때 주로 리덕스 사가를 사용하고 있다. 너무 많은 부수효과 함수들이 있어서 적소에 적합한 부수효과를 발생시키는 것이 아직도 어렵지만, 얼마나 쓰임지 좋은지는 사용할 때마다 짜릿하게 느끼고 있다.
