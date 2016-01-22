'use strict';

const Edge = require('./Edge.js');
const Shape = require('./Shape.js');

class MBSPTreeNode {
  constructor(plane, parent) {
    this.plane = plane;
    this.parent = parent;
    this.front = null;
    this.back = null;
    if (parent) {
      this.minErr = parent.minErr;
      this.maxErr = parent.maxErr;
    }
  }

  insert(edge, currentErr) {
    let plane = edge.toPlane();
    let minErr = (this.parent || {}).minErr || 0;
    let maxErr = (this.parent || {}).maxErr || 1;
    // TODO: Add additional planes where approximation crosses them
    // Right now tree looks like a garbage without this function
    if (this.plane.distanceTo(edge.point2) > 0) {
      if (this.front !== null) {
        return this.front.insert(edge, currentErr);
      } else {
        this.front = new MBSPTreeNode(plane, this);
        this.front.edge = edge;
        this.front.minErr = minErr;
        this.front.maxErr = maxErr - currentErr;
        return this;
      }
    } else {
      if (this.back !== null) {
        return this.back.insert(edge, currentErr);
      } else {
        this.back = new MBSPTreeNode(plane, this);
        this.back.edge = edge;
        this.back.minErr = minErr;
        this.back.maxErr = maxErr - currentErr;
        return this;
      }
    }
  }

  toVertices() {
    let vertices = [];
    if (this.front) {
      vertices = vertices.concat(this.front.toVertices());
    }
    vertices = vertices.concat(this.edge.point1);
    if (this.back) {
      vertices = vertices.concat(this.back.toVertices());
    }
    return vertices;
  }

  toShape() {
    return new Shape(this.toVertices());
  }
}

MBSPTreeNode.create = function (shape, maxErr) {
  // Create the root BSP node
  let root = new MBSPTreeNode();

  // Create initial approximation
  let approx = shape.clone().approximate(maxErr);

  // Create progressive approximation list
  let approxList = [];
  let approxTemp = shape.clone();
  while (true) {
    // Break if we have the smallest possible polygon
    if (approxTemp.vertices.length <= approx.vertices.length) {
      break;
    }
    // Create one-shot approximation
    approxTemp.approximate(maxErr, true);
    if (approxTemp.error > maxErr) {
      break;
    }
    // Push current approximation into approximation list
    approxList.unshift(approxTemp.clone());
  }

  // Create initial BSP tree
  root.minErr = 0;
  root.maxErr = 1;
  root.edge = new Edge(approx.getVertex(0), approx.getVertex(1));
  root.plane = root.edge.toPlane();
  for (let i = 1, ii = approx.vertices.length; i < ii; i++) {
    root.insert(new Edge(approx.getVertex(i), approx.getVertex(i + 1)), 0);
  }

  // Append details to the tree from approximation list
  approxList.forEach((approx) => {
    console.log(approx.lastJoinedEdge);
    let edge = approx.lastJoinedEdge;
    root.insert(approx.lastJoinedEdge, 0, approx.error);
  });

  // Return the tree
  return root;
};

module.exports = MBSPTreeNode;
