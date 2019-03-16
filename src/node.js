class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;

	}

	appendChild(node) {
    //console.log('this parent append', this)
		if(this.left && this.right) {return}
		if (this.left) {
			this.right = node;
		} else {
      this.left = node;
    }
    node.parent = this
	}

	removeChild(node) {
	  if(this.left === node) {
      this.left.parent = null;
	    this.left = null;
    } else
      if (this.right === node) {
	    this.right.parent = null;
	      this.right = null
	  } else {
        throw this;
      }
  }

	remove() {
	  if (!this.parent) {return}
    this.parent.removeChild(this);
	}

	swapWithParent() {
    if (!this.parent) {return}
    var child = this;
    var parent = this.parent;
    var grand_pa = parent.parent;
    var p_left = parent.left;
    var p_right = parent.right;
    var ch_left = child.left;
    var ch_right = child.right;

    if (grand_pa) {
      child.parent = grand_pa;
      if (grand_pa.left === parent){
        grand_pa.left = child;
      } else {
        grand_pa.right = child;
      }
    }

    if (p_left === child) {
      child.left = parent;
      child.right = p_right;
      if (p_right) {
        p_right.parent = child;
      }
    } else {
      child.right = parent;
      child.left = p_left;
      if (p_left) {
        p_left.parent = child;
      }
    }

    parent.left = ch_left;
    parent.right = ch_right;
    parent.parent = child;

	}
}

module.exports = Node;
