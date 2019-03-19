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
    if(this.isEmpty()) return;
    if (this.size() === 1) {
      this.detachRoot()
      const ret = this.root.data
      this.clear()
      return ret
    }
    console.log('Size: ', this.size(), this.heap_size)
    console.log('Root: ', this.root)
    console.log('Parent nodes: ', this.parentNodes)
    this.heap_size-=1;

    const max_data = this.root.data;
    console.log('root', this.root.data, this.root.priority)


    const leaf = this.parentNodes.pop()
    leaf.parent.removeChild(leaf);
    leaf.parent = null
    console.log('leaf', leaf);
    const left = this.root.left
    const right = this.root.right
    if (leaf === left){
      leaf.appendChild(right)
    } else if (leaf == right) {
      leaf.appendChild(left)
    } else {
      leaf.appendChild(left)
      leaf.appendChild(right)
    }
    this.detachRoot()
    this.root = leaf

    //this.root.data = leaf.data;
    //this.root.priority = leaf.priority;
    //
    this.shiftNodeDown(leaf);

    console.log('return', max_data);
		return max_data;
	}

	detachRoot() {
	  const old_root = this.root
    if (old_root.left) {
	    old_root.left.parent = null
    }
    if (old_root.right) {
	    old_root.right.parent = null
    }

    if (this.parentNodes.indexOf(old_root) > -1) {
	    this.parentNodes = this.parentNodes.filter( (i) => !(i == old_root))
    }
		this.root = null
    return old_root
	}

	restoreRootFromLastInsertedNode(detached) {
	  const new_root = this.parentNodes.pop()
    if (detached.left !== new_root){
      new_root.appendChild(detached.left)
    }
    if (detached.right !== new_root){
      new_root.appendChild(detached.right)
    }

    if (!(new_root.left && new_root.right)) {
      this.parentNodes.unshift(new_root)
      this.parentNodes.sort(x => x.priority)
    }

    const old_sub_parent = new_root.parent
    if (old_sub_parent){
      old_sub_parent.removeChild(new_root)
      if (!(old_sub_parent.left && old_sub_parent.right)){
        this.parentNodes.unshift(old_sub_parent)
        this.parentNodes.sort(x => x.priority)
      }
    }


		this.root = new_root
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
	    this.parentNodes.push(node);
	    node.parent =  null;
	    return
    }

    if (!this.parentNodes[0].left) {
	    this.parentNodes[0].left  = node;
      node.parent = this.parentNodes[0];
      this.parentNodes.push(node);
      /*let a = [];
      let q = [];
      for (let i in this.parentNodes) {
        a.push(this.parentNodes[i].data)
        q.push(i)
      }
      console.log('parentNode data, ind', a, q)*/

    } else {
	    this.parentNodes[0].right = node;
      node.parent = this.parentNodes[0];
      this.parentNodes.push(node);
	    this.parentNodes.shift();
    }

    /*console.log('this.parentNodes[0]', this.parentNodes[0]);
    if (this.parentNodes[0] && !this.parentNodes[0].left){

	    this.parentNodes[0].left = node;
	    node.parent = this.parentNodes[0]

      console.log('new left node', node.data)
    } else if(this.parentNodes[0]) {
      this.parentNodes[0].right = node;
      node.parent = this.parentNodes[0];
      console.log('new right node', node.data)
      console.log('this.parentNodes[0]', this.parentNodes[0]);
      this.parentNodes.shift();
      console.log('after remove full length', this.parentNodes)
      let a = [];
      for (let i in this.parentNodes) {
        a.push(this.parentNodes[i].data)
      }
      console.log('parentNode data1111', a)
    }
    this.parentNodes.push(node);
    let a = [];
    let q = [];
    for (let i in this.parentNodes) {
      a.push(this.parentNodes[i].data)
      q.push(i)
    }
    console.log('parentNode data, ind', a, q)*/
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
		/*while (node.parent && node.parent.priority < node.priority) {

      const node_ind = this.parentNodes.indexOf(node);
      const parent_ind = Math.floor((node_ind - 1) / 2);

      if(node_ind !== -1 || parent_ind !== -1) {
        const parent_node = node.parent;
        this.parentNodes[parent_ind] = node;
        this.parentNodes[node_ind] = parent_node;
      }
      node.swapWithParent();
      this.shiftNodeUp(node);
    }*/
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

    if (child.priority < node.priority) return;

    console.log('child, ch, np', child.data, child.priority, node.priority)

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
