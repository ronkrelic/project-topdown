// BELLWAKE v0.02a - sim/player.js
// The Bellringer. Pure state: no rendering, no input.
export class Player {
  constructor(x, y) {
    this.x = x;        // pixels, center of the collider (feet area)
    this.y = y;
    this.speed = 80;   // pixels per second
    this.halfW = 5;    // collider half-extents (10x8 feet box)
    this.halfH = 4;
    this.intentX = 0;  // -1..1, set by input each frame
    this.intentY = 0;
    this.use = false;  // "use" pressed: doors now, all interaction later
    this.moving = false;
    this.facing = 'down';
  }

  setIntent(dx, dy) {
    this.intentX = dx;
    this.intentY = dy;
  }

  setUse(down) {
    this.use = down;
  }
}
