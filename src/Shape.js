'use strict';

const Edge = require('./Edge.js');

class Shape {
  constructor(vertices) {
    this.vertices = vertices;
    this.error = null;
    this.lastJoinedEdge = null;
  }

  getVertex(i) {
    return this.vertices[i % this.vertices.length];
  }

  // Drops vertex from the vertex list.
  // Two adjascent vertices are joined by design.
  dropVertex(i) {
    this.vertices.splice(i % this.vertices.length, 1);
    this.lastJoinedEdge = new Edge(this.getVertex(i), this.getVertex(i + 1));
    return this;
  }

  clone() {
    let shape = new Shape(this.vertices.slice(0));
    shape.error = this.error;
    shape.lastJoinedEdge = this.lastJoinedEdge;
    return shape;
  }

  // Calculates the area
  area() {
    let total = 0;
    for (let i = 0, ii = this.vertices.length; i < ii; i++) {
      let addX = this.vertices[i].x;
      let addY = this.vertices[i == this.vertices.length - 1 ? 0 : i + 1].y;
      let subX = this.vertices[i == this.vertices.length - 1 ? 0 : i + 1].x;
      let subY = this.vertices[i].y;
      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }
    return Math.abs(total);
  }

  // Creates an initial appromixation
  approximate(maxErr, oneShot) {
    // Default maxErr to 0
    maxErr = maxErr || 0;

    // Calculate area of original shape
    let originalArea = this.clone().area();

    // Chop off vertexes
    while (true) {
      // Break if we have the smallest possible polygon
      if (this.vertices.length <= 3) {
        break;
      }

      // Find an edge with smallest area diff to chop off
      let minAreaDiff, minAreaDiffI;
      for (let i = 0; i < this.vertices.length; i += 1) {
        let area = this.clone().dropVertex(i).area();
        let areaDiff = Math.abs(originalArea - area);
        if (!minAreaDiff || areaDiff < minAreaDiff) {
          minAreaDiff = areaDiff;
          minAreaDiffI = i;
        }
      }

      // Exit if error ratio exceeds maximum
      let currentErr = minAreaDiff / originalArea;
      this.error = currentErr;
      if (currentErr > maxErr) {
        break;
      }

      // Drop a vertex
      this.dropVertex(minAreaDiffI);

      // Check if we passed a flag to drop only one vertex
      if (oneShot) {
        break;
      }
    }

    // Return an object context
    return this;
  }
}

module.exports = Shape;
