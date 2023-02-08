"use strict";

const { BinarySearchTree, Node } = require("./binary-search-tree");

//declare several test trees
let emptyBST;
let smallBST;
let largeBST;

//before each -- make test trees
beforeEach(function () {
  //build empty tree

  /**
   *            root
   *              |
   *              v
   *             null
   */
  emptyBST = new BinarySearchTree();

  //build small tree
  /**
   *            root
   *              |
   *              v
   *              10
   *                \
   *                  20
   */
  const nSmall10 = new Node(10);
  const nSmall20 = new Node(20);

  nSmall10.right = nSmall20;
  smallBST = new BinarySearchTree(nSmall10);

  //build large tree
  /**
   *              root
   *               |
   *               v
   *               50
   *           /       \
   *        25           75
   *      /    \            \
   *   10       40           100
   *     \
   *      15
   */
  const n10 = new Node(10);
  const n15 = new Node(15);
  const n25 = new Node(25);
  const n40 = new Node(40);
  const n50 = new Node(50);
  const n75 = new Node(75);
  const n100 = new Node(100);

  n50.left = n25;
  n50.right = n75;

  n25.left = n10;
  n25.right = n40;

  n75.right = n100;

  n10.right = n15;

  largeBST = new BinarySearchTree(n50);
});

describe("insert", function () {
  //insert to empty tree
  it("inserts a node at the root if empty tree", function () {
    emptyBST.insert(15);
    expect(emptyBST.root.val).toEqual(15);
    expect(emptyBST.root.left).toBe(null);
    expect(emptyBST.root.right).toBe(null);
  });

  //insert to full tree, largest (most right)
  it("inserts node larger than current largest at far right (small)", function () {
    smallBST.insert(21);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.right.val).toEqual(21);
    expect(smallBST.root.right.left).toBe(null);
  });

  it("inserts node larger than current largest at far right (large)", function () {
    largeBST.insert(101);
    expect(largeBST.root.right.right.val).toEqual(100);
    expect(largeBST.root.right.right.right.val).toEqual(101);
    expect(largeBST.root.right.right.left).toBe(null);
  });

  //insert to full tree, smallest (most left)
  it("inserts node smaller than current smallest at far left (small)", function () {
    smallBST.insert(9);
    expect(smallBST.root.val).toEqual(10);
    expect(smallBST.root.left.val).toEqual(9);
    expect(smallBST.root.left.left).toBe(null);
    expect(smallBST.root.left.right).toBe(null);
  });

  it("inserts node smaller than current smallest at far left (large)", function () {
    largeBST.insert(9);
    expect(largeBST.root.left.left.val).toEqual(10);
    expect(largeBST.root.left.left.left.val).toEqual(9);
    expect(largeBST.root.left.left.right.val).toEqual(15);
    expect(largeBST.root.left.left.left.left).toBe(null);
  });

  //insert penultimate largest
  it("inserts penultimate largest node as left of far right node (small)", function () {
    smallBST.insert(19);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.left.val).toEqual(19);
    expect(smallBST.root.right.left.left).toBe(null);
    expect(smallBST.root.right.left.right).toBe(null);
    expect(smallBST.root.right.right).toBe(null);
  });

  it("inserts penultimate largest node as left of far right node (largest)", function () {
    largeBST.insert(99);
    expect(largeBST.root.right.right.val).toEqual(100);
    expect(largeBST.root.right.right.left.val).toEqual(99);
    expect(largeBST.root.right.right.left.left).toBe(null);
    expect(largeBST.root.right.right.left.right).toBe(null);
    expect(largeBST.root.right.right.right).toBe(null);
  });

  //insert penultimate smallest
  it("inserts penultimate smallest to right place (small)", function () {
    smallBST.insert(11);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.left.val).toEqual(11);
    expect(smallBST.root.right.left.left).toBe(null);
    expect(smallBST.root.right.left.right).toBe(null);
    expect(smallBST.root.right.right).toBe(null);
  });

  it("inserts penultimate smallest to right place (large)", function () {
    largeBST.insert(11);
    expect(largeBST.root.left.left.val).toEqual(10);
    expect(largeBST.root.left.left.right.val).toEqual(15);
    expect(largeBST.root.left.left.right.left.val).toEqual(11);
    expect(largeBST.root.left.left.left).toBe(null);
    expect(largeBST.root.left.left.right.right).toBe(null);
  });

  //insert one bigger than root -- don't need small tree, same as above^^
  it("inserts node one bigger than root (large)", function () {
    largeBST.insert(51);
    expect(largeBST.root.val).toEqual(50);
    expect(largeBST.root.right.val).toEqual(75);
    expect(largeBST.root.right.left.val).toEqual(51);
    expect(largeBST.root.right.left.left).toBe(null);
    expect(largeBST.root.right.left.right).toBe(null);
  });

  //insert one smaller than root
  it("inserts node one smaller than root (small)", function () {
    smallBST.insert(9);
    expect(smallBST.root.val).toEqual(10);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.left.val).toEqual(9);
    expect(smallBST.root.left.left).toBe(null);
    expect(smallBST.root.left.right).toBe(null);
  });

  it("inserts node one smaller than root (large)", function () {
    largeBST.insert(49);
    expect(largeBST.root.val).toEqual(50);
    expect(largeBST.root.left.val).toEqual(25);
    expect(largeBST.root.left.right.val).toEqual(40);
    expect(largeBST.root.left.right.right.val).toEqual(49);
    expect(largeBST.root.left.right.right.left).toBe(null);
    expect(largeBST.root.left.right.right.right).toBe(null);
  });
});

