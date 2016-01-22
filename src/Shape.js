'use strict';

const Edge = require('./Edge.js');

class Shape {
  constructor(vertices) {
    this.vertices = vertices;
  }

  getVertex(i) {
    return this.vertices[i % this.vertices.length];
  }

  dropVertex(i) {
    this.vertices.splice(i % this.vertices.length, 1);
    return this;
  }

  clone() {
    return new Shape(this.vertices.slice(0));
  }

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

  approximate(maxError) {
    if (maxError === void(0)) {
      maxError = 1;
    }
    let originalArea = this.clone().area();
    while (true) {
      if (this.vertices.length <= 3) {
        break;
      }
      let minAreaDiff, minAreaDiffI;
      for (let i = 0; i < this.vertices.length; i += 1) {
        let area = this.clone().dropVertex(i).area();
        let areaDiff = Math.abs(originalArea - area);
        if (!minAreaDiff || areaDiff < minAreaDiff) {
          minAreaDiff = areaDiff;
          minAreaDiffI = i;
        }
      }
      if (minAreaDiff / originalArea > maxError) {
        break;
      }
      this.dropVertex(minAreaDiffI);
    }
    return this;
  }
}

module.exports = Shape;
