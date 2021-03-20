---
layout: post
title: "혹시라도 누군가가 새로운 맥(Mac)을 사준다면.."
subtitle: "앱등이🐛의 맥북 세팅, 도화지에서 개발모드로 (맥도날드 아닙니다)"
date: 2021-03-20
background: "/img/posts/post-review.png"
tags: [etc]
---

> 저의 개발 환경은 다음과 같습니다. <br />
> 사이드 및 공부 : MacBook-Pro-16 2019, Big Sur 11.1 <br />
> 업무 : MacBook-Pro-13 2020, Catalina 10.15.7 <br />
> 집에서 가지고 놀기 : Mac Mini M1, Big Sur 11.1 <br />
> 이번 블로그는 인텔 기반의 맥을 대상으로 합니다!

<br />

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### Before 개발 공부

대학생 시절 사용했던 맥북프로에서 '터미널앱(terminal)'을 열어볼 일이 딱 한 번 있었다. 맥북을 나보다 일찍부터 사용했던 친누나와 함께 카페에서 공부를 할 때였다. 우연하게 누나 맥북을 봤는데, 런치패드에 앱 아이콘들이 작은 크기로 오밀조밀하게 잘 배치가 된 모습을 마주하고 내 것에도 해달라고 한 것이 그 시작이었다. 누나는 자연스럽게 터미널앱을 열더니 몇 가지 명령어(?)를 입력하고는 트랙패드에서 다섯 손가락을 오므렸다. 나의 맥북 런치패드도 동일하게 앱 아이콘들이 작은 크기로 오밀조밀 잘 모여있었다. 신선한 충격 뒤로는 터미널을 열기까지 아마 2년은 걸린 것 같다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

<img src="/img/posts/210320/launchpad.png" style="width: 100%; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

위의 사진처럼 내가 새로운 맥을 사거나 또는 누군가에게 받으면 가장 먼저하는 일이 런치패드의 아이콘 사이즈를 줄이는 것이다. 디폴트로는 앱 아이콘들이 나에게는 너무 크다고 판단되어서 조금 귀찮지만 가장 먼저 해준다. 이렇게 만드는 방법은 아래의 명령어를 터미널앱에서 순서대로 입력하면 된다. `rows`는 런치패드에 격자를 나눈다고 했을때 생성할 행의 갯수다. `columns`는 반대로 열의 갯수를 의미한다. 사진에서 보면, 한 줄(행)에 7개의 앱 아이콘이 배치된 것을 알 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ defaults write com.apple.dock springboard-rows -int 12
$ defaults write com.apple.dock springboard-columns -int 7
$ killall dock
```

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

github을 알기 시작하고 jekyll과 jQuery로 블로그를 만들 때 다시 터미널을 열어야 했다. homebrew(홈브루)[^1]로 루비를 설치하고 git을 연결해주는 작업만 정말 하루 종일 검색하면서 진행했었다. 블로그를 구축한 다음에도 git 명령어를 통해서 포스팅하는 작업을 위해 터미널을 열었었다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 이 블로그를 쓰는 목적

개발 공부를 시작하고 나서는 더 많은 것들을 맥에 세팅해주어야 했다. 이 설정들은 지금도 새로운 맥을 얻게 된다면 개발 환경 구축을 위해서 매번 해준다. 사실 이 블로그를 작성하는 가장 주요한 목적이 지금부터다. 매번 까먹기 때문에 더 이상의 검색을 하지 않고 바로 블로그로 확인하기 위해서!

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 1. Iterm2 설치와 Homebrew, oh-my-zsh 설정

그렇다. 맥에서 기본적으로 제공하는 터미널앱은 이제 이쁘지가 않다. 나는 [Iterm2](https://iterm2.com/)를 사용한다. macOS 10.14 버전 이상부터 지원하는 터미널앱이고 다양한 테마를 사용할 수 있다! (쑤아리-📣) 그리고 다양한 개발 프로그램을 설치할 수 있게 도와주는 Homebrew를 설치한다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

Homebrew 설치 전에 Iterm2를 실행시키면 똑똑한 맥이 auto-install을 통해서 개발환경을 구축하냐고 묻는다. 그때 확인 버튼을 누르면 xcode와 관련된 설치가 진행된다. (xcode 자체를 설치하는 것은 아니다!) 그런데, 중고로 맥을 사면 이 auto-install 팝업이 뜨지 않는 것도 같았다. 그럴때는, `$ xcode-select --install`로 개발 환경을 구축할 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

[Homebrew](https://brew.sh/)는 공식문서 가장 상단에 설치 코드가 있다. 그 코드를 복사해서 터미널에 붙여넣으면 끝난다. M1칩이 들어간 맥미니에서 Homebrew를 설치할 때 애를 먹긴했다. 로제타로 우회해서 설치하고 나중에 nvm 설정을 잡아줄 때도.. 우선 M1에 대한 내용은 다음에 정리하기로 하자.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

Homebrew 설치가 완료되면 이제 Iterm에 새로운 옷을 입혀줘야 한다. Homebrew를 굳이 먼저 설치할 필요는 없지만, wget을 사용할 것이라면 있는 것이 좋다. wget은 url을 기반으로 파일을 다운받는 프로그램이다. wget을 이용해서 Iterm에 [OH-MY-ZSH](https://ohmyz.sh/#install)를 한다. 역시 공식문서에 설치 관련 설명이 잘 되어있다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ brew install wget
$ sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 2. oh-my-zsh에 이쁜 테마 입히기

oh-my-zsh는 정말 다양한 테마를 제공한다. 그 중에서 나는 `agnoster`나 `fletcherm`을 사용하는데 정말 다양한 [테마](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)가 있기 때문에 맘에 드는 것을 찾아서 사용하면 된다. 테마 변경은 `~/.zshrc` 파일에 있는 `ZSH_THEME="여기에 원하는 테마를 입력하세요"`에 반영하면 된다. 구글에 검색하면 정말 많은 oh-my-zsh 테마를 다루는 방법을 찾을 수 있다. 😀

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ nano ~/.zshrc
$ ZSH_THEME="fletcherm"

# 반영한 다음에는 ctrl + x -> ctrl + y -> enter 로 저장하고 나온다!
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 3. VSCode 설치하고 Path 설정에서 code 명령어 먹이기

역시 그렇다. VSCode를 주력 에디터로 사용하면 모든 문서, 코드 작업을 거기서 하게된다. [VSCode](https://code.visualstudio.com/)를 설치하고 열어서 `cmd shift P`를 누르면 어떤 검색창 같은 것이 에디터 상단에 나온다. 그 검색창에서 `path`를 입력하면 터미널창에서 `code .` 명령어로 VSCode를 열수 있게 등록하는 액션이 나오는 것을 경험할 수 있다. (아래 사진 참고!)

<img src="/img/posts/210320/vscode.png" style="width: 100%; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 4. Git Alias 등록하고 git, editor 기본 설정하기

Iterm으로 주로 git 명령어를 많이 활용한다. 그 과정에서 `git commit -m` 등과 같은 길고 번거로운 명령어를 매번 입력하기 귀찮아서 oh-my-zsh에 등록해서 사용중이다. `code . ~/.zshrc`를 입력해서 VSCode에서 쉽게 zsh 설정을 변경해주자.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
# .zshrc 파일

alias gl="git log --graph --decorate --oneline --all"
alias gs="git status"
alias c="clear"
alias mysql="mysql -u root -p"
```

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

