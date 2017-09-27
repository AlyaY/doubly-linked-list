// class Node {
//     constructor(data = null, prev = null, next = null) {
//         this.data = data;
//         this.prev = prev;
//         this.next = next;
//     }
// }

const Node = require('./node');

class LinkedList {
    constructor() {
        this.node = new Node();
        this._head = this.node;
        this._tail = this.node;
        this.length = 0;
    }

    append(data) {
        this.length++;
        if(this.node.data == null) {
            this.node.data = data;
        } else {
            var node = new Node(data);

            this.node.next  = node;
            this._tail = node;
            node.prev = this.node;
      
            this.node = node;
        }
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var node =  this._head;
        if(index < this.length) {
            for(var i = 0; i <index; i++) {
                node = node.next;
            }
            return node.data;
        }
        return -1;
    }

    insertAt(index, data) {
        this.length++;
        var after =  this._head;
        var node = new Node(data);

        if(index < this.length) {
            if(index == 0) {
                if(this._head != null) {
                    this._head.next.prev = node;
                }
                if(this._head != null) {
                    node.next = this._head.next;
                } 
                this._head = node
            }       
            else {
                for(var i = 0; i <index-1; i++) {
                    after = after.next;
                }
                node.next = after.next;
                if(after.next === null){
                    this._tail = node;
                } else {
                    after.next.prev = node;
                }
                after.next = node;
                node.prev = after;
            }
        } else if (index == 0) {
            this.append(data);
        }
        return this;
    }

    isEmpty() {
        return (this.length == 0) ? true : false;
    }

    clear() {
        if(this.length != 0) {
            var node = this._head;

            while (node.next != null) {
                node = node.next;
                delete node.prev;
                this.length--;
            }

            this.length--;
            this.node = new Node(null);
            this._head = this._tail = this.node;
        }

        return this;
    }

    deleteAt(index) {
        var node =  this._head;
        if(index < this.length) {

            this.length--;

            for(var i = 0; i <index; i++) {
                node = node.next;
            }

            if(node.prev == null) {
                this._head = node.next;
            } else {
                node.prev.next = node.next;
            }
            
            if(node.next == null) {
                this._tail = node.prev;
            } else {
                node.next.prev = node.prev;
            }
        }
        return this;
    }

    reverse() {
        var node = this._head ;
        this._head = this._tail;
        this._tail = node;
        if(this.length > 1) {
            for(var i = 0; i < this.length; i++) {
                var n = node.next;
                node.next = node.prev;
                node.prev = n;
                node = node.prev;
            }
        }
        return this;
    }

    indexOf(data) {
        var node =  this._head, i = 0;
        while(node != null && node.data != data) {
            node = node.next;
            i++;
        }
        if (node == null) {
            return -1;
        } else {
            return i;
        }
    }
}

module.exports = LinkedList;
