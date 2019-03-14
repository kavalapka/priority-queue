const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heap_size = 0;


	}

	push(data, priority) {
	  const node  = new Node(data, priority);
		this.insertNode(node);
    this.heap_size +=1;
		this.shiftNodeUp(node);
	}

	pop() {
    this.heap_size-=1;

		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
	  return this.heap_size;


	}

	isEmpty() {
	  if(!this.root) {
	    return true
	  } else {
	    return false
    }
	}

	clear() {
	  this.root = null;
	  this.parentNodes = [];
	  this.heap_size = 0;
		
	}

	insertNode(node) {
	  if(this.isEmpty()){
	    this.root = node;
    }
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
