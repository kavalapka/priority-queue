const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
    if (this.size() === this.maxSize) {
      throw this}
    this.heap.push(data, priority);
	}

	shift() {
    if (this.isEmpty()) {
      throw this}
		const root_data  = this.heap.pop();
    return root_data;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.size() === 0;
	}
}

module.exports = PriorityQueue;
