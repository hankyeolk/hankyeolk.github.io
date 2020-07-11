let DATA = {
   "el": [
      {
         "name": "Joe",
         "age": "20"
      },
      {
         "name": "Mary",
         "age": "27",
         "book": [
            {
               "name": "Blow",
               "age": "15"
            },
            {
               "name": "Blow",
               "age": "15",
               "book": [
                  {
                     "name": "kelly",
                     "age": "29"
                  }
               ]
            }
         ]
      }
   ]
}

/* 
- 객체와 찾고자 하는 값이 주어졌을 때, 
- data가 깊이가 있는 다중 배열이라면 해당 깊이 만큼 뱉어야 한다.
*/

function findMe(data, value) {
   if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i += 1) {
         if (data[i].name === value) {
            return data[i].age
         }
         if ('book' in data[i]) {
            return findMe(data[i]['book'], value)
         }
      }
   } else if (typeof data === 'object') {
      for (prop in data) {
         if (data[prop] === value) {
            return data[prop]
         } else {
            return findMe(data[prop], value)
         }
      }
   }
}

// hanoi
function solution(n) {
   const answer = [];

   function hanoi(n, from, to) {

      const by = 6 - from - to;

      if (n === 1) {
         answer.push([from, to]);
      } else {
         hanoi(n - 1, from, by);
         answer.push([from, to]);
         hanoi(n - 1, by, to);
      }
      // return answer;
   }
   hanoi(n, 1, 3);

   return answer;
}