describe("insertRecursively", function () {
  //insert to empty tree
  it("inserts a node at the root if empty tree", function () {
    emptyBST.insertRecursively(15);
    expect(emptyBST.root.val).toEqual(15);
    expect(emptyBST.root.left).toBe(null);
    expect(emptyBST.root.right).toBe(null);
  });

  //insertRecursively to full tree, largest (most right)
  it("inserts node larger than current largest at far right (small)", function () {
    smallBST.insertRecursively(21);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.right.val).toEqual(21);
    expect(smallBST.root.right.left).toBe(null);
  });

  it("inserts node larger than current largest at far right (large)", function () {
    largeBST.insertRecursively(101);
    expect(largeBST.root.right.right.val).toEqual(100);
    expect(largeBST.root.right.right.right.val).toEqual(101);
    expect(largeBST.root.right.right.left).toBe(null);
  });

  //insertRecursively to full tree, smallest (most left)
  it("inserts node smaller than current smallest at far left (small)", function () {
    smallBST.insertRecursively(9);
    expect(smallBST.root.val).toEqual(10);
    expect(smallBST.root.left.val).toEqual(9);
    expect(smallBST.root.left.left).toBe(null);
    expect(smallBST.root.left.right).toBe(null);
  });

  it("inserts node smaller than current smallest at far left (large)", function () {
    largeBST.insertRecursively(9);
    expect(largeBST.root.left.left.val).toEqual(10);
    expect(largeBST.root.left.left.left.val).toEqual(9);
    expect(largeBST.root.left.left.right.val).toEqual(15);
    expect(largeBST.root.left.left.left.left).toBe(null);
  });

  //insertRecursively penultimate largest
  it("inserts penultimate largest node as left of far right node (small)", function () {
    smallBST.insertRecursively(19);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.left.val).toEqual(19);
    expect(smallBST.root.right.left.left).toBe(null);
    expect(smallBST.root.right.left.right).toBe(null);
    expect(smallBST.root.right.right).toBe(null);
  });

  it("inserts penultimate largest node as left of far right node (largest)", function () {
    largeBST.insertRecursively(99);
    expect(largeBST.root.right.right.val).toEqual(100);
    expect(largeBST.root.right.right.left.val).toEqual(99);
    expect(largeBST.root.right.right.left.left).toBe(null);
    expect(largeBST.root.right.right.left.right).toBe(null);
    expect(largeBST.root.right.right.right).toBe(null);
  });

  //insertRecursively penultimate smallest
  it("inserts penultimate smallest to right place (small)", function () {
    smallBST.insertRecursively(11);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.right.left.val).toEqual(11);
    expect(smallBST.root.right.left.left).toBe(null);
    expect(smallBST.root.right.left.right).toBe(null);
    expect(smallBST.root.right.right).toBe(null);
  });

  it("inserts penultimate smallest to right place (large)", function () {
    largeBST.insertRecursively(11);
    expect(largeBST.root.left.left.val).toEqual(10);
    expect(largeBST.root.left.left.right.val).toEqual(15);
    expect(largeBST.root.left.left.right.left.val).toEqual(11);
    expect(largeBST.root.left.left.left).toBe(null);
    expect(largeBST.root.left.left.right.right).toBe(null);
  });

  //insertRecursively one bigger than root -- don't need small tree, same as above^^
  it("inserts node one bigger than root (large)", function () {
    largeBST.insertRecursively(51);
    expect(largeBST.root.val).toEqual(50);
    expect(largeBST.root.right.val).toEqual(75);
    expect(largeBST.root.right.left.val).toEqual(51);
    expect(largeBST.root.right.left.left).toBe(null);
    expect(largeBST.root.right.left.right).toBe(null);
  });

  //insertRecursively one smaller than root
  it("inserts node one smaller than root (small)", function () {
    smallBST.insertRecursively(9);
    expect(smallBST.root.val).toEqual(10);
    expect(smallBST.root.right.val).toEqual(20);
    expect(smallBST.root.left.val).toEqual(9);
    expect(smallBST.root.left.left).toBe(null);
    expect(smallBST.root.left.right).toBe(null);
  });

  it("inserts node one smaller than root (large)", function () {
    largeBST.insertRecursively(49);
    expect(largeBST.root.val).toEqual(50);
    expect(largeBST.root.left.val).toEqual(25);
    expect(largeBST.root.left.right.val).toEqual(40);
    expect(largeBST.root.left.right.right.val).toEqual(49);
    expect(largeBST.root.left.right.right.left).toBe(null);
    expect(largeBST.root.left.right.right.right).toBe(null);
  });
});

