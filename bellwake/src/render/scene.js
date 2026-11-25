// BELLWAKE v0.02a - render/scene.js
// The Phaser eye: reads input, steps the sim, draws its state.
// No game rules live here (bible SS11).
import { TILE } from '../sim/room.js';
import { Lighting } from './lighting.js';
import { loadPlayerSheets, makePlayerAnims, measureAnimPads } from './anims.js';
import { snappedZoom } from './pixels.js';

const STEP_MS = 1000 / 60; // fixed 60 Hz simulation
const FOOT_Y = 4;           // ground point this far below player.y
                            // (the collider's bottom edge)

export class BellwakeScene extends Phaser.Scene {
  constructor({ room, sim }) {
    super('bellwake');
    this.room = room;
    this.sim = sim;
  }

  preload() {
    loadPlayerSheets(this);
  }

  create() {
    this.drawRoom();
    this.drawDoors();
    this.doorOpenCount = this.sim.doors.filter(d => d.open).length;

    makePlayerAnims(this);
    this.animPads = measureAnimPads(this);

    this.playerSprite = this.add
      .sprite(this.sim.player.x, 0, 'p-idle-down', '0')
      .setOrigin(0.5, 1)
      .setDepth(3);
    this.playerSprite.play('idle-down');

    this.keys = this.input.keyboard.addKeys('W,A,S,D,UP,LEFT,DOWN,RIGHT,E');
    this.lighting = new Lighting(this, this.room);
    this.acc = 0;
    this.stairHintShown = false;

    this.installZoomSnap();
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
    this.sim.player.setUse(k.E.isDown);

    // 2. Fixed-timestep simulation: render rate never changes game speed.
    this.acc += Math.min(delta, 100);
    let steps = 0;
    while (this.acc >= STEP_MS && steps < 5) {
      this.sim.step(STEP_MS / 1000);
      this.acc -= STEP_MS;
      steps++;
    }

    // 3. Draw the sim's truth.
    this.setPlayerAnim();
    const anim = this.playerSprite.anims.currentAnim?.key;
    const pad = this.animPads[anim] || 0;
    this.playerSprite.setPosition(
      Math.round(this.sim.player.x),
      Math.round(this.sim.player.y + FOOT_Y + pad)
    );

    const open = this.sim.doors.filter(d => d.open).length;
    if (open !== this.doorOpenCount) {
      this.doorOpenCount = open;
      this.redrawDoors();
    }

    this.checkStairHint();
    this.lighting.update(time);
  }

  // ---- the Bellringer: animation picked from sim state, nothing more
  setPlayerAnim() {
    const p = this.sim.player;
    const dir = p.facing === 'left' || p.facing === 'right' ? 'side' : p.facing;
    const name = (p.moving ? 'walk-' : 'idle-') + dir;
    if (this.playerSprite.anims.currentAnim?.key !== name) {
      this.playerSprite.play(name);
    }
    // Side sheets assumed to face right; flip for left. If the walk
    // cycle moonwalks, swap this one flag.
    this.playerSprite.setFlipX(p.facing === 'left');
  }

  // ---- standing in the open doorway: a one-time hint
  checkStairHint() {
    if (this.stairHintShown) return;
    const d = this.sim.onDoorway();
    if (!d) return;
    this.stairHintShown = true;

    const p = this.sim.player;
    const text = this.add.text(
      Math.round(p.x),
      d.tiles[0].ty * TILE - 4,
      'the stair waits. the ebb has not turned. (v0.03a)',
      { fontFamily: 'monospace', fontSize: '8px', color: '#c9d4e3' }
    )
      .setOrigin(0.5, 1)
      .setDepth(6);
    this.tweens.add({
      targets: text,
      alpha: 0,
      delay: 2600,
      duration: 900,
      onComplete: () => text.destroy()
    });
  }

  // ---- whole-integer zoom: crisp pixels at any window size
  installZoomSnap() {
    const w = this.room.width * TILE;
    const h = this.room.height * TILE;
    const refresh = () => {
      const z = snappedZoom(w, h);
      if (this.scale.zoom !== z) this.scale.setZoom(z);
    };
    window.addEventListener('resize', refresh);
    this.events.once('shutdown', () =>
      window.removeEventListener('resize', refresh));
    refresh();
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

  // ---- doors, drawn straight from sim state
  drawDoors() {
    this.doorG = this.add.graphics();
    this.redrawDoors();
  }

  redrawDoors() {
    const g = this.doorG;
    g.clear();
    for (const d of this.sim.doors) {
      for (const t of d.tiles) {
        const x = t.tx * TILE;
        const y = t.ty * TILE;
        if (d.open) {
          // open: black passage, faint steps descending
          g.fillStyle(0x05070c, 1);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0x141a24, 1);
          g.fillRect(x + 2, y + 3, TILE - 4, 3);
          g.fillStyle(0x0d1119, 1);
          g.fillRect(x + 4, y + 8, TILE - 8, 3);
        } else {
          // closed: heavy planked door
          g.fillStyle(0x4a3826, 1);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0x3a2b1c, 1);
          g.fillRect(x, y + 2, TILE, 1);
          g.fillRect(x, y + 7, TILE, 1);
          g.fillRect(x, y + 12, TILE, 1);
          g.fillStyle(0x55606e, 1);
          g.fillRect(x, y + 4, TILE, 2);
          g.fillRect(x, y + 10, TILE, 2);
        }
      }
    }
  }
}
