const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
		this.size_count = 0;

	}

	push(data, priority) {
    if (this.size_count === this.maxSize) {
      throw this}
    this.heap.push(data, priority);
    this.size_count +=1;

	}

	shift() {
    if (this.isEmpty()) {
      throw this}
		this.heap.pop();
    this.size_count -=1;


    return this.heap.root.data;
	}

	size() {
		return this.size_count
	}

	isEmpty() {
		if (this.size_count === 0) {return true}
		else {return false}
	}
}

module.exports = PriorityQueue;
