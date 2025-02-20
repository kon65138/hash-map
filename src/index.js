import './style.css';

class HashMap {
  constructor(capacity, loadFactor = 0.75) {
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
    this.buckets = [];
    this.capacity *= 2;
    this.entries = 0;
    let entries = [];
    for (let i = 0; i < this.capacity; i++) this.buckets.push(0);
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
console.log(ok.has('Abagail'));
