// BELLWAKE v0.01a - render/scene.js
// The only file that knows Phaser exists. Reads input, draws sim state.
// No game rules live here (bible SS11).
import { TILE } from '../sim/room.js';
import { Lighting } from './lighting.js';

const STEP_MS = 1000 / 60; // fixed 60 Hz simulation

export class BellwakeScene extends Phaser.Scene {
  constructor({ room, sim }) {
    super('bellwake');
    this.room = room;
    this.sim = sim;
  }

  create() {
    this.drawRoom();
    this.makePlayerTexture();

    this.playerSprite = this.add
      .image(this.sim.player.x, this.sim.player.y, 'player')
      .setOrigin(0.5, 0.85)
      .setDepth(3);

    this.keys = this.input.keyboard.addKeys('W,A,S,D,UP,LEFT,DOWN,RIGHT');
    this.lighting = new Lighting(this, this.room);
    this.acc = 0;
  }

  update(time, delta) {
    // 1. Read input into intent.
    const k = this.keys;
    let dx = 0, dy = 0;
    if (k.A.isDown || k.LEFT.isDown) dx -= 1;
    if (k.D.isDown || k.RIGHT.isDown) dx += 1;
    if (k.W.isDown || k.UP.isDown) dy -= 1;
    if (k.S.isDown || k.DOWN.isDown) dy += 1;
    this.sim.player.setIntent(dx, dy);

    // 2. Fixed-timestep simulation: render rate never changes game speed.
    this.acc += Math.min(delta, 100);
    let steps = 0;
    while (this.acc >= STEP_MS && steps < 5) {
      this.sim.step(STEP_MS / 1000);
      this.acc -= STEP_MS;
      steps++;
    }

    // 3. Draw the sim's truth.
    this.playerSprite.setPosition(
      Math.round(this.sim.player.x),
      Math.round(this.sim.player.y)
    );
    this.lighting.update(time);
  }

  // ---- room art, drawn in code (real tilesets come with the asset pipeline)
  drawRoom() {
    const g = this.add.graphics();
    const room = this.room;
    for (let ty = 0; ty < room.height; ty++) {
      for (let tx = 0; tx < room.width; tx++) {
        const t = room.tileAt(tx, ty);
        const x = tx * TILE, y = ty * TILE;

        // floor under everything walkable
        if (t !== '#' && t !== 'T') {
          const shade = [0x343a46, 0x303641, 0x383e4b][(tx * 7 + ty * 13) % 3];
          g.fillStyle(shade, 1);
          g.fillRect(x, y, TILE, TILE);
        }

        if (t === 'W') {
          g.fillStyle(0x14304a, 1);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0x2a6f9e, 1);
          g.fillRect(x, y, TILE, 2); // surface line
        } else if (t === 'D') {
          g.fillStyle(0x2a2f3a, 1);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0x10141c, 1);
          g.fillRect(x + 2, y + 4, TILE - 4, TILE - 4); // alcove shadow
        } else if (t === '#' || t === 'T') {
          this.drawWall(g, x, y, tx, ty);
          if (t === 'T') {
            // torch bracket + flame (the glow is Lighting's job)
            g.fillStyle(0x5c4326, 1);
            g.fillRect(x + 7, y + 8, 2, 5);
            g.fillStyle(0xffb545, 1);
            g.fillRect(x + 6, y + 4, 4, 4);
            g.fillStyle(0xffd98a, 1);
            g.fillRect(x + 7, y + 5, 2, 2);
          }
        } else if (t === 'P') {
          // sarcophagus prop, on the floor already drawn
          g.fillStyle(0x49525f, 1);
          g.fillRect(x + 1, y + 3, TILE - 2, TILE - 4);
          g.fillStyle(0x333b47, 1);
          g.fillRect(x + 2, y + 5, TILE - 4, 3);
          g.fillStyle(0x232a34, 1);
          g.fillRect(x + 1, y + 3, TILE - 2, 1);
        }
      }
    }
  }

  drawWall(g, x, y, tx, ty) {
    g.fillStyle(0x222833, 1);
    g.fillRect(x, y, TILE, TILE);
    // lit edge where floor sits below the wall
    if (!this.room.isWall(tx, ty + 1)) {
      g.fillStyle(0x4a5466, 1);
      g.fillRect(x, y + TILE - 3, TILE, 3);
    }
    // subtle brick seams
    g.fillStyle(0x1b202a, 1);
    g.fillRect(x, y + 7, TILE, 1);
    g.fillRect(x + (ty % 2 ? 4 : 10), y, 1, 7);
    g.fillRect(x + (ty % 2 ? 10 : 4), y + 8, 1, 8);
  }

  makePlayerTexture() {
    // Placeholder Bellringer, drawn in code.
    // The real Body_A sprite lands in v0.02a once assets/exports/ exists.
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x2b3542, 1); // cloak
    g.fillRect(2, 4, 6, 9);
    g.fillStyle(0x3a4756, 1); // hood
    g.fillRect(3, 1, 4, 4);
    g.fillStyle(0x11161d, 1); // face shadow
    g.fillRect(3, 3, 4, 2);
    g.fillStyle(0x1d2530, 1); // hem
    g.fillRect(2, 11, 6, 2);
    g.fillStyle(0xffc65e, 1); // lantern
    g.fillRect(8, 7, 2, 2);
    g.generateTexture('player', 10, 14);
    g.destroy();
  }
}
