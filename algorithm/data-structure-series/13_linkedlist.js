/*
* 연결리스트를 class 와 new 키워드를 사용해서 구현해본다.
*/

class Node {
   constructor(data, next) {
      this.data = data;
      this.next = null;
   }
}

class Linkedlist {
   constructor(length, head) {
      this.length = 0;
      this.head = null;
   }

   // 앞으로 여기에 메소드를 하나씩 만들어 갈 예정
   search(idx) {
      let current = this.head;
      let count = 0;

      while (count < idx) {
         current = current.next
         count += 1;
      }

      return current.data;
   }
}



