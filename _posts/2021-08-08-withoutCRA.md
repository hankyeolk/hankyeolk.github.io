---
layout: post
title: 'Create-React-App 없이 리액트 프로젝트 보일러 플레이스 세팅하기'
subtitle: 'Without CRA - 자바스크립트편'
date: 2021-08-08
background: '/img/posts/post-dev.png'
tags: [js, series, book]
---

# Create-React-App 없이 리액트 프로젝트 환경 구축하기

### 직접 환경을 구축해보는 것에 대해서

CRA는 분명히 빠른 리액트 프로젝트를 시작하게 만들어주는 좋은 도구임에는 틀림없다. CRA를 통해서 프로젝트 자체를 빌드 할 수 있다. CRA가 나쁘다는 이야기를 하려고 이 글을 적는 것이 아님을 시작에 강조한다. <br />

그럼에도 내가 이 기록을 남기는 이유는 너무 맹목적인 CRA를 남발하지 않기 위함이다. 웹팩으로 프로젝트를 구축해보면서 어떤 플러그인, 로더를 적소에 적용해야 하는지 배우기 위함이다. 바벨을 통해서 어떻게 언어의 문법간 호환성을 지켜야 하는지를 공부하기 위함이다. <br />

그래도 나는 여전히 CRA가 너무 편하고 좋다. 필요하다면 CRA를 적극적으로 쓰는 것도 좋은 것 같다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 시작은 필요한 모듈 설치로부터

나는 yarn으로 노드 모듈을 설치하는 것을 좋아한다. 조금 더 빠르다는 느낌도 있고, 터미널에서 모듈을 받았을때 나오는 문구도 조금 더 세련된 것 같아서 그렇다. 그래서 기록의 대부분은 `yarn add`로 구성될 것 같다. <br />

우선, 프로젝트를 시작할 폴더를 하나 만들고 `yarn init -y`로 노드 프로젝트임을 드러낸다. 그리고 리액트와 관련된 모듈을 설치한다. `yarn add react react-dom` react-dom은 react와 dom을 직접적으로 연결해주는 모듈이다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> Babel <br />

그 다음, 자바스크립트의 서로다른 문법간의 오류를 하나로 통합해줄 바벨의 모듈들을 설치한다. JSX와 ES6 이상의 문법을 다른 브라우저가 이해할 수 있도록 ES5 문법으로 변환해준다. `yarn add @babel/core @babel/preset-react @babel/preset-env` <br />

바벨의 모듈은 앞에 '@' 마크가 붙는 특징이 있다. 바벨에 대한 자세한 설명은 이전 TIL에 개발환경 구축의 내용을 정리한 것이 있다. 그 부분을 함께 참고하자. [개발환경 이해하기 - Babel](https://github.com/hankyeolk/TIL/blob/main/Dev_Env/babel.md)

- @babel/preset-react : 리액트의 JSX 문법을 자바스크립트 코드로 변환해준다.
- @babel/preset-env : ES6 이상의 자바스크립트 문법을 다른 브라우져에서도 호환 가능하도록 ES5로 변환해주는 프리셋이다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> Webpack and Loader <br />

프로젝트 환경 구축의 핵심인 웹팩과 관련 모듈을 설치한다. <br />
`yarn add -D webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader` <br />

- `webpack-dev-server` : 이름에서도 알 수 있듯이 개발 모드에 필요한 서버를 구동해준다. 컴퓨터의 메모리를 빌려 웹팩을 구동하고 임0시 서버를 띄우는 역할을 한다.
- `css-loader, style-loader` : css 문법을 자바스크립트로 변환해주는 역할을 한다. / css-loader가 변환한 파일을 index.html의 `<style>` 태그에 넣는 역할을 한다.

그 다음, 번들링 파일에 적용할 플러그인을 설치한다. <br />
`yarn add -D html-webpack-plugin clean-webpack-plugin` <br />

- `html-webpack-plugin`: html파일에 번들링된 리액트 코드를 삽입해준다. 그리고 dist 폴더에 번들링된 파일을 옮겨주는 역할을 한다.
- `clean-webpack-plugin` : 번들링이 완료될 때마다 이전의 번들링 결과를 제거해주는 역할을 한다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 이제 바벨, 웹팩 설정 파일을 만들면서 프로젝트 환경을 완성해보자.

> babel.config.js <br />

바벨 설정 파일에는 프리셋을 잘 적용해주는 것이 중요하다. 프리셋은 바벨의 역할들을 모아둔 도구 상자라고 생각하면 편하다. `.babelrc` 이름으로 파일 이름을 지을 수도 있다. 이렇게 사용할 프리셋을 `presets` 항목에 배열로 넣어주면된다.<br />

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react']
};
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