주로 위의 단축형 alias를 설정한다. 더 많지만 다 적기에는 너무 커스텀화 되어 있어서 소개하기 애매했다. 파일에 등록한 alias는 Iterm2에서 `source ~/.zshrc` 명령어를 입력해서 적용해 줄 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

그 다음에 내 컴퓨터에서 버전 관리를 목적으로 사용하는 git과 터미널에서 사용할 에디터의 기본값을 설정해준다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ git config --global user.name "hankyeolk"
$ git config --global user.email "email@email.com"
$ git config --glboal core.editor "nano"
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

### 5. NVM으로 Node.js를 설치해주면 끗!

나는 Node.js를 활용해서 웹 개발을 하는 개발자다. 그렇기 때문에 Node의 버전을 쉽게 관리하도록 도와주는 NVM의 설치는 필수적이다. NVM 역시 wget으로 손쉽게 설치할 수 있다. 아래의 코드로 설치가 잘 된다면 `nvm --version` 명령어를 입력했을 때 하단에 버전이 잘 뜰 것이다!

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

그런데 종종 nvm을 설치하다 보면 설치 도중에 `nvm is already installed`라고 하는 벼락과 같은 문구가 뜰 수 있다. 그럴때는 당황하지 말고 아래의 방법을 시도해보자! nvm에 대한 설정이 export 되지 않아서 발생하는 경우가 거의 대부분이다.

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

```bash
$ nano ~/.zshrc

# nano
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# ctrl + x -> ctrl + y -> enter
```

<p style="display: block; margin-top: 0px; margin-bottom: 18px" > </p>

NVM이 잘 설치됐다면, `nvm install 14.16.0` 등의 방식으로 Node.js를 설치하고 사용하면 된다. 나는 보통 LTS 버전을 우선적으로 설치하고 그 다음에 Current 버전을 설치해서 사용한다. 개발은 Current 버전을 이용한다.

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

새로운 맥을 어떻게든 얻게된다면 더 이상 찾아보는 수고를 하지 않고 이 블로그를 참고해야겠다. 새로운 맥이 언제 생길지 모르겠지만 그렇게 하자! 😆

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

---

[^1]: mac os에서 사용하는 패키지 매니저. GUI의 도움 없이 프로그램을 설치하고 제거할 수 있게 도와주는 역할을 한다. 웹상에서 존재하는 운영체제에 맞게 제작된 프로그램을 내 컴퓨터에 쉽게 설치하기 위해 도와준다. 맥에서는 homebrew가 그 패키지 매니저 역할을 한다.

<p style="display: block; margin-top: 0px; margin-bottom: 25px" > </p>
