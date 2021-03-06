const assert = require('assert');
const chai = require('chai')
import BST from '../bst'


const expect = chai.expect;

describe('Binary Search Tree Tests', function(){
  describe('Binary Search Tree', function(){
    let bst;
    it("can initialize a new BST", function(){
      expect(function(){
        bst = new BST()
      }).to.not.throw()
    })

    it("can add new items, and places them correctly", function(){
      bst.insert(5)
      expect(bst.to_array()).to.eql([5])
      bst.insert(3)
      expect(bst.to_array()).to.eql([5,3])
      bst.insert(8)
      expect(bst.to_array()).to.eql([5,3,8])
      bst.insert(9)
      expect(bst.to_array()).to.eql([5,3,8,9])
      bst.insert(1)
      expect(bst.to_array()).to.eql([5,3,8,1,9])
      bst.insert(2)
      expect(bst.to_array()).to.eql([5,3,8,1,9,2])
      bst.insert(7)
      bst.insert(10)
      expect(bst.to_array()).to.eql([5,3,8,1,7,9,2,10])
    })

    it("can remove a leaf", function(){
      bst.remove(2)
      expect(bst.to_array()).to.eql([5,3,8,1,7,9,10])
    })

    it("can remove a node with only one child", function(){
      bst.remove(3)
      expect(bst.to_array()).to.eql([5,1,8,7,9,10])
    })

    it("can remove a node with two children", function(){
      bst.remove(5)
      expect(bst.to_array()).to.eql([7,1,8,9,10])
    })

    it("can remove the smallest node", function(){
      bst.removeLowest()
      expect(bst.to_array()).to.eql([7,8,9,10])
      bst.removeLowest()
      expect(bst.to_array()).to.eql([8,9,10])
    })

    it("can remove the largest node", function(){
      bst.removeHighest()
      expect(bst.to_array()).to.eql([8,9])
      bst.removeHighest()
      expect(bst.to_array()).to.eql([8])
    })

    it("can remove down to nothing", function(){
      bst.removeHighest()
      expect(bst.to_array()).to.eql([])
    })

    it("does not break if given non-existant nodes or if asked to remove when tree is empty", function(){
      expect(function(){
        bst.remove(10)
        bst.removeLowest()
        bst.removeHighest()
      }).to.not.throw()
    })

    it("can handle a complex removal", function(){
      bst.insert(5)
      bst.insert(3)
      bst.insert(10)
      bst.insert(11)
      bst.insert(6)
      bst.insert(8)
      bst.insert(7)
      bst.insert(9)
      expect(bst.to_array()).to.eql([5,3,10,6,11,8,7,9])

      bst.remove(5)
      expect(bst.to_array()).to.eql([6,3,10,8,11,7,9])
    })

    it("can get the lowest value in the tree", function(){
      assert.equal(bst.getLowest(), 3)
    })

    it("can get the highest value in the tree", function(){
      assert.equal(bst.getHighest(), 11)
    })

    it("returns false if we search for a number not in the tree", function(){
      assert.equal(bst.contains(22), false)
    })

  })
})