> webpack.config.js <br />

가장 중요한 설정은 웹팩 설정이다. 실질적으로 웹팩으로 어떻게 번들링을 하는지에 따라서 프로젝트의 결과가 완전히 달라질 수 있다. `webpack.config.js`파일을 구축하면서 꼼꼼하게 알아보자.<br />

```js
// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv').config();
```

설정에서 사용하는 개발 모드/프로덕션 모드를 구분하고 개발 서버의 포트 변호를 환경변수로 관리하기 위해서 dotenv를 설치해서 사용했다.

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

```js
module.exports = {
  mode: process.env.mode,
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  resolve: {
    // path.resove 형태로 사용할 수도 있다.
    // 그러면 node의 기본 모듈 'path'를 불러와야 한다.
    extensions: ['.js', '.jsx']
  }
};
```

번들링이 시작될 곳은 리액트 프로젝트에서 보통 리액트 돔에 랜더링을 거는 `index.js`로 정했다. 엔트리 포인트는 개발자가 알아서 정해주면 된다. 번들링 결과는 보통 dist 폴더에 해쉬가 된채로 저장된다. 번들링을 할 파일은 '.js, .jsx'의 확장자를 가진 파일이다. 나는 보통 자바스크립트로 리액트 프로젝트를 할 경우 컴포넌트 파일명을 '.jsx' 확장자로 짓는다. <br />

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
}
```

로더는 rules 항목에서 지정해줄 수 있다. 중점적으로 신경써야 하는 것은 로더의 순서다. 웹팩은 등록한 로더의 배열에서 뒤의 요소부터 번들링에 반영한다. css를 자바스크립트로 변환한 다음 style 태그에 넣어주어야 하기 때문에 위의 순서를 가진다. 또한 node_modules 폴더의 모든 모듈들을 다 번들링 할 필요 없기 때문에 이걸 제외해주는 것도 중요하다.<br />

```js
module.exports = {
  ...,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({
      mode: process.env.mode,
      port: process.env.port
    })
  ],
  devServer: {
    host: 'localhost',
    port: process.env.port,
    open: true,
    historyApiFallback: true,
    hot: true
  }
}
```

플러그인은 각 생성자 함수로 인스턴스를 만들어주는 방식으로 적용한다. `DefinePlugin`의 경우 웹팩의 기본 플러그인이라서 webpack으로 부터 가지고 왔다. `.env` 파일에 등록한 개발 모드와 포트 넘버를 등록해서 사용할 수 있게 해준다. <br />

`devServer`는 개발 서버를 열어주는 용도다. 'hot' 키워드를 true 값으로 설정해서 변화가 발생하면 바로 번들링이 발동되고 서버에 반영될 수 있도록 설정해주면 우리가 react 프로젝트에서 늘 봤던 'yarn start'를 만들어준다. 물론 스크립트에 등록을 해야한다. <br />

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

### package.json 파일에 스크립트 등록하고 리액트 개발 시작하기

```json
"scripts": {
  "start": "webpack serve --progress --mode development",
  "build": "webpack"
}
```

"start" 명령어에 'webpack-dev-server'를 등록해서 리액트 스크립트가 동작할 수 있도록 설정한다. 'hot' 키워드가 등록되어 있기때문에 프로젝트는 리액트의 사소한 변화를 반영할 수 있다. "build" 명령어를 동작하면 dist 폴더에 번들링된 파일들이 생성될 것이다. <br />

이제 우리에게 남은 것은 `public/index.html`을 생성하고 `src/index.js`에 가벼운 리액트 코드를 작성하는 것이다. 물론 `yarn start` 명령어로 웹팩을 돌리고 3000번 포트(.env에 설정해준)에서 결과를 확인하는 것은 덤이다. <br />

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=divice-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>react-twittler</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

```js
// index.js
import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return <div>hello hankyeol</div>;
};

ReactDom.render(<App />, document.getElementById('root'));
```
