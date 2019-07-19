import Node from './node'

export default class BST {
  constructor(){
    this.root = null;
  }

  //Inserting into a binary tree
  insert(val) {
    //If the root is null, initialize the tree with the value as its root.
    if(!this.root) {
      this.root = new Node(val)
      return;
    }

    //Otherwise, search for the correct location.
    let current = this.root
    let insertedNode = new Node(val)
    //NOTE: this will only fail to break if the tree somehow contains a cycle.
    while(true){
      //If value is smaller, check left.
      if(current.val >= val){
        //If no node to the left, insert the value as a new node there. Otherwise, move to the left.
        if(!current.left){
          current.left = insertedNode
          insertedNode.parent = current
          break
        } else {
          current = current.left
        }
      } else {
        //Same checks for the right. We don't need to value check here, as this is 100% of remaining cases.
        if(!current.right){
          current.right = insertedNode
          insertedNode.parent = current
          break;
        } else {
          current = current.right;
        }
      }
    }

  }

  //Removing from a binary tree
  remove(val){
    //If the tree is empty, return -1 to indicate failure.
    if(!this.root){
      return false;
    }

    let node = this.getNode(val)
    if(!node){
      return false;
    } else {
      return this.delete(node)
    }
  }

  //Algorithm for deleting a tree node.
  //There are three cases we can encounter here:
  //1. node is a leaf with no children.
  //2. node has one child--in this case we can replace the current node with its child.
  //3. node has two children. In this case we'll need to run the removal operation again on that node.
  delete(node){
    //If it has no children, it can be safely plucked.
    if(!node.right && !node.left){
      if(!node.parent){
        this.root = null
      }else if(node.parent.left === node){
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      return true;
    }
    //If it has only a right child, we replace the node we are deleting with its child.
    else if (node.right && !node.left){
      let right = node.right;
      node.val = right.val;
      node.left = right.left;
      node.right = right.right;
      if(node.right) node.right.parent = node;
      if(node.left) node.left.parent = node;
      right = null;
      return true;
    }
    //Same for only on the left
    else if (!node.right && node.left){
      let left = node.left;
      node.val = left.val;
      node.right = left.right;
      node.left = left.left;
      if(node.right) node.right.parent = node;
      if(node.left) node.left.parent = node;
      left = null;
      return true
    }
    //If the node has two children, we get the smallest value greater than it,
    //replace its value with that, then perform a deletion on that node.
    else if(node.right && node.left) {
      let right = this.leftmost(node.right);
      node.val = right.val;
      this.delete(right)
      return true;
    }
  }

  //Returns the rightmost (largest) node given a starting node.
  //Passing a node can also be thought of as passing a tree (or subtree)
  rightmost(node){
    while(node.right !== null){
      node = node.right;
    }
    return node;
  }

  //Returns the leftmost (smallest) node given a starting node.
  leftmost(node){
    while(node.left !== null){
      node = node.left;
    }
    return node;
  }

  //Returns a node by value
  getNode(val){
    if(!this.root){
      return undefined;
    }

    //Binary search.
    let current = this.root
    while(true){
      if(current === null){
        return undefined;
      } else if (current.val === val){
        return current;
      } else if (current.val > val){
        current = current.left;
      } else if (current.val <= val){
        current = current.right;
      }
    }

  }

  //Deletes the lowest value from the tree by tracing leftmost from the root
  removeLowest(){
    if(!this.root) return false;
    this.delete(this.leftmost(this.root))
  }

  //Deletes the highest value from the tree by tracing rightmost from the root
  removeHighest(){
    if(!this.root) return false;
    this.delete(this.rightmost(this.root))
  }

  getLowest(){
    if(!this.root) return false;
    return this.leftmost(this.root).val
  }

  getHighest(){
    if(!this.root) return false;
    return this.rightmost(this.root).val
  }

  contains(val){
    return !!this.getNode(val)
  }

  print(){
    console.log(this.to_array())
  }

  to_array(){
    if(!this.root) return []
    let queue = [this.root]
    let result = []
    while(queue.length !== 0) {
      let current = queue.shift()
      result.push(current.val)
      if(current.left) queue.push(current.left)
      if(current.right) queue.push(current.right)
    }
    return result
  }

}
