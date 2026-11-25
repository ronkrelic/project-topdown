// BELLWAKE v0.02a - sim/collision.js
// Axis-separated AABB movement against the room's solid grid.
import { TILE } from './room.js';

function collides(room, x, y, halfW, halfH, isSolid) {
  const x0 = Math.floor((x - halfW) / TILE);
  const x1 = Math.floor((x + halfW) / TILE);
  const y0 = Math.floor((y - halfH) / TILE);
  const y1 = Math.floor((y + halfH) / TILE);
  for (let ty = y0; ty <= y1; ty++)
    for (let tx = x0; tx <= x1; tx++)
      if (isSolid(tx, ty)) return true;
  return false;
}

// Moves `body` (anything with x, y, halfW, halfH) by (dx, dy),
// sliding along walls: each axis resolves independently.
// `isSolid(tx, ty)` decides what blocks. Defaults to the room's walls;
// callers layer dynamic solids (closed doors) on top.
export function moveWithCollision(room, body, dx, dy, isSolid) {
  const solid = isSolid || ((tx, ty) => room.isWall(tx, ty));
  if (dx !== 0 && !collides(room, body.x + dx, body.y, body.halfW, body.halfH, solid)) {
    body.x += dx;
  }
  if (dy !== 0 && !collides(room, body.x, body.y + dy, body.halfW, body.halfH, solid)) {
    body.y += dy;
  }
}
