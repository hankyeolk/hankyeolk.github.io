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



// tree structure

class Node {
   constructor(data, left, right) {
      this.data = data;
      this.left;
      this.right;
   }
}

function compareData(root, node) {
   // 최상위 루트가 정해지지 않았으면 해당 루트에 노드를 연결
   if (!root) return node;

   // 입력받는 노드의 데이터 값과 루트 노드의 데이터 값을 서로 비교
   // 작으면 왼쪽으로 다시 보낸다. 
   if (node.data < root.data) {
      root.left = compareData(root.left, node)
      return root;

   } else {
      // 루트보다 크면 오른쪽으로 보낸다.
      root.right = compareData(root.right, node);
      return root;
   }
}
function search(data, node) {
   // 찾는 노드가 있는지 없는지
   if (node) {
      // 있다면, 값과 크기를 비교하여 루트 정하기
      // 작다면 왼쪽으로
      if (data < node.data) {
         return search(data, node.left)

         // 크다면 오른쪽으로
      } else if (data > node.data) {
         return search(data, node.right)

         // 바로 원하는 값이 있다면 > 재귀 탈출
      } else {
         return node;
      }

      // 찾는 노드가 없거나 처음 구성된 노드가 없다면 > 탈출, false
   } else {
      return false;
   }
}

function deletes(data, root) {
   let newRoot, exchange, temp

   // root값이 없다면 false
   if (!root) return false;

   // 삭제할 데이터가 루트 데이터보다 작다면 왼쪽으로 재귀
   if (data < root.data) {
      root.left = deletes(data, root.left)
      // 반대로 크다면 오른쪽으로 재귀   
   } else if (data > root.data) {
      root.right = deletes(data, root.right)

      // 삭제하고자 했던 노드에 도착했다면 
      // 이제 이진 트리 구조를 유지하는 경우로 분류
   } else {
      // 1. 왼쪽 자식이 없다면
      if (!root.left) {
         newRoot = root.right;
         return newRoot;
         // 2. 오른쪽 자식이 없다면   
      } else if (!root.right) {
         newRoot = root.left;
         return newRoot;

         // 3. 오른쪽, 왼쪽 다 자식이 있다면
      } else {
         // 우선 변경할 값을 임시로 지정
         exchange = root.left

         // exchange에 지정한 노드 보다 큰 값을 가진 노드가 있다면
         // exchange 값을 그 노드의 값으로 변경 
         // 반복문으로 위치 바꿀 값 결정
         while (exchage.right) exchange = exchange.right;

         temp = root.data;
         root.data = exchange.data;
         exchange.data = temp; // -> 이 값을 삭제

         root.left = deletes(exchange.data, root.left)
      }
   }
   return root;
}

class Tree {
   constructor(count, root) {
      this.count = 0;
      this.root;
   }


   // Tree에 값을 입력하는 메소드 add
   add(data) {
      let node = new Node(data);

      // 구성된 노드가 없으면 새 노드를 루트에 연결
      if (this.count === 0) {
         this.root = node;

         // 이미 만들어진 루트가 있다면, 루트 값과 크기 비교가 필요하다
         // 그래서 compareData 함수를 콜백   
      } else {
         compareData(this.root, node);
      }

      return this.count += 1;
   }


   // 찾는 값의 여부를 알려주는 get 메소드
   get(data) {
      // root 가 있다면 콜백으로 조회
      if (this.root) {
         return search(data, this.root);

         // 없다면 false!   
      } else {
         return false;
      }
   }
   remove(data) {
      // 해당하는 데이터를 삭제한 트리 구조를 node에 담았다.
      let node = deletes(data, this.root)

      // 해당하는 데이터가 있다면 root를 노드에 연결
      if (node) {
         this.root = node;
         this.count -= 1;

         if (this.count === 0) this.root = null;
      }

      return true;
   }
}