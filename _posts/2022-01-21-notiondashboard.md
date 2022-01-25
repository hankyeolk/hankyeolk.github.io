---
layout: post
title: '노션으로 2022년 대시보드 만들기'
subtitle: ''
date: 2022-01-21
background: '/img/posts/220121/main.png'
tags: [blog, notion]
---

2022년 시작부터 나는 휴직을 결심했다. 일과 내 삶이 너무 붙어있었다. 그 둘을 떨어뜨리지 않으면 둘 중 하나는 크게 다칠 것 같다는 판단이 강하게 내려졌다. 2021년 하반기 동료 리뷰에 담긴 주요 키워드도 역시 **‘분리’**였다. 그래서 1월의 첫 주, 나는 휴직모드로 들어갔다.

첫 하루 이틀은 ‘쉬는 것이 무엇인지’를 몸 자체에 이해시키는 것에 집중했다. 2021년에는 ‘쉰다’는 키워드가 내 삶에 전혀 없었기에, ‘쉼’에 대한 정의가 무엇보다 중요했다. 그래서 나는 내 삶을 정리하고, 정리된 삶에서 앞으로 어떻게 살아야 할지를 고민해야 했다.

**가장 편하게 열어볼 수 있고, 이미 잘 쓰고 있으면서, 정리나 기록하고 나면 간지가 나는 플랫폼**이 필요했다. 직접 개발을 해볼까 싶기도 했지만, 노션의 앱 아이콘을 보자마자 ‘굳이?’ 라는 생각이 커졌다. 그래서 노션으로 삶 관리체계를 만드는게 정해졌다.

<p style="display: block; margin-top: 0px; margin-bottom: 48px" > </p>

노션으로 대시보드를 만들기로 결심하고 검색을 정말 많이했다. (아마 ‘notion dashboard’라는 키워드로 검색했던 것 같다.) `reddit`에서 다양한 형태로 나름의 대시보드를 구축한 예시를 찾기 좋았다.

