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
    var parent = this.parent;
    var child = this;
    //console.log('parent, child:', parent);


    if (this.parent.left === this) {
      this.left = parent;
      this.right = parent.right;
      this.right.parent = this;
    } else {
      this.right = parent;
      this.left = parent.left;
      this.left.parent = this;
    }
    this.parent = parent.parent;

    //new_child
    parent.parent = this;
    parent.left = child.left;
    parent.left.parent = parent;
    parent.right = child.right;
    parent.right.parent = parent;




    console.log('new parent', this);






    /*var child = this;
    var grand_pa = this.parent.parent;
    parent.removeChild(child);
    console.log('parent RM child', parent, child)
      child.removeChild(child.left)
    } else if ()


    if(grand_pa) {
      grand_pa.removeChild(parent);
      child.appendChild(parent);
      grand_pa.appendChild(child);
    } else {
      child.appendChild(parent);
      console.log('child.append parent', child)
      if(parent.left) {
        child.appendChild(parent.left)
      } else if (parent.right) {
        child.appendChild(parent.right)
      }
      console.log('child.append subling', child)
    }*/

	}
}

module.exports = Node;