describe("find", function () {
  it("finds a leaf node correctly", function () {
    let foundNode = smallBST.find(20);
    expect(foundNode.val).toEqual(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
  });

  it("finds root node correctly", function () {
    let foundNode = smallBST.find(10);
    expect(foundNode.val).toEqual(10);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right.val).toEqual(20);
  });

  it("finds node correctly on larger tree", function () {
    let foundNode = largeBST.find(10);
    expect(foundNode.val).toEqual(10);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right.val).toEqual(15);
  });

  it("returns undefined if a node is not found", function () {
    let foundNode = smallBST.find(120);
    expect(foundNode).toBe(undefined);
  });
});

describe("findRecursively", function () {
  it("finds a leaf node correctly", function () {
    let foundNode = smallBST.findRecursively(20);
    expect(foundNode.val).toEqual(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
  });

  it("finds root node correctly", function () {
    let foundNode = smallBST.findRecursively(10);
    expect(foundNode.val).toEqual(10);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right.val).toEqual(20);
  });

  it("finds node correctly on larger tree", function () {
    let foundNode = largeBST.findRecursively(10);
    expect(foundNode.val).toEqual(10);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right.val).toEqual(15);
  });

  it("returns undefined if a node is not found", function () {
    let foundNode = smallBST.findRecursively(120);
    expect(foundNode).toBe(undefined);
  });
});

describe("dfsPreOrder", function () {
  it("returns an array of values found with DFS Pre Order(small)", function () {
    expect(smallBST.dfsPreOrder()).toEqual([10, 20]);
  });
  it("returns an array of values found with DFS Pre Order(large)", function () {
    expect(largeBST.dfsPreOrder()).toEqual([50, 25, 10, 15, 40, 75, 100]);
  });
  it("returns an array of values found with DFS Pre Order(empty)", function () {
    expect(emptyBST.dfsPreOrder()).toEqual([]);
  });
});

describe("dfsInOrder", function () {
  it("returns an array of values found with DFS In Order(small)", function () {
    expect(smallBST.dfsInOrder()).toEqual([10, 20]);
  });

  it("returns an array of values found with DFS In Order(large)", function () {
    expect(largeBST.dfsInOrder()).toEqual([10, 15, 25, 40, 50, 75, 100]);
  });

  it("returns an array of values found with DFS In Order(empty)", function () {
    console.log("About to run dfs in order on empty table");
    expect(emptyBST.dfsInOrder()).toEqual([]);
  });
});

describe("dfsInOrderWithHelper", function () {
  it("returns an array of values found with DFS In Order(small)", function () {
    expect(smallBST.dfsInOrderWithHelper()).toEqual([10, 20]);
  });

  it("returns an array of values found with DFS In Order(large)", function () {
    expect(largeBST.dfsInOrderWithHelper()).toEqual([
      10, 15, 25, 40, 50, 75, 100,
    ]);
  });

  it("returns an array of values found with DFS In Order(empty)", function () {
    console.log("About to run dfs in order on empty table");
    expect(emptyBST.dfsInOrderWithHelper()).toEqual([]);
  });
});

describe("dfsInOrderIterative", function () {
  it("returns an array of values found with DFS In Order(small)", function () {
    expect(smallBST.dfsInOrderWithHelper()).toEqual([10, 20]);
  });

  it("returns an array of values found with DFS In Order(large)", function () {
    expect(largeBST.dfsInOrderWithHelper()).toEqual([
      10, 15, 25, 40, 50, 75, 100,
    ]);
  });

  it("returns an array of values found with DFS In Order(empty)", function () {
    console.log("About to run dfs in order on empty table");
    expect(emptyBST.dfsInOrderWithHelper()).toEqual([]);
  });
});

