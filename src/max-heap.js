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
    if(this.isEmpty()) {
      return;
    }
    const old_root = this.detachRoot();
    this.heap_size -= 1;
    this.restoreRootFromLastInsertedNode(old_root);
    if (this.root){
      this.shiftNodeDown(this.root)
    }
    return old_root.data
	}

	detachRoot() {
	  const old_root = this.root;
    if (old_root.left) {
	    old_root.left.parent = null
    }
    if (old_root.right) {
	    old_root.right.parent = null
    }
    if (this.parentNodes.indexOf(old_root) > -1) {
	    this.parentNodes = this.parentNodes.filter( (i) => !(i == old_root))
    }
		this.root = null;
    return old_root
	}

	restoreRootFromLastInsertedNode(detached) {
	  const new_root = this.parentNodes.pop();
    if (!new_root){
	    return
    }
    if (detached.left !== new_root){
      new_root.appendChild(detached.left)
    }
    if (detached.right !== new_root){
      new_root.appendChild(detached.right)
    }
    if (!(new_root.left && new_root.right)) {
      console.log('parent.nodes', this.parentNodes.map(x => x.priority), '\n');
      this.parentNodes.unshift(new_root);
      console.log('parent.nodes unshift', this.parentNodes.map(x => x.priority), '\n');
      //this.parentNodes.sort(x => x.priority)
      console.log('parent.nodes sort', this.parentNodes.map(x => x.priority), '\n');
    }

    const old_sub_parent = new_root.parent;
    if (old_sub_parent){
      old_sub_parent.removeChild(new_root);
      if (!(old_sub_parent.left && old_sub_parent.right)){
        this.parentNodes.unshift(old_sub_parent);
        this.parentNodes.sort(x => x.priority)
      }
    }
		this.root = new_root
	}

	size() {
	  return this.heap_size;
	}

	isEmpty() {
	  return !this.root;
	}

	clear() {
	  this.root = null;
	  this.parentNodes = [];
	  this.heap_size = 0;
	}

	insertNode(node) {
	  if(this.isEmpty()){
	    this.root = node;
	    this.parentNodes.push(node);
	    node.parent =  null;
	    return
    }

    if (!this.parentNodes[0].left) {
	    this.parentNodes[0].left  = node;
      node.parent = this.parentNodes[0];
      this.parentNodes.push(node);
    } else {
	    this.parentNodes[0].right = node;
      node.parent = this.parentNodes[0];
      this.parentNodes.push(node);
	    this.parentNodes.shift();
    }
	}

	shiftNodeUp(node) {
	  if(!node.parent) {
      this.root = node;
      return
    }
	  if(node.parent.priority >= node.priority) return;

    const node_ind = this.parentNodes.indexOf(node);
    const parent_ind = this.parentNodes.indexOf(node.parent);

    if (parent_ind === -1 && node_ind !== -1) {
      this.parentNodes[node_ind] = node.parent;
    }
    if (node_ind !== -1 && parent_ind !== -1) {
      this.parentNodes[node_ind] = node.parent;
      this.parentNodes[parent_ind] = node;
    }
	  node.swapWithParent();
    if(!node.parent) {
      this.root = node;
    }
    this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
	  if (!node.left && !node.right) return;
	  
    let child = null;
    if (node.left && node.right) {
      if(node.left.priority > node.right.priority) {
        child = node.left;
      } else {
        child = node.right;
      }
    } else if(node.left) {
      child = node.left;
    } else if (node.right) {
      child = node.right;
    }

    if (child.priority <= node.priority) return;
    if (this.root === node ){
      this.root = child;
    }

    const node_ind = this.parentNodes.indexOf(node);
    const child_ind = this.parentNodes.indexOf(child);

    if (node_ind === -1 && child_ind !== -1) {
      this.parentNodes[child_ind] = node;
    }
    if (node_ind !== -1 && child_ind !== -1) {
      this.parentNodes[node_ind] = child;
      this.parentNodes[child_ind] = node;
    }

    child.swapWithParent();
    this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
