import BST from './bst.mjs'

let tree = new BST();
tree.insert(6)
tree.insert(2)
tree.insert(11)
tree.insert(1)
tree.insert(8)
tree.insert(15)
tree.insert(9)
tree.insert(10)

tree.remove(6)
tree.remove(11)
tree.print()
tree.remove(10)
tree.remove(2)

tree.print();
