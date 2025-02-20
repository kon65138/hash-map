import './style.css';

class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    this.initCapacity = capacity;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];
    for (let i = 0; i < capacity; i++) this.buckets.push(0);
    this.entries = 0;
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
      this.entries++;
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
      if (recursiveSearch(this.buckets[index]) === 1) this.entries++;
    }
    if (this.capacity * this.loadFactor === this.entries) this.load();
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
    return this.entries;
  }

  clear(size = this.initCapacity) {
    this.buckets = [];
    this.entries = 0;
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
}
const names = [
  'Aaren',
  'Aarika',
  'Abagael',
  'Abagail',
  'Abbe',
  'Abbey',
  'Abbi',
  'Abbie',
  'Abby',
  'Abbye',
  'Abigael',
  'Abigail',
  'Abigale',
  'Abra',
  'Ada',
  'Adah',
  'Adaline',
  'Adan',
  'Adara',
  'Adda',
  'Addi',
  'Addia',
  'Addie',
  'Addy',
];
let ok = new HashMap(16);
for (let i = 0; i < names.length; i++) {
  ok.set(names[i], i);
}
console.log(ok);
console.log(ok.get('Aaren'));
ok.set('Aaren', 5);
console.log(ok.get('wefiluhadf'));
console.log(ok.has('Aaren'));
console.log(ok.remove('Aaren'));
console.log(ok.get('Aaren'));
console.log(ok.length());
ok.set('miles', 'ur mom lmao');
console.log(ok.length());
console.log(ok.get('miles'));
console.log(ok.keys());
