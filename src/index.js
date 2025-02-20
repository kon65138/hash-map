import './style.css';

class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.initCapacity = capacity;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];
    for (let i = 0; i < capacity; i++) this.buckets.push(0);
    this.numOfEntries = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    if (this.buckets[index] === 0) {
      this.buckets[index] = {};
      this.buckets[index][key] = value;
      this.numOfEntries++;
    } else {
      function recursiveSearch(node) {
        if (Object.entries(node)[0][0] === key) {
          node[key] = value;
          return;
        }
        if (!node.next) {
          node.next = {};
          node.next[key] = value;
          return 1;
        }
        return recursiveSearch(node.next);
      }
      if (recursiveSearch(this.buckets[index]) === 1) this.numOfEntries++;
    }
    if (this.capacity * this.loadFactor === this.numOfEntries - 1) this.load();
  }

  load() {
    let temp = JSON.parse(JSON.stringify(this.buckets));
    this.clear(this.capacity * 2);
    let entries = [];
    for (let bucket in temp) {
      function recursiveSearch(node) {
        if (node !== 0) {
          entries[entries.length] = Object.entries(node).shift();
        } else {
          return;
        }
        if (!node.next) {
          return;
        }
        return recursiveSearch(node.next);
      }
      recursiveSearch(temp[bucket]);
    }
    for (let i = 0; i < entries.length; i++)
      this.set(entries[i][0], entries[i][1]);
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    if (this.buckets[index] === 0) return null;
    function recursiveSearch(node) {
      if (Object.entries(node)[0][0] === key) {
        return node[key];
      }
      if (!node.next) {
        return null;
      }
      return recursiveSearch(node.next);
    }
    return recursiveSearch(this.buckets[index]);
  }

  has(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    if (this.buckets[index] === 0) return false;
    function recursiveSearch(node) {
      if (Object.entries(node)[0][0] === key) return true;
      if (!node.next) return false;
      return recursiveSearch(node.next);
    }
    return recursiveSearch(this.buckets[index]);
  }

  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    if (this.buckets[index] === 0) return false;
    if (Object.entries(this.buckets[index])[0][0] === key) {
      if (this.buckets[index].next) {
        this.buckets[index] = this.buckets[index].next;
      } else {
        this.buckets[index] = 0;
      }
      return true;
    }
    function recursiveSearch(node) {
      if (!node.next) return false;
      if (Object.entries(node.next)[0][0] === key) {
        if (node.next.next) {
          node.next = node.next.next;
        } else {
          delete node.next;
        }
        return true;
      }
      return recursiveSearch(node.next);
    }
    return recursiveSearch(this.buckets[index]);
  }

  length() {
    return this.numOfEntries;
  }

  clear(size = this.initCapacity) {
    this.buckets = [];
    this.numOfEntries = 0;
    this.capacity = size;
    for (let i = 0; i < this.capacity; i++) this.buckets.push(0);
  }

  keys() {
    let arr = [];
    for (let bucket in this.buckets) {
      function recursiveSearch(node) {
        if (node !== 0) {
          arr[arr.length] = Object.entries(node).shift()[0];
        } else {
          return;
        }
        if (!node.next) {
          return;
        }
        return recursiveSearch(node.next);
      }
      recursiveSearch(this.buckets[bucket]);
    }

    return arr;
  }

  values() {
    let arr = [];
    for (let bucket in this.buckets) {
      function recursiveSearch(node) {
        if (node !== 0) {
          arr[arr.length] = Object.entries(node).shift()[1];
        } else {
          return;
        }
        if (!node.next) {
          return;
        }
        return recursiveSearch(node.next);
      }
      recursiveSearch(this.buckets[bucket]);
    }

    return arr;
  }

  entries() {
    let arr = [];
    for (let bucket in this.buckets) {
      function recursiveSearch(node) {
        if (node !== 0) {
          arr[arr.length] = Object.entries(node).shift();
        } else {
          return;
        }
        if (!node.next) {
          return;
        }
        return recursiveSearch(node.next);
      }
      recursiveSearch(this.buckets[bucket]);
    }

    return arr;
  }
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('kite', 56);
test.set('dog', 'paper bag lol');

test.set('moon', 'silver');

console.log(test);
console.log(test.length());

test.set('frog', 34);
test.set('carr', 'basically done now yay');
console.log(test);
