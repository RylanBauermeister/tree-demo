export default class Node {
  constructor(val){
    this.val = val;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  childCount(){
    return this.left && this.right ? 2 : this.right ? 1 : this.left ? 1 : 0
  }
}
