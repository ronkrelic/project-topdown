// BELLWAKE v0.01a - sim/room.js
// Engine-agnostic room model. No Phaser here, ever.
export const TILE = 16;

// Tile legend:
//   '#' stone wall (blocking)      'T' wall with a torch (blocking, lit)
//   'P' pillar / sarcophagus (blocking)
//   '.' undercroft floor           'W' shallow water seepage (walkable)
//   'D' door alcove (walkable)     'S' player spawn (walkable)

export class Room {
  constructor(rows) {
    this.rows = rows;
    this.height = rows.length;
    this.width = rows[0].length;
  }

  tileAt(tx, ty) {
    if (ty < 0 || ty >= this.height || tx < 0 || tx >= this.width) return '#';
    return this.rows[ty][tx];
  }

  isWall(tx, ty) {
    const t = this.tileAt(tx, ty);
    return t === '#' || t === 'T' || t === 'P';
  }

  isWater(tx, ty) {
    return this.tileAt(tx, ty) === 'W';
  }

  // All torch tiles, for the renderer.
  torches() {
    const found = [];
    for (let ty = 0; ty < this.height; ty++)
      for (let tx = 0; tx < this.width; tx++)
        if (this.rows[ty][tx] === 'T') found.push({ tx, ty });
    return found;
  }

  // All water tiles, for the renderer.
  water() {
    const found = [];
    for (let ty = 0; ty < this.height; ty++)
      for (let tx = 0; tx < this.width; tx++)
        if (this.rows[ty][tx] === 'W') found.push({ tx, ty });
    return found;
  }

  // Pixel-space center of the spawn tile.
  spawnPoint() {
    for (let ty = 0; ty < this.height; ty++)
      for (let tx = 0; tx < this.width; tx++)
        if (this.rows[ty][tx] === 'S')
          return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 };
    return { x: TILE * 2, y: TILE * 2 }; // fallback corner
  }
}
