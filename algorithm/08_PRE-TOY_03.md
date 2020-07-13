---
layout: post
title: "별이 4개인 문제 정리 01"
subtitle: "괄호 씌우기..."
type: "Javascript"
createDate: "2020-07-12"
solution: true
text: true
author: "hankyeolk"
post-header: false
header-img: ""
order: 8
---

### 가장 오래 걸렸던 문제. 괄호 씌우기 😨

- 문자열로 특정한 수학 연산식이 들어왔을 때, 적절히 괄호를 넣어 값이 최소가 되게 만들어야 한다.
- ex. '55-50+40' 이 들어오면 55-(50+40) 으로 처리하여 -35가 나오게 해야 한다.
- 괄호를 치는 것도 어떻게 해야 할 지 잘 모르겠는데, 머릿속은 계속 꼬여만 갔다. 문제를 잘게 풀어서 생각한다. 
<br>

우선, 어떤 경우에 값이 최소가 될 수 있는지 알아야 했다. - 다음에 +가 오면 괄호로 묶어서 둘 다 -로 계산되게 해야 했다. 
<br>
다음으로, 전부 -,+로 단일 연산자만 있거나 + 뒤에 -가 이어 나오면 그대로 계산을 진행하면 된다.
<br>
문제에서 처럼 굳이 ()를 입력 해줄 필요가 없다고 생각했다. 그래서 나는 우선 '-' 연산자로 문자열을 구분하고 +가 어떻게 붙어 있는지를 체크하기 시작했다. 🚀
<br>

```js
function findMyBracket(str) {
   let strArr = str.split('-');
   let temp = []

   // 문자열 제일 앞에 '-'가 오는 경우

   // 문자열 제일 앞에 '-'가 오지 않는 경우
}
```

여기서 콘솔을 통하여 문자열 제일 앞에 '-'가 와서 split('-')을 하는 경우에는 배열의 0번 요소가 '' 빈 문자열이라는 사실을 알았다. 이것을 조건으로 처리해주면 될 것 같았다.
<br>

```js
   if (str[0] === '') {

      for(let i = 1; i < strArr.length; i += 1) {

      }

   } else {

      // 문자열 제일 앞에 '-'가 오지 않는 경우

   }
```
<br>

이제, 내가 문자열을 '-'로 split 했기 때문에 '+'가 있는 식은 서로 붙어있는 문자열이고, 숫자만 있는 문자열은 전부 앞에 '-'가 있었음을 알 수 있다. 따라서 '+'로 붙어 있는 식만 반복문 안에서 분리해주고, -로 구성된 친구들은 따로 모아서 더해준 다음 더해준 값에 - 처리를 하면 된다. 
<br>

```js
   if (str[0] === '') {
      for (let i = 1; i < strArr.length; i += 1) {

         // '+'로 붙은 식은 따로 반복문으로 분리 후 배열에 반영
         // 어차피 이 식도 최종 더한 값은 - 처리 필요
         if (strArr[i].includes('+')) {
            let temp2 = strArr[i].split('+')
            for (let j = 0; j < temp2.length; j += 1) {
               temp.push(temp2[j])
            }

         // 아니라면 개별 요소를 배열에 반영
         } else {
            temp.push(strArr[i])
         }
      }

   let result = temp.reduce((acc, cv) => {return Number(acc) + Number(cv)})   
   return -result;
   }
``` 
<br>

첫번째 조건식이 이렇게 길다. 최종적으로 result에 - 처리를 해주는 이유는 앞서서 처음부터 '-' 기호를 구분점으로 split 처리 해주었기 때문이다. 
<br>
이제 문자열의 제일 앞에 '-'가 오지 않는 경우를 처리해주러 가자. 이 조건에서 주의해야 할 점 역시 strArr[0] 요소이다. 이 부분에 '+'로 연결된 요소가 있다면, 그 요소만 따로 반복문을 돌려 분리하고, 최종합계에서 - 처리를 해주면 안된다. 제일 앞 부분이 '+'로 연결되어 있지 않더라도 최종 처리에서 '-'를 붙이면 안된다는 것 명심하자!
<br>

```js

   else {

      // strArr[0]이 '+'로 연결된 경우
      if (strArr[0].includes('+')) {
         let temp2 = strArr[0].split('+');
         strArr[0] = temp2.reduce((acc, cv) => {return Number(acc) + Number(cv)})
      }

      // 아니면 위와 동일한 반복문 돌린다.
      for (let i = 1; i < strArr.length; i += 1) {

         if (strArr[i].includes('+')) {
            let temp2 = strArr[i].split('+')
            for (let j = 0; j < temp2.length; j += 1) {
               temp.push(temp2[j])
            }

         } else {
            temp.push(strArr[i])
         }
      }

      // 결과는 처리가 중요하다.
      // strArr[0]은 무조건 양수이다.
      let result = temp.reduce((acc, cv) => {return Number(acc) + Number(cv)})
      return strArr[0] - result;
   }
   ```

   <br>

   적다보니 풀이가 엄청 길어졌다. 이 문제의 경우 생각하는 시간이 엄청 길었고, 몇 일을 메달려야 했다. 그만큼 생각할 경우가 많고, 로직 자체의 복잡함이 컸던 것 같다. 다 작성하고 나니 내 코드가 지저분해 보이긴하다. 동일한 반복문이 2번 들어가고 그 부분을 조금 더 신경써서 줄일 수 있지 않을까 싶다. 