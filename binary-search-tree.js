"use strict";

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** findRecursively(val): Search from the invoking node for a node with value val.
  * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    // base case(s)
    if (this.val === val) return this;

    // if ((val > this.val && !this.right) || (val < this.val && !this.left)) {
    //   return undefined;
    // }

    // if (val > this.val) return this.right.findRecursively(val);
    // if (val < this.val) return this.left.findRecursively(val);

    if (val > this.val && this.right) return this.right.findRecursively(val);
    if (val < this.val && this.left) return this.left.findRecursively(val);
  }

  /** insertRecursively(val): Starting at the invoking node, insert a new node
   * into the BST with value val. Returns the inserted node. Uses recursion. */

  insertRecursively(val) {
    // base case(s)
    if (val > this.val && !this.right) {
      this.right = new Node(val);
      return this.right;
    }
    if (val < this.val && !this.left) {
      this.left = new Node(val);
      return this.left;
    }

    if (val > this.val) this.right.insertRecursively(val);
    if (val < this.val) this.left.insertRecursively(val);
  }

  /** dfsPreOrder(): Traverse from the invoking node using pre-order DFS.
  * Returns an array of visited nodes. */

  dfsPreOrder(vals = []) {
    vals.push(this.val);

    if (!this.left && !this.right) return;

    if (this.left) this.left.dfsPreOrder(vals);
    if (this.right) this.right.dfsPreOrder(vals);

    return vals;
  }

  /** dfsInOrder(): Traverse from the invoking node using in-order DFS.
  * Returns an array of visited nodes. */

  dfsInOrder(vals = []) {
    if (this.left) this.left.dfsInOrder(vals);
    vals.push(this.val);
    if (this.right) this.right.dfsInOrder(vals);

    return vals;
  }

  /** dfsPostOrder(): Traverse from the invoking node using post-order DFS.
  * Returns an array of visited nodes. */

  dfsPostOrder(vals = []) {
    if (this.left) this.left.dfsPostOrder(vals);
    if (this.right) this.right.dfsPostOrder(vals);
    vals.push(this.val);

    return vals;
  }

}


class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let currentNode = this.root;
    let parent = null;
    let dir = null;

    while (currentNode) {
      if (val > currentNode.val) dir = "right";
      if (val < currentNode.val) dir = "left";

      parent = currentNode;
      currentNode = currentNode[dir];
    }

    parent[dir] = new Node(val);

    return this;
  }

  /** insertRecursively(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    this.root.insertRecursively(val);

    return this;
  }

  /** find(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return;

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.val === val) return currentNode;

      currentNode = (val > currentNode.val)
        ? currentNode.right
        : currentNode.left;
    }

    return;
  }

  /** findRecursively(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) return;
    return this.root.findRecursively(val);
  }

  /** dfsPreOrder(): Traverse the BST using pre-order DFS.
   * Returns an array of visited nodes. */

  dfsPreOrder() {
    if (!this.root) return [];

    return this.root.dfsPreOrder();
  }

  /** dfsInOrder(): Traverse the BST using in-order DFS.
   * Returns an array of visited nodes. */

  dfsInOrder() {
    if (!this.root) return [];

    return this.root.dfsInOrder();
  }

  /** dfsPostOrder(): Traverse the BST using post-order DFS.
   * Returns an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) return [];

    return this.root.dfsPostOrder();
  }

  /** bfs(): Traverse the BST using BFS.
   * Returns an array of visited nodes. */

  bfs() {
    if (!this.root) return [];

    let toVisitQueue = [this.root];
    let nodes = [];

    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      nodes.push(current.val);

      if (current.left) toVisitQueue.push(current.left);
      if (current.right) toVisitQueue.push(current.right);
    }

    return nodes;
  }

  /** findSuccessorNode(node): Find and return node with next largest value.
   * Returns undefined if no successor. */

  findSuccessorNode(node) {
    if (!node || !node.right) return;

    let successor = node.right;

    while (successor.left) {
      successor = successor.left;
    }

    return successor;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent = null;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      nodeToRemove = (val > nodeToRemove.val) ? nodeToRemove.right : nodeToRemove.left;
    }

    if (nodeToRemove === null) return; // Node not found

    if (!nodeToRemove.left && !nodeToRemove.right) { // No children
      if (this.root === nodeToRemove) { this.root = null; }
      else if (parent.left === nodeToRemove) { parent.left = null; }
      else { parent.right = null; }
    }

    else if (nodeToRemove.left && nodeToRemove.right) { // Two children
      const successor = this.findSuccessorNode(nodeToRemove);
      this.remove(successor.val);
      nodeToRemove.val = successor.val;
    }

    else { // One child
      const onlyChild = nodeToRemove.left || nodeToRemove.right;

      if (this.root === nodeToRemove) { this.root = onlyChild; }
      else if (parent.left === nodeToRemove) { parent.left = onlyChild; }
      else { parent.right = nodeToRemove.left || nodeToRemove.right; }
    }

    return nodeToRemove;
  }
}

module.exports = {
  BinarySearchTree,
  Node,
};
