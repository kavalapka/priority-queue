const Node = require('../src/node');

describe('Node', () => {
	describe('#constructor', () => {
		const node = new Node(42, 15);

		it('assigns passed data and priority to this', () => {
			expect(node.data).to.equal(42);
			expect(node.priority).to.equal(15);
		});

		it('assigns this.parent, this.left and this.right to null', () => {
			expect(node.parent).to.equal(null);
			expect(node.left).to.equal(null);
			expect(node.right).to.equal(null);
		});
	});

	describe('#appendChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);
		});

		it('assigns passed child to this.left', () => {
			parent.appendChild(leftChild);

			expect(parent.left).to.equal(leftChild);
			expect(leftChild.parent).to.equal(parent);
			expect(parent.right).to.equal(null);
		});

		it('assigns passed child to this.right if this.left exists', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);

			expect(parent.left).to.equal(leftChild);
      expect(leftChild.parent).to.equal(parent);
			expect(parent.right).to.equal(rightChild);
      expect(rightChild.parent).to.equal(parent);
		});

		it('does nothing if this.left and this.right exist', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
			parent.appendChild(new Node(42, 15));

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});
	});

	describe('#removeChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);

			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
		});

		it('assing null to this.left if passed node is left child', () => {
			parent.removeChild(leftChild);
			expect(parent.left).to.equal(null);
		});

		it('assing null to this.right if passed node is right child', () => {
			parent.removeChild(rightChild);
			expect(parent.right).to.equal(null);
		});

		it('throws error if passed node is not a child of this node', () => {
			expect(() => {
				parent.removeChild(new Node(15, 42));
			}).to.throw();

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});

		it('assigns null to child.parent', () => {
			parent.removeChild(leftChild);

			expect(leftChild.parent).to.equal(null);
		})
	});

	describe('#remove', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(42, 15);

			expect(() => {
				node.remove();
			}).not.to.throw();
		});

		it('calls child.parent.removeChild with child as arg', () => {
			const parent = new Node(42, 15);
			const child = new Node(15, 42);

			parent.appendChild(child);

			sinon.spy(parent, 'removeChild');

			expect(parent.left).to.equal(child);

			child.remove();

			expect(parent.removeChild).to.have.been.calledOnce;
			expect(parent.removeChild).to.have.been.calledWith(child);
			expect(parent.left).to.equal(null);
			expect(child.parent).to.equal(null);
		});
	});

	describe('#swapWithParent', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(15, 42);

			expect(() => {
				node.swapWithParent();
			}).not.to.throw();
		});

		it('updates parent.parent', () => {
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parent.appendChild(child);
			child.swapWithParent();

			expect(parent.parent).to.equal(child);
			expect(parent.left).to.equal(null);
			expect(parent.right).to.equal(null);
			expect(parent.parent.parent).to.equal(null);

			expect(child.parent).to.equal(null);
			expect(child.left).to.equal(parent);
			expect(child.right).to.equal(null);
		});

    it('updates parent.right', () => {
      const parent = new Node(15, 42);
      const child = new Node(42, 15);

      parent.right = child;
      child.parent = parent;
      child.swapWithParent();

      expect(parent.parent).to.equal(child);
      expect(parent.left).to.equal(null);
      expect(parent.right).to.equal(null);
      expect(parent.parent.parent).to.equal(null);

      expect(child.parent).to.equal(null);
      expect(child.right).to.equal(parent);
      expect(child.left).to.equal(null);
    });

		it('updates parent.parent.parent', () => {
			const root = new Node(8, 8);
			const child = new Node(4, 4);
			const grandson = new Node(2, 2);

			root.appendChild(child);
			child.appendChild(grandson);

			grandson.swapWithParent();

			expect(child.parent).to.equal(grandson);
			expect(grandson.parent).to.equal(root);
      expect(grandson.parent.parent).to.equal(null);
			expect(grandson.left).to.equal(child);
			expect(grandson.right).to.equal(null);
			expect(child.parent.parent).to.equal(root);
			expect(child.left).to.equal(null);
			expect(child.right).to.equal(null);
		});

		it('updates child.parent', () => {
			const parentOfParent = new Node(100, 500);
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parentOfParent.appendChild(parent);
			parent.appendChild(child);
			child.swapWithParent();

			expect(child.parent).to.equal(parentOfParent);
		});

		it('updates parent.child.parent', () => {
			const root = new Node(1, 2);
			const left = new Node(3, 4);
			const right = new Node(5, 6);

			root.appendChild(left);
			root.appendChild(right);

			right.swapWithParent();

			expect(left.parent).to.equal(right);
			expect(right.parent).to.equal(null);
			expect(right.left).to.equal(left);
			expect(right.right).to.equal(root);
			expect(root.parent).to.equal(right);
		})

		it('updates children of node and parent node', () => {
			const root = new Node(42, 15);
			const left = new Node(13, 42);
			const right = new Node(0, 1);
			const childOfLeft = new Node(0, 15);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);

			left.swapWithParent();

			expect(left.right).to.equal(right);
			expect(right.parent).to.equal(left);
			expect(left.left).to.equal(root);
			expect(root.parent).to.equal(left);
			expect(root.left).to.equal(childOfLeft);
			expect(childOfLeft.parent).to.equal(root);
		});

		it('maintains correct state of parent.parent.left and parent.parent.right', () => {
			const root = new Node(15, 42);
			const left = new Node(42, 15);
			const right = new Node(13, 42);
			const childOfLeft = new Node(13, 34);
			const childOfRight = new Node(0, 1);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);
			right.appendChild(childOfRight);

			childOfLeft.swapWithParent();
			childOfRight.swapWithParent();

			expect(root.left).to.equal(childOfLeft);
			expect(childOfLeft.parent).to.equal(root);
			expect(root.right).to.equal(childOfRight);
			expect(childOfRight.parent).to.equal(root);
			expect(childOfLeft.left).to.equal(left);
			expect(childOfRight.left).to.equal(right);
		});

    it('maintains correct state of parent if right.priority is equal', () => {
      const root = new Node(15, 42);
      const left = new Node(42, 15);
      const right = new Node(13, 42);
      const childOfLeft = new Node(13, 34);
      const childOfRight = new Node(0, 1);

      root.appendChild(left);
      root.appendChild(right);
      left.appendChild(childOfLeft);
      right.appendChild(childOfRight);


      right.swapWithParent();
      expect(root.data).to.equal(15);
      expect(root.priority).to.equal(42);
      expect(root.right).to.equal(right);
    });

    it('maintains correct state after swap right, left, childOfLeft', () => {
      const root = new Node(15, 42);
      const left = new Node(42, 15);
      const right = new Node(13, 41);
      const childOfLeft = new Node(13, 34);
      const childOfRight = new Node(0, 1);

      root.appendChild(left);
      root.appendChild(right);
      left.appendChild(childOfLeft);
      right.appendChild(childOfRight);

      right.swapWithParent();
      expect(right.left).to.equal(left);
      expect(right.right).to.equal(root);
      expect(right.left.left).to.equal(childOfLeft);
      expect(right.right.left).to.equal(childOfRight);

      left.swapWithParent();
      expect(left.left).to.equal(right);
      expect(left.parent).to.equal(null);
      expect(root.parent).to.equal(left);

      childOfLeft.swapWithParent();
      expect(left.left.left).to.equal(right);
      expect(left.right.left).to.equal(childOfRight);
      expect(childOfLeft.parent).to.equal(left);
      expect(childOfLeft.left).to.equal(right);
    });

	});
});