그중에서 Red 라고 하는 이름으로 노션 전문 유튜브와 노션 블로그를 운영하면서, 노션 템플릿을 무료로 제공해주는 유저를 마주하게 되었다. 그녀의 [Tour of My 2022 Notion Dashboard](https://youtu.be/gwU0Sh-M0L4) 영상을 보면서 많은 부분을 참고했다.

나는 노션 대시보드를 통해서 ‘온전한 나의 삶’을 꾸준하게 기록하는 목적을 달성하고 싶고, 이 글을 적는 지금도 내가 구축한 대시보드에 만족감을 크게 느끼고 있다. 아래에서는 대시보드에서 내가 설명하고 싶은 항목별로 어떤 특징을 가지고 있는지 간단하게 설명하고자 한다.

---

<p style="display: block; margin-top: 0px; margin-bottom: 60px" > </p>

#### 일상 루틴 관리

가장 먼저 하루를 주 단위로 가볍게 관리하고 싶었다. 그래서 하루 중에 반드시 진행해야 하는 루틴(=습관) 트래킹 데이터베이스를 만들었다. 한 주를 살아보면서, 내가 반복적으로 수행하는 일이 있다면 습관 항목으로 만들어서 꾸준하게 관리할 수 있게 만드는 것이 이 데이터베이스의 핵심이다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 가장 먼저 2022년의 전체 일정을 테이블에 반영했다.
<img src="/img/posts/220121/weekTracking.png" style="width: 80%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />
<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 월 ~ 일요일로 구성된 한 주만 체크해주는 Formula 속성을 작성했다. (내 생각에 Formula는 노션의 가장 큰 강점 중 하나다.)

  ```markdown
  formatDate(prop("날짜"), "W") == formatDate(now(), "W")
  ```

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 매일의 감정을 기록하고, 습관을 체크하며, 한 줄 일기를 작성하는 습관을 만들고 싶었다. (나에 대해서 솔직하게 기록하고 싶었다.) 그래서 각 관리 항목을 속성으로 만들었다.

  - 매일의 감정 - `Select 속성` / 기록하는 순간에 든 감정을 바로 선택할 수 있게 선택지를 미리 만들어뒀다.
  - 습관들 - `Checkbox 속성` / 루틴이기 때문에 했다 or 안했다 만 관리할 수 있으면 된다고 생각하여 체크박스를 활용했다. 데이터베이스가 길어지는 것은 싫어서 이모지만 반영했다.
  - 한 줄 일기 - `Text 속성` / 말 그대로 하루에 가장 남기고 싶은 한 줄을 적고있다.
  <p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 대시보드 메인 페이지에서 ‘한 주’ 단위로만 보여지는 연결 데이터베이스(linked database)를 반영했다. 데이터베이스 필터에서 Formula로 설정한 값이 true 인 데이터만 불러오게 설정하면 된다.
  <img src="/img/posts/220121/thisWeek.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

주간 트래킹 데이터베이스는 하루를 시작할 때, 특정 습관적인 행동을 했을때, 그리고 자기 직전에만 관리하고 있다. 하루를 아주 간단하게 파악할 수 있어서 편하게 사용중이다.

<p style="display: block; margin-top: 0px; margin-bottom: 72px" > </p>

#### 2022년 목표 관리

하루와 한 주간의 루틴 트래킹으로 ‘소소한 달성’을 이루어 낸다면, 2022년 목표 관리 데이터베이스는 ‘체계적인 달성’을 이루고 싶어서 만들게 되었다.

2021년에는 ‘아 이것도 하고 싶은데’라던지 ‘아 이것도 해야 하는데’와 같은 **생각으로만 머문 목표**가 제법 있었다. **2022년은 생각으로만 머무는 목표를 만들고 싶지 않아서**, 나만의 목표를 관리할 수 있는 체계를 만든 것도 있다. (개인 OKRs 관리용으로도 사용할 수 있을 것 같다.)

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 목표 데이터베이스와 목표 달성을 위한 액션 데이터베이스를 각각 생성한다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 목표 데이터베이스의 핵심은 ‘연결된 액션의 달성 정도가 어떻게 되는지를 파악할 수 있는가?’ 였다.

  <img src="/img/posts/220121/target.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

  - ‘목표 달성 정도’라고 하는 [Rollup](https://www.notion.so/help/relations-and-rollups) 속성을 하나 만들었다. 목표에 연결된 액션 중에서 ‘완료’ 처리가 된 액션의 비율을 보여 줄 수 있게 설정했다. 정말 쉽다!
    <img src="/img/posts/220121/rollups.png" style="width: 50%; height: 60%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />
    <p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>
  - 목표 데이터베이스의 시작일을 등록하고 `1 months` 형식으로 예상 소요 기간을 입력하면 예상 종료일을 계산해주는 Formula 속성도 반영해두었다. (정확한 영어만 입력해야 해서 쓸모가 크진 않다.)

    ```markdown
    dateAdd(prop("시작일"), toNumber(replace(prop("예상 소요 기간"),
    "[A-z]", "")), replaceAll(prop("예상 소요 기간"), "[ 0-9]", ""))
    ```

  <p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 목표 달성을 위한 액션 데이터베이스는 위에서 만든 목표 데이터베이스와 ‘연결(=relations)’ 되는 것이 핵심이다.

  <img src="/img/posts/220121/action.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 완성된 목표 관리 데이터베이스를 대시보드 메인 페이지에 뽑아와서 갤러리 뷰로 보여지게 만들었다. 대시보드에서는 최대한 편하게 관리하는 것이 좋다고 생각해서 목표의 예상 마감일, 목표 현재 달성도만 보여지게 만들었다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

목표, 액션 관리 데이터베이스를 구축으로 1주 ~ 1년 정도의 서로 다른 기간에 내가 달성해야 하는 목표의 체계성을 갖췄다는 사실이 가장 뿌듯하다.

_이 글을 작성하는 것도 특정 목표의 달성을 위한 세부 액션이었다. 글을 다 작성하면 액션 하나를 완료처리 할 수 있어 너무 기쁘다._

<p style="display: block; margin-top: 0px; margin-bottom: 72px" > </p>

#### 글 작성과 카테고리별 모아보기

2022년에 가장 만들고 싶은 습관은 ‘꾸준한 글쓰기’다. 그래서 노션 대시보드 내부에 들어갈 항목을 정하면서 가장 먼저 그린 체계 역시 ‘글 적고 관리하기’ 였다.

노션 데이터베이스에는 [Board View](https://www.notion.so/help/boards)라고 하는 칸반 형식의 멋진 태스크 관리 View가 있다. 글 작성 상태에 따라서 글을 편하게 옮겨다니며 관리할 수 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

<img src="/img/posts/220121/post.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

- 글 카테고리 - 카테고리 데이터베이스와 relation을 가지는 속성이다. 글 카테고리별로 편하게 모아보기 위해서 카테고리 데이터베이스를 구분했다.
- 발행? - 누군가에게 보여주고 싶은 글 vs 나만 볼 수 있는 글을 구분하고 싶었다. 그래서 발행? 속성이 true 인 값만 카테고리별로 모아보는 뷰에서 보여지게 세팅했다.
- 독후감? - 아래에서 설명할 독서 관리 데이터베이스와 relation을 가지는 속성이다. 책을 읽는 것에서 그치지 않고 다음에 쉽게 돌아볼 수 있게 기록하는 목적을 가진다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

<img src="/img/posts/220121/postCategoryView.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 12px;" > </p>

작성된/중인 글마다 부여된 카테고리별로 모아 볼 수 있는 카테고리 데이터베이스를 따로 만들었다. 카테고리별로 몇 개의 글이 있는지를 보여주는 Formula도 가볍게 작성했다.

```markdown
"총 " + format(length(replaceAll(prop("글"), "[^,]", "")) + 1) +
" 개의 글이 " + prop("카테고리") + " 안에 있습니다."
```

<p style="display: block; margin-top: 0px; margin-bottom: 72px" > </p>

#### 독서 관리

많은 사람들이 연초에 ‘올해는 n권의 책을 읽는다’ 라는 3일 유효기간도 가지 않는 (보통은..) 계획을 세운다. 나 역시 매년 초에 그랬고, 대부분은 소소한 달성조차도 못했던 것 같다. 독서라는 목표는 ‘미루기’라는 괴랄한 성질을 잘 이겨내야 하기 때문이다.

그래서 2022년에는 독서 자체를 대시보드로 관리해야겠다 싶었다. ‘n권을 읽자!’라는 뭉실한 목표가 아니라, ‘한 권이라도 관리해서 읽자’였다. 독서 관리 데이터베이스는 글 작성 데이터베이스와 연결성을 가진다.

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

<img src="/img/posts/220121/book.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 전체 페이지 대비 현재 내가 읽은 페이지를 계산해서 Progress를 나타낼 수 있는 Formula를 반영했다. 다른 Formula와 다르게 시각적으로 볼 수 있는 장치를 넣고 싶었다.

  ```markdown
  if(not empty(prop("총 페이지")) and not empty(prop("현재 페이지")),
  slice("❒❒❒❒❒❒❒❒❒❒", 0,floor(10 _ prop("현재 페이지") / prop("총 페이지"))) + " ■ " +
  slice("❒❒❒❒❒❒❒❒❒❒", 0, 10 - floor(10 _ prop("현재 페이지") / prop("총 페이지"))) + " " +
  format(floor(100 \* prop("현재 페이지") / prop("총 페이지"))) + "%", "")
  ```

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 읽기 시작한 날과 다 읽은 날을 기록하여, 특정 카테고리의 책에 대한 완독 기간이 어떻게 되는지 계산해주는 Formula도 반영했다. 기간을 기록할 수 있으면, 그 기간동안 독서를 방해한, 독서를 촉진시킨 요소가 무엇인지 돌아볼 수 있겠다 싶었다.

  ```markdown
  format(if(not empty(prop("다 읽은 날")), dateBetween(prop("다 읽은 날"),
  prop("읽기 시작한 날"), "days"), toNumber("")) + 1) + " 일"
  ```

<p style="display: block; margin-top: 0px; margin-bottom: 24px" > </p>

- 템플릿에는 없지만, 현재 내가 사용하고 있는 대시보드에는 Book Mark를 추가하는 템플릿 버튼을 넣어뒀다. 나는 독서를 하면서 기억하고 싶은 문장, 문단을 필사하는 습관이 있다. 메모장에만 남겨두기는 좀 그런 거 같고, 독후감을 적을때 북마크를 넣으면 간지날 것 같아서 만들어뒀다.

  <img src="/img/posts/220121/bookMark.png" style="width: 60%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

---

<p style="display: block; margin-top: 0px; margin-bottom: 72px" > </p>

대시보드 전체를 구상하고, 각각의 데이터베이스를 만들고, 메인 페이지에서 모아내는 작업은 하루를 꼬박 소모하게 만들었다. 휴직 기간 첫 주, 내 가슴을 뛰게 만든 첫번째 일이었다. 다시 일하러 가고 싶게 만들거나, 내 정신을 힘들게 만드는 그런 뜀박질이 아니었다.

현재 내가 사용하고 있는 대시보드의 모습은 아래와 같다. 매일 아침에 눈을 뜨면 **하루를 위한 계획을 짜고, 루틴을 체크하고, 책 내용을 기록하며 마지막으로 하루의 한 줄을 남기고 마무리**한다. 이 과정을 만든 것이 나에게는 너무 소중하고 지금의 상황을 극복하는데에 많은 도움을 주리라 믿고 있다.

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

<img src="/img/posts/220121/dashboard.png" style="width: 100%; border: none; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; border-radius: 5px;"/> <br />

<p style="display: block; margin-top: 0px; margin-bottom: 32px" > </p>

내가 위에서 간략하게 기록한 각각의 데이터베이스가 포함된 노션 대시보드 템플릿을 만들었다. 이 글을 읽는 사람이 얼마나 될지는 모르겠지만 아래의 북마크(🥷)를 이용해서 편하게 개인 노션 계정에 복제해도 괜찮다.

<div style="text-align: center; width: 40%; height 50px; background-color: #343a40; border: none; border-radius: 5px; box-shadow: rgb(24 25 31 / 15%) 0 6px 35px; cursor: pointer; padding: 5px">
  <a style="font-weight: bold; color: #fab005; text-decoration: none;  line-height: 50px" href="https://bit.ly/hk_templates_notion01" target="_blank">노션 대시보드 템플릿 훔쳐가기 🥷</a>
</div>

<p style="display: block; margin-top: 0px; margin-bottom: 60px" > </p>
