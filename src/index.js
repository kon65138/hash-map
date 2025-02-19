import './style.css';

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = [];
    for (let i = 0; i < capacity; i++) this.buckets.push(0);
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
    } else {
      function recursiveSearch(node) {
        if (node[key]) {
          node[key] = value;
          return;
        }
        if (!node.next) {
          node.next = {};
          node.next[key] = value;
          return;
        }
        return recursiveSearch(node.next);
      }
      recursiveSearch(this.buckets[index]);
    }
  }
}
let ok = new HashMap(0, 16);
