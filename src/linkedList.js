export class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    let head = this.head;
    if (head === null) {
      let temp = new Node(value);
      this.head = temp;
      return;
    }
    function recSearch(node = head) {
      if (node.nextNode === null) return node;
      return recSearch(node.nextNode);
    }
    recSearch().nextNode = new Node(value);
  }

  prepend(value) {
    let temp = new Node(value, this.head);
    this.head = temp;
  }

  size() {
    let head = this.head;
    function recursiveCount(node = head, index = 1) {
      if (node.nextNode === null) return index;
      return recursiveCount(node.nextNode, (index += 1));
    }
    return recursiveCount();
  }

  head() {
    return this.head;
  }

  tail() {
    let head = this.head;

    function recSearch(node = head) {
      if (node.nextNode === null) return node;
      return recSearch(node.nextNode);
    }
    return recSearch();
  }

  at(index) {
    let head = this.head;
    function recursiveFind(node = head, currentIndex = 0) {
      if (currentIndex === index) return node;
      if (node.nextNode === null) return null;
      return recursiveFind(node.nextNode, (currentIndex += 1));
    }
    return recursiveFind();
  }

  pop() {
    let head = this.head;
    function recFind2ndToLast(node = head) {
      if (node.nextNode.nextNode === null) return node;
      return recFind2ndToLast(node.nextNode);
    }
    recFind2ndToLast().nextNode = null;
  }

  contains(value) {
    let head = this.head;
    function recursiveSearch(node = head) {
      if (node.value === value) {
        return true;
      } else if (node.nextNode === null) {
        return false;
      }
      return recursiveSearch(node.nextNode);
    }

    return recursiveSearch();
  }

  find(value) {
    let head = this.head;
    function recursiveFind(node = head, currentIndex = 0) {
      if (node.value === value) return currentIndex;
      if (node.nextNode === null) return null;
      return recursiveFind(node.nextNode, (currentIndex += 1));
    }
    return recursiveFind();
  }

  toString() {
    let head = this.head;
    let string = '';
    function recTraverse(node = head) {
      string += ` ${node.value} ->`;
      if (node.nextNode === null) {
        string += ' null';
        return;
      }
      return recTraverse(node.nextNode);
    }
    recTraverse();
    return string;
  }

  insertAt(value, index) {
    let head = this.head;
    if (index === 0) {
      let temp = new Node(value, this.head);
      this.head = temp;
      return;
    }
    function recursiveFind(node = head, currentIndex = 0) {
      if (currentIndex === index - 1) {
        node.nextNode = new Node(value, node.nextNode);
        return;
      }
      if (node.nextNode === null) return null;
      return recursiveFind(node.nextNode, (currentIndex += 1));
    }
    recursiveFind();
  }

  removeAt(index) {
    let head = this.head;
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }
    function recursiveFind(node = head, currentIndex = 0) {
      if (currentIndex === index - 1) {
        if (node.nextNode === null) {
          node.nextNode = null;
          return;
        }
        node.nextNode = node.nextNode.nextNode;
        return;
      }
      if (node.nextNode === null) return;
      return recursiveFind(node.nextNode, (currentIndex += 1));
    }
    recursiveFind();
  }
}

class Node {
  constructor(value = null, nextNode = null, key = null) {
    this.value = value;
    this.nextNode = nextNode;
    this.key = key;
  }
}
