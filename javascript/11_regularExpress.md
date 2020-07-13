---
layout: post
title: "Javascript 정규표현식 정리 01"
subtitle: "어렵다고 피하지 말고 천천히 한 걸음씩"
type: "Javascript"
createDate: "2020-07-13"
js: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 11
---

#### 정규표현식에 대해서 천천히 정리해보고자 한다.

- 정규식 표현 리터럴 : `/패턴/(flag)`
- Flag

    플래그는 옵션이지만 사용하지 않으면 문자열 내 검색 매칭 대상이 1개 이상일 경우 **첫 매칭 대상만 검색**하고 끝낸다는 단점이 있다.

    - `/i` : 대소문자를 구별하지 않고 검색한다.
    - `/g` : 문자열 내의 모든 패턴을 검색한다.
    - `/m` : 문자열 행이 바뀌더라도 검색을 계속한다.

    ```jsx
    const targetStr = 'Is this all there is?'

    let regexr = /is/ig; // -> is 라는 패턴을 대소문자 구분없이 모든 패턴에서 검색
    console.log(targetStr.match(regexr)) // -> Is, is, is , 총 3개
    ```

- 다양한 예제
    - +, *

        `+` : 앞의 패턴을 최소 한 번 반복하라는 지시어

        `*` : 0회 이상 반복한다는 의미

        ```jsx
        const str = 'AA AAA BB Aa Bb'

        // 대문자 A 만으로 구성된 문자열을 찾는다 ex A, AA, AAA, ...
        const reg = /A+/g;

        console.log(str.match(reg)); // -> 'AA', 'AAA', 'A'
        ```

    - |, [ ]

        **또는(or)**의 의미를 가진다. / [ ] 는 or 조건으로도 사용되지만 범위를 표현할 때에도 사용된다.

        ```jsx
        const str = 'AA AAA BB Aa Bb 24,000';

        // A로 시작되고 최소 한 번 반복되거나 B로 시작되고 최소 한 번 반복되는 것을 찾아라.
        const reg = /A+|B+/g
        // 위의 식과 동일하다 [] 안은 or로 처리된다.
        const reg = /[AB]+/g

        [ ]로 구간 표현하기
        // 모든 알파벳 찾기
        const reg = /[A-Za-z]+/g

        // 숫자 패턴 찾기
        // 위의 str에서 24,000와 같은 ,로 구분이 된다.
        const regNumb = /[0-9]+/g   
        // 0~9 또는 , 가 한 번 이상 반복되는 문자열 찾기 
        const regNumb = /[0-9,]+/g
        ```

    - \d, \D, \w, \W

        `\d` : 숫자를 나타낸다. 

        `\D` : \d와는 반대로 숫자가 아닌 문자를 검색한다.

        `\w` : 알파벳과 숫자를 의미한다.

        `\W` : \w와는 반대로 알파벳과 숫자가 아닌 요소를 찾는다.

        ```jsx
        const str = 'AA BB Aa Ba 24,000'

        // -> '24,000'
        let reg = /[\d,]+/g

        // -> 'AA BB Aa Ba', ','
        let reg = /[\D,]+/g

        // -> 'AA', 'BB', 'Aa', 'Ba', '24,000'
        let reg = /[\w,]+/g

        // -> ' ', ' ', ' ', ' ', ','
        let reg = /[\W,]+/
        ```

    - ^, $

        `/^패턴/` : 패턴으로 **시작**하는지 검사

        `/패턴$/` : 패턴으로 **끝나는지** 검사

        ```jsx
        const url = 'http://exampl.com'

        let reg = /^http/;
        let reg2 = /com$/
        ```

        `[^]` : 대괄호 안의 ^는 부정을 의미한다. → ex)  `[^a-z]` : 알파벳 소문자로 시작하지 않는 모든 문자열

        ```jsx
        const num = '12345'

        // -> 문자열 전체가 숫자인지 확인
        let reg = /^\d+$/;
        ```

    - 아이디 양식, 이메일 양식, 핸드폰 양식
        - 아이디로 사용가능한지 확인하기 (6~10 자리의 영문, 숫자 허용)

        ```jsx
        const id = 'abCde124ef'

        let idTest = /^[A-Za-z0-9]{6,10}$/
        ```

        - 이메일 양식이 맞는지 확인하기 (방식은 다양할 수 있다.)
        - `\특수문자` : 어떠한 조건이 있는 것이 아닌 말 그대로 그냥 역슬래시 뒤의 특수문자를 의미
        - `?` : 앞에 패턴이 0~1 번 반복되는 것을 의미 (최대 1번만 올 수 있다는 의미와 똑같다.

        ```jsx
        const email = 'kkkkd124_12@gmail.com'

        let emTest = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}+$/;
        ```

        - 핸드폰 양식

        ```jsx
        const phone = '010-1234-1234'

        let phoneTest = /^\d{3}-\d{3,4}-\d{4}$/
        ```