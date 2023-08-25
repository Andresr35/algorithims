const Nodee = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (arr) => {
  let root = buildTree(cleanArray(arr));
  const getRoot = () => root;

  const insert = (data) => {
    let pointer = root;
    let inserted = false;
    while (!inserted)
      if (data > pointer.data) {
        if (pointer.right === null) {
          pointer.right = Nodee(data);
          inserted = true;
        } else {
          pointer = pointer.right;
        }
      } else {
        if (pointer.left === null) {
          pointer.left = Nodee(data);
          inserted = true;
        } else {
          pointer = pointer.left;
        }
      }
  };

  const remove = (data, pointer = root) => {
    if (data > pointer.data) {
      if (
        pointer.right.data === data &&
        pointer.right.right === null &&
        pointer.right.left === null
      ) {
        pointer.right = null;
      } else {
        remove(data, pointer.right);
      }
    } else if (data < pointer.data) {
      if (
        pointer.left.data === data &&
        pointer.left.left === null &&
        pointer.left.right === null
      ) {
        pointer.left = null;
      } else {
        remove(data, pointer.left);
      }
    } else {
      if (pointer.left !== null && pointer.right !== null) {
        let secondPointer = pointer.right;
        if (secondPointer.left === null && secondPointer.right === null) {
          pointer.data = secondPointer.data;
          pointer.right = null;
        }
        while (secondPointer.left.left !== null) {
          secondPointer = secondPointer.left;
        }
        if (secondPointer.left.right === null) {
          pointer.data = secondPointer.left.data;
          secondPointer.left = null;
        } else {
          pointer.data = secondPointer.left.data;
          secondPointer.left = secondPointer.left.right;
        }
      } else if (pointer.left !== null) {
        pointer.data = pointer.left.data;
        pointer.right = pointer.left.right;
        pointer.left = pointer.left.left;
      } else {
        pointer.data = pointer.right.data;
        pointer.left = pointer.right.left;
        pointer.right = pointer.right.right;
      }
    }
  };

  const find = (value, pointer = root) => {
    if (value === pointer.data) {
      return pointer;
    } else if (value > pointer.data) {
      return find(value, pointer.right);
    } else if (value < pointer.data) {
      return find(value, pointer.left);
    } else {
      return pointer;
    }
  };

  const levelOrder = (callbck, pointer = root, queue = [], visited = []) => {
    if (root === null) return;
    if (pointer.left !== null) {
      queue.push(pointer.left);
    }
    if (pointer.right !== null) {
      queue.push(pointer.right);
    }
    callbck(pointer);
    visited.push(pointer);
    if (queue.length === 0) {
      return visited;
    }
    return levelOrder(callbck, queue.shift(), queue, visited);
  };

  const inorder = (callbck, pointer = root, visited = []) => {
    if (pointer == null) return;
    if (pointer.left !== null) {
      inorder(callbck, pointer.left, visited);
    }
    if (!callbck) {
      visited.push(pointer.data);
    } else {
      callbck(pointer);
    }

    if (pointer.right !== null) {
      inorder(callbck, pointer.right, visited);
    }
    return visited;
  };

  const preorder = (callbck, pointer = root, visited = []) => {
    if (pointer === null) return;
    callbck(pointer);
    visited.push(pointer);
    if (pointer.left !== null) {
      preorder(callbck, pointer.left);
    }
    if (pointer.right !== null) {
      preorder(callbck, pointer.right);
    }
  };

  const postorder = (callbck, pointer = root, visited = []) => {
    if (pointer === null) return;
    if (pointer.left !== null) {
      postorder(callbck, pointer.left);
    }
    if (pointer.right !== null) {
      postorder(callbck, pointer.right);
    }
    callbck(pointer);
    visited.push(pointer);
  };

  const height = (pointer = root) => {
    let leftCount = 1,
      rightCount = 1;
    if (pointer === null) return 0;
    if (pointer.left !== null) {
      leftCount += height(pointer.left);
    }
    if (pointer.right !== null) {
      rightCount += height(pointer.right);
    }

    if (leftCount >= rightCount) return leftCount;
    return rightCount;
  };

  const depth = (node, pointer = root) => {
    let res = 1;
    if (node === pointer) {
      return 1;
    }
    if (node.data > pointer.data) {
      return (res += depth(node, pointer.right));
    } else {
      return (res += depth(node, pointer.left));
    }
  };

  const isBalanced = (pointer = root) => {
    let left = 0,
      right = 0,
      balanced = true;
    if (pointer.left !== null) {
      left = height(pointer.left);
      balanced = balanced && isBalanced(pointer.left);
    }
    if (pointer.right !== null) {
      right = height(pointer.right);
      balanced = balanced && isBalanced(pointer.right);
    }
    if (Math.abs(left - right) > 2) return false;

    return balanced;
  };

  const rebalance = (pointer = root) => {
    root = buildTree(inorder(null, pointer));
  };

  return {
    getRoot,
    insert,
    remove,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const buildTree = (arr) => {
  if (arr.length < 2) return Nodee(arr[0]);
  if (arr.length == 2) return Nodee(arr[1], Nodee(arr[0]));
  const leftTree = arr.slice(0, arr.length / 2);
  const rightTree = arr.slice(arr.length / 2 + 1, arr.length);
  return Nodee(
    arr[Math.floor(arr.length / 2)],
    buildTree(leftTree),
    buildTree(rightTree)
  );
};

const cleanArray = (arr) => {
  arr.sort((a, b) => a - b);
  return [...new Set(arr)];
};

const random = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const myTree = Tree(random);

myTree.insert(6);
prettyPrint(myTree.getRoot());

myTree.remove(8);
prettyPrint(myTree.getRoot());

// console.log("\n");
// console.log(myTree.find(6));

function callbck(root) {}
// console.log(myTree.levelOrder(callbck));
// console.log("Starting inorder: \n");
// myTree.inorder(callbck);

// console.log("Starting preorder: \n");
// myTree.preorder(callbck);

// console.log("Starting postorder: \n");
// myTree.postorder(callbck);

// console.log(myTree.height());

// const testRoot = myTree.find(6345);
// console.log("\n" + "Depth test:");
// console.log(myTree.depth(testRoot));

console.log("\n" + "balance test:");
myTree.insert(6.5);
prettyPrint(myTree.getRoot());
console.log(myTree.isBalanced());
console.log("\n");

myTree.rebalance();
console.log("balance test:");
console.log(myTree.isBalanced());
prettyPrint(myTree.getRoot());
