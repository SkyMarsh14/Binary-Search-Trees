class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

export default class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
    this.root = this.buildTree(arr);
  }

  buildTree(array) {
    function sortArr(array) {
      return array.filter((item, index) => array.indexOf(item) === index);
    }
    let sortedArr = sortArr(array).sort((a, b) => a - b);

    function sortedArrayToBST(arr, start, end) {
      if (start > end) return null;
      let mid = parseInt((start + end) / 2);
      let node = new Node(arr[mid]);
      node.left = sortedArrayToBST(arr, start, mid - 1);
      node.right = sortedArrayToBST(arr, mid + 1, end);

      return node;
    }
    return sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value, tree = this.root) {
    if (tree.data === value) {
      throw new Error("This value already exists!");
    }
    if (tree.data > value && tree.left == null) {
      tree.left = new Node(value);
      return;
    } else if (tree.data < value && tree.right == null) {
      tree.right = new Node(value);
      return;
    }
    tree.data < value
      ? this.insert(value, tree.right)
      : this.insert(value, tree.left);
  }
  getMinValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
  deleteItem(value, tree = this.root) {
    if (tree === null) return tree;

    if (value < tree.data) {
      tree.left = this.deleteItem(value, tree.left);
    } else if (value > tree.data) {
      tree.right = this.deleteItem(value, tree.right);
    } else {
      if (tree.left === null) {
        return tree.right;
      } else if (tree.right === null) {
        return tree.left;
      }

      let minNode = this.getMinValueNode(tree.right);
      tree.data = minNode.data;
      tree.right = this.deleteItem(minNode.data, tree.right);
    }
    return tree;
  }
  find(value, tree = this.root) {
    if (value === tree.data) return tree;
    if (tree.right === null && tree.left === null) {
      throw new Error("Value Not Found!");
    }
    value > tree.data ? find(value, tree.right) : this.find(value, tree.left);
  }

  levelOrder(callback, tree = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback needs to be a function.");
    }
    if (!tree) return;
    const queue = [tree];

    while (queue.length) {
        const currentNode=queue.shift();
        callback(currentNode);
        if(currentNode.left) queue.push(currentNode.left);
        if(currentNode.right) queue.push(currentNode.right);
    }
  }
  levelOrderRec(callback,tree=this.root){
    if (typeof callback !== "function") {
        throw new Error("Callback needs to be a function.");
      }
      const processLevel=(nodes)=>{
        if(nodes.length===0) return;
      
      nodes.forEach(node=>callback(node));

      const nextLevel=[];
      nodes.forEach(node=>{
        if(node.left) nextLevel.push(node.left);
        if(node.right) nextLevel.push(node.right);
      });
      (function(){
        processLevel(nextLevel);
      })();
    }
      processLevel([tree])
  }
  inOrder(callback,tree=this.root){
    if (typeof callback !== "function") {
        throw new Error("Callback needs to be a function.");
      }

    if(tree===null) return;

    this.inOrder(tree.left);
    callback(tree);
    this.inOrder(tree.right);
  }
  preOrder(callback,tree=this.root){
    if (typeof callback !== "function") {
        throw new Error("Callback needs to be a function.");
      }

    if(tree===null) return;
    callback(tree);
    this.preOrder(tree.left);
    this.preOrder(tree.right);
  }
  postOrder(callback,tree=this.root){
    if (typeof callback !== "function") {
        throw new Error("Callback needs to be a function.");
      }

    if(tree===null) return;
    this.postOrder(tree.left);
    this.postOrder(tree.right);
    callback(tree);
  }
  height(node){
    if(!node) return -1;
    let leftHeight=height(node.left);
    let rightHeight=height(node.right);
    return 1+Math.max(leftHeight,rightHeight);
  }
  depth(node,currentNode=this.root,currentDepth=0){
    if(!currentNode) return -1;
    if(currentNode===node) return currentDepth;
    let leftDepth=this.depth(node,currentNode.left,currentDepth+1);
    if(leftDepth !==-1) return currentDepth;
    
    return this.depth(node,currentNode.right,currentDepth+1);
  }
}