describe("dfsPostOrder", function () {
  it("returns an array of values found with DFS Post Order(small)", function () {
    expect(smallBST.dfsPostOrder()).toEqual([20, 10]);
  });
  it("returns an array of values found with DFS Post Order(large)", function () {
    expect(largeBST.dfsPostOrder()).toEqual([15, 10, 40, 25, 100, 75, 50]);
  });
  it("returns an array of values found with DFS Post Order(empty)", function () {
    expect(emptyBST.dfsPostOrder()).toEqual([]);
  });
});

describe("dfsPostOrderWithHelper", function () {
  it("returns an array of values found with DFS Post Order(small)", function () {
    expect(smallBST.dfsPostOrderWithHelper()).toEqual([20, 10]);
  });
  it("returns an array of values found with DFS Post Order(large)", function () {
    expect(largeBST.dfsPostOrderWithHelper()).toEqual([
      15, 10, 40, 25, 100, 75, 50,
    ]);
  });
  it("returns an array of values found with DFS Post Order(empty)", function () {
    expect(emptyBST.dfsPostOrderWithHelper()).toEqual([]);
  });
});

describe("bfs", function () {
  it("returns an array of values found with BFS(small)", function () {
    expect(smallBST.bfs()).toEqual([10, 20]);
  });
  it("returns an array of values found with BFS (large)", function () {
    expect(largeBST.bfs()).toEqual([50, 25, 75, 10, 40, 100, 15]);
  });
  it("returns an array of values found with BFS(empty)", function () {
    expect(emptyBST.bfs()).toEqual([]);
  });
});

describe("findSuccessorNode", function () {
  it("finds successor in small tree", function () {
    let node = smallBST.find(10);

    expect(smallBST.findSuccessorNode(node).val).toEqual(20);
  });

  it("finds successor in large tree", function () {
    largeBST.insert(60);
    largeBST.insert(55);
    let node = largeBST.find(50);

    expect(largeBST.findSuccessorNode(node).val).toEqual(55);
  });

  it("returns undefined if no successor", function () {
    let node = smallBST.find(20);

    expect(smallBST.findSuccessorNode(node)).toEqual(undefined);
  });
});

describe("remove", function () {
  it("removes a root node with no children", function () {
    emptyBST.insert(10);
    emptyBST.remove(10);
    expect(emptyBST.root).toBe(null);
  });

  it("removes a node with no children", function () {
    smallBST.remove(20);
    expect(smallBST.root.left).toBe(null);
    expect(smallBST.root.right).toBe(null);
  });

  it("removes a (root) node with one child (small)", function () {
    smallBST.remove(10);
    expect(smallBST.root.val).toBe(20);
  });

  it("removes a node with one child (large)", function () {
    largeBST.remove(75);
    expect(largeBST.root.right.val).toBe(100);
    expect(largeBST.root.right.left).toBe(null);
    expect(largeBST.root.right.right).toBe(null);

    largeBST.remove(10);
    expect(largeBST.root.left.left.val).toBe(15);
    expect(largeBST.root.left.left.left).toBe(null);
    expect(largeBST.root.left.left.right).toBe(null);
  });

  it("removes a (root) node with two children (small)", function () {
    smallBST.insert(5);
    /**
     *
     *            root
     *              |
     *              v
     *              10
     *            /    \
     *           5      20
     */
    smallBST.remove(10);
    expect(smallBST.root.val).toBe(20);
    expect(smallBST.root.left.val).toBe(5);
    expect(smallBST.root.right).toBe(null);
  });

  it("removes a node with two children (large)", function () {
    largeBST.remove(25);

    expect(largeBST.root.left.val).toBe(40);
    expect(largeBST.root.left.left.val).toBe(10);
    expect(largeBST.root.left.right).toBe(null);
  });

  it("removes a ( root) node with two children (find inorder successor, complex)", function () {
    largeBST.insert(60);
    largeBST.insert(59);

    /**
     *              root
     *               |
     *               v
     *               50
     *           /        \
     *        25            75
     *      /    \         /    \
     *   10       40      60     100
     *     \             /
     *      15          59
     */
    largeBST.remove(50);
    expect(largeBST.root.val).toBe(59);
    expect(largeBST.root.right.val).toBe(75);
    expect(largeBST.root.right.left.val).toBe(60);
    expect(largeBST.root.right.left.left).toBe(null);
    expect(largeBST.root.right.left.right).toBe(null);
  });
});
