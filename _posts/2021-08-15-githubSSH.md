---
layout: post
title: 'SSH로 GitHub 연결하기'
subtitle: '기존 https 방식에 인증 더하기'
date: 2021-08-15
background: '/img/posts/post-dev.png'
tags: [git]
---

어느때와 동일하게 로컬에서 업데이트한 코드를 내 원격 GitHub Repository에 push 하려고 할 때, 갑자기 github의 인증 관련 에러가 터미널을 덮었다. 에러의 요지는 이렇다. '2021년 8월 13일부로 GitHub 계정의 비밀번호로 원격의 git 동작을 제어하는 권한을 제한한다'는 것이다. 작년 7월 [GitHub Blog](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)에 글로 미리 공지를 했다는데.. CLI를 통해서 https 주소로 GitHub 원격 저장소에 접근하는 나는 당황하지 않을 수 없었다.

<img src="/img/posts/210815/1.png" style="width: 100%; text-align: center; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 15px" > </p>

근데, 깃헙 블로그에 *'the following customers remain unaffected by this change'*라는 예외 조항이 있었다. 그 중 하나가 `SSH-based` 인증을 한 사람은 괜찮다는 것이었다. 서로 다른 컴퓨터간의 통신에서 '보안성'을 높여주는 SSH 프로토콜 방식 기반의 코드 관리가 가능하다고는 알고 있었다. 다만, https url 형식이 너무 편해서 시도할 생각을 하지 않고 있었다. 경우가 경우인 만큼, 이번에 SSH 프로토콜 방식으로 변경하였다. 그 경험을 공유한다.

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

#### SSH

Secure SHell의 줄임 표현인 SSH는 원격 컴퓨터와의 통신을 위한 프로토콜이다. Secure하다는 것이 강조되기 때문에 '보안'에 집중한 프로토콜임을 알 수 있다. SSH는 기본적으로 2가지의 키로 암호화, 복호화 과정을 거쳐서 통신한다.

SSH에서 2가지 키가 사용된다고 했는데, 그것은 각각 `public key (공개키)` `private key (비밀키)`다. SSH 키를 생성하면 공개키와 비밀키가 동시에 생성된다. 비밀키는 내 로컬 컴퓨터의 특정 장소에, '옵셔널하게 (유저에 의향에 의해) 비밀키 확인을 위한 비밀번호 설정을 할 수 있다.', 저장된다. 공개키는 리모트, 즉 통신하려고 하는 원격 저장소(나의 경우는 GitHub)에 부여한다.

원격 저장소와 통신을 하기 위해서, 요청을 보내는 내 컴퓨터(로컬 환경)에서는 원격 컴퓨터의 공개키와 내 비밀키를 맞추어보고 정확한 '한 쌍'인지를 파악한다. 서로가 한 쌍의 키라는 것이 증명되면 두 컴퓨터 사이에 '암호화된' 채널이 형성되고 서로의 키로 암호화 복호화하는 과정으로 데이터를 주고 받을 수 있다.

GitHub의 원격 저장소의 코드를 복제하고(git clone), 내가 로컬환경에서 작업한 코드를 GitHub 원격 저장소에 올리는(git push) 작업 역시 로컬-원격 저장소간의 통신이다. 그렇기 때문에 '보안'이 강화된 SSH 방식을 사용하면 더욱 안전하게 코드 버전을 관리할 수 있게된다.

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

#### SSH 방식으로 GitHub 연결하기

SSH를 이용해서 GitHub과 코드를 주고 받기 위해서는 `SSH 키`를 가장 먼저 생성해야 한다. 나는 맥(macOS)을 사용하고 있기 때무네 그것을 기반으로 작성하겠다. 사실 다른 운영체제들도 방법은 비슷하다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

**1. 로컬 경로에서 ~/.ssh 를 찾아들어간다.**

```shell
$ cd ~/.ssh
$ ls

$ cat id_rsa.pub
```

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

해당 경로에서 `ls` 커맨드로 존재하는 디렉토리 또는 파일을 살핀다. `id_dsa`, `id_rsa.pub`와 같은 파일이 있을 수 있다. 만약 이 파일이 없다면 키 생성기로 키를 생성해야 한다.

<img src="/img/posts/210815/4.png" style="width: 50%; text-align: center; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

파일이 이미 생성되어 있다면 `cat` 커맨드로 `id_rsa.pub` 파일을 한 번 읽어보면 좋다. ssh-rsa~ 로 시작하는 아주 긴 암호화된 키가 보일 것이다. 확장자가 `.pub`인 것을 보면 이미 눈치챘겠지만, 해당 파일의 키가 공개키다.

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

**1-1. ssh-keygen으로 키 생성하기**

macOS에는 기본적으로 `ssh-keygen`이라고 하는 프로그램이 있다. ~/.ssh 경로에 아무런 파일이 없다면 루트 경로에서 `$ ssh-keygen` 이라는 커맨드를 입력하여 SSH를 위한 키를 생성하면 된다.

그 과정에서 아마 키를 조회하기 위한 비밀번호 설저을 물어본다. 나 같은 경우에는 비밀번호 입력 자체를 번거로워하지 않기 때문에 꼭 설정했다. 비밀번호를 생성했다면 다시 ~/.ssh 경로에 들어가서 파일이 잘 생성되었는지 확인해보자.

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

**2. 공개키 GitHub에 등록하기**

이제 원격 저장소인 GitHub의 내 계정에 내 로컬 컴퓨터에서 생성한 SSH 공개키를 등록해준다. 등록은 GitHub 👉 (우측 상단의 유저 아이콘) Settings 👉 SSH and GPG Keys 👉 (초록색) New SSH Key 버튼 클릭으로 등록하면 된다.

<img src="/img/posts/210815/5.png" style="width: 100%; text-align: center; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

등록을 완료했다면 로컬 터미널에서 `$ ssh -T git@github.com` 명령어로 SSH 방식의 인증이 잘 되었는지 확인할 수 있다.

<img src="/img/posts/210815/2.png" style="width: 50%; text-align: center; border: 1px solid gray;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

**3. SSH 방식으로 GitHub 사용하기**

이제 SSH 기반으로 GitHub 연결을 사용할 준비는 다 마쳤다. 기존과 동일하게 로컬 터미널에서 커맨드라인으로 접근할 수 있다. 다만, SSH 방식의 URL은 https URL과 다르기 때문에 그 부분만 잘 신경쓰면 된다.

**3-1. Git Clone**

[] 안에는 각자의 GitHub 계정, Repository 이름을 작성하면 된다.

```shell
$ git clone git@github.com:[username]/[repository name].git
```

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

**3-2. 기존 레포지토리 SSH 방식 주소로 변경하기**

기존에 https URL 로 등록된 레포지토리밖에 없었던 나는 아래의 커맨드라인으로 통신하고자 하는 원격 저장소의 URL을 다 SSH 방식으로 변경해주었다.

```shell
$ git remote set-url [origin name] git@github.com:[username]/[repository name].git
```

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

SSH 방식으로 GitHub과 연결하는 것에 대한 간략한 경험을 작성했다. 혹시 나처럼 'SSH 방식으로 변경해야 하는데..' 라던지, '아 깃헙 커맨드라인 이제 못쓰나?' 라고 살짝 혼란을 겪은 분이라면 정말 등록 과정이 간단하니 빠르게 시도해보는 것을 추천한다!

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>

참고한 레퍼런스

- [Git SSH 공개키 만들기](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [Git SSH Agent](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

<p style="display: block; margin-top: 0px; margin-bottom: 45px" > </p>
