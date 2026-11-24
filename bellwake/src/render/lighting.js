// BELLWAKE v0.01a - render/lighting.js
// All mood, zero assets: torch flicker + tide shimmer, drawn in code.
import { TILE } from '../sim/room.js';

export class Lighting {
  constructor(scene, room) {
    this.room = room;
    this.torches = room.torches();
    this.water = room.water();
    this.w = room.width * TILE;
    this.h = room.height * TILE;
    this.dark = scene.add.graphics().setDepth(4);
    this.glow = scene.add.graphics().setDepth(5).setBlendMode(Phaser.BlendModes.ADD);
  }

  update(t) {
    // Darkness: the Undercroft is a candlelit place.
    this.dark.clear();
    this.dark.fillStyle(0x05070c, 0.42);
    this.dark.fillRect(0, 0, this.w, this.h);

    this.glow.clear();

    // Torch flicker: layered sin waves keep it organic but stable.
    for (const { tx, ty } of this.torches) {
      const cx = tx * TILE + TILE / 2;
      const cy = ty * TILE + TILE - 2;
      const flicker =
        0.75 +
        0.2 * Math.sin(t * 0.011 + tx * 1.7) +
        0.08 * Math.sin(t * 0.037 + ty * 2.3);
      const r = 30 + 14 * flicker;
      this.glow.fillStyle(0xff9a3c, 0.10);
      this.glow.fillCircle(cx, cy, r);
      this.glow.fillStyle(0xffb545, 0.12);
      this.glow.fillCircle(cx, cy, r * 0.62);
      this.glow.fillStyle(0xffd98a, 0.16);
      this.glow.fillCircle(cx, cy, r * 0.34);
    }

    // Water shimmer: each seepage tile breathes on its own phase.
    for (const { tx, ty } of this.water) {
      const a = 0.05 + 0.07 * (0.5 + 0.5 * Math.sin(t * 0.0028 + tx * 0.9 + ty * 0.5));
      this.glow.fillStyle(0x4fd6ff, a);
      this.glow.fillRect(tx * TILE, ty * TILE, TILE, TILE);
    }
  }
}
