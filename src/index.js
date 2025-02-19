import './style.css';

class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    this.loadFactor = capacity * loadFactor;
    this.capacity = capacity;
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
        if (node[key]) {
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

    if (this.loadFactor === this.entries)
      for (let i = 0; i < this.capacity; i++) this.buckets.push(0);
    this.capacity = this.buckets.length;
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
