'use strict';

const Plane = require('./Plane.js');

class Edge {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  boundingBox() {
    return {
      x1: Math.min(this.point1.x, this.point2.x),
      y1: Math.min(this.point1.y, this.point2.y),
      x2: Math.max(this.point1.x, this.point2.x),
      y2: Math.max(this.point1.y, this.point2.y),
    };
  }

  intersection(edge) {
    let bbox1 = this.boundingBox();
    let bbox2 = edge.boundingBox();
    if (bbox1.x1 < bbox2.x2 && bbox1.x2 > bbox2.x1 &&
        bbox1.y1 < bbox2.y2 && bbox1.y2 > bbox2.y1) {
      let plane1 = Plane.fromPoints(this.point1, this.point2);
      let plane2 = Plane.fromPoints(edge.point1, this.point2);
      return plane1.intersection(plane2);
    }
    return false;
  }
}

// Edge.testCollinearity = function (edge1, edge2, deltaX) {
//   let plane1 = Plane.fromPoints(edge1.point1, edge1.point2);
//   let plane2 = Plane.fromPoints(edge2.point1, edge2.point2);
//   // Test when planes are strictly horizontal or vertical,
//   if (plane1.a === 0 || plane1.b === 0 || plane2.a === 0 || plane2.b === 0) {
//     if ((plane1.b === 0 && plane2.b === 0) || (plane1.a === 0 && plane2.a === 0)) {
//       return Math.abs(plane1.normalize().c - plane2.normalize().c) < deltaX;
//     }
//     return false;
//   }
//   let xLen = Math.min(
//     edge1.point2.x - edge1.point1.x,
//     edge2.point2.x - edge2.point1.x
//   );
//   let xMin = Math.min(edge1.point1.x, edge1.point1.x + xLen);
//   let xMax = Math.max(edge1.point1.x, edge1.point1.x + xLen);
//   for (let x = xMin; x <= xMax; x += deltaX) {
//     let y1 = plane1.queryY(x);
//     let y2 = plane2.queryY(x);
//     // Return false on first occurence of non-collinearity
//     if (Math.abs(y1 - y2) >= deltaX) {
//       return false;
//     }
//   }
//   return true;
// };

module.exports = Edge;
