'use strict';

class Node2 {
  constructor(plane, parent) {
    this.plane = plane;
    this.parent = parent;
    this.front = null;
    this.back = null;
  }
}

module.exports = Node2;