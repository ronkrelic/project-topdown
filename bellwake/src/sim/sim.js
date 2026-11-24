// BELLWAKE v0.01a - sim/sim.js
// The fixed-timestep world. Engine-agnostic: the future co-op server
// runs this file unchanged (bible SS11).
import { moveWithCollision } from './collision.js';

export class Sim {
  constructor(room, player) {
    this.room = room;
    this.player = player;
  }

  // Advance the world by dt seconds. Called at a fixed 60 Hz by the
  // renderer now, by the server tick later.
  step(dt) {
    const p = this.player;
    let dx = p.intentX;
    let dy = p.intentY;

    if (dx !== 0 || dy !== 0) {
      // Normalize so diagonals aren't faster.
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;
      p.moving = true;
      if (Math.abs(dx) > Math.abs(dy)) p.facing = dx > 0 ? 'right' : 'left';
      else p.facing = dy > 0 ? 'down' : 'up';
      moveWithCollision(this.room, p, dx * p.speed * dt, dy * p.speed * dt);
    } else {
      p.moving = false;
    }
  }
}
