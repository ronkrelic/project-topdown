// BELLWAKE v0.03a - render/lighting.js
// The mood layer. One ambient darkness overlay sits over the whole
// room (def.ambient, 0..1: tavern 0.45, street 0.6, Undercroft 0.5),
// and additive radial glows punch warmth back through it. Lights
// come from two places:
//   - def.lights, the authored list: { tx, ty, r, color, flicker }
//   - room.torches(), auto-lit so the Undercroft's T tiles glow
//     without anyone hand-placing a light
// Water shimmer moved to tileart.js (it belongs to the water); this
// file is darkness and warmth, nothing else.
//
// Depths: overlay 800, glows 801, both above the world (props top out
// around 700) and below the area title at 900.
// The mood layer. One ambient darkness overlay sits over the whole
// room (def.ambient, 0..1: tavern 0.45, street 0.6, Undercroft 0.5),
// and additive radial glows punch warmth back through it. Lights
// come from two places:
//   - def.lights, the authored list: { tx, ty, r, color, flicker }
//   - room.torches(), auto-lit so the Undercroft's T tiles glow
//     without anyone hand-placing a light
// Water shimmer moved to tileart.js (it belongs to the water); this
// file is darkness and warmth, nothing else.
//
// Depths: overlay 800, glows 801, both above the world (props top out
// around 700) and below the area title at 900.

import { TILE } from '../sim/room.js';

const OVERLAY_DEPTH = 800;
const GLOW_DEPTH = 801;
const GLOW_KEY = 'boba-glow';

// auto-light recipe for torch tiles
const TORCH_LIGHT = { r: 40, color: 0xffa050, flicker: true };

// base alpha for every glow; flicker swings around it
const GLOW_ALPHA = 0.32;

function ensureGlowTexture(scene) {
  if (scene.textures.exists(GLOW_KEY)) return;
  const size = 256;
  const tex = scene.textures.createCanvas(GLOW_KEY, size, size);
  if (!tex) return;
  const ctx = tex.getContext();
  const grad = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  tex.refresh();
}

export class Lighting {
  constructor(scene, room) {
    this.scene = scene;
    this.room = room;
    this.objs = [];
    this.tweened = [];

    ensureGlowTexture(scene);

    const W = room.width * TILE;
    const H = room.height * TILE;
    const ambient = typeof room.def.ambient === 'number' ? room.def.ambient : 0.5;

    // the darkness everything sits under
    this.push(scene.add.rectangle(W / 2, H / 2, W, H, 0x000000)
      .setDepth(OVERLAY_DEPTH)
      .setAlpha(ambient));

    // authored lights, then torch tiles lit automatically
    const lights = (room.def.lights || []).slice();
    for (const t of room.torches()) {
      lights.push({ tx: t.tx, ty: t.ty, ...TORCH_LIGHT });
    }
    lights.forEach((l, i) => this.addLight(l, i));
  }

  push(o) {
    this.objs.push(o);
    return o;
  }

  addLight(l, i) {
    const { scene } = this;
    const x = l.tx * TILE + TILE / 2;
    const y = l.ty * TILE + TILE / 2;
    const glow = scene.add.image(x, y, GLOW_KEY)
      .setDisplaySize(l.r * 2, l.r * 2)
      .setTint(l.color || 0xffd9a0)
      .setAlpha(GLOW_ALPHA)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(GLOW_DEPTH);
    this.push(glow);
    if (!l.flicker) return;
    // each flicker gets its own tempo so the room never pulses in
    // lockstep; hearth and lanterns breathe out of phase
    // v0.03a patch 4: the { from, to } value form never showed in
    // playtest (flicker lights stayed pitch dark while steady
    // glows rendered), so set the low alpha directly and tween to
    // a plain numeric target instead
    this.tweened.push(glow);
    glow.setAlpha(GLOW_ALPHA * 0.75);
    scene.tweens.add({
      targets: glow,
      alpha: GLOW_ALPHA * 1.2,
      duration: 500 + (i % 5) * 130,
      yoyo: true,
      repeat: -1,
      delay: (i % 3) * 200,
      ease: 'Sine.easeInOut'
    });
  }

  destroy() {
    for (const o of this.tweened) this.scene.tweens.killTweensOf(o);
    for (const o of this.objs) o.destroy();
    this.objs.length = 0;
    this.tweened.length = 0;
  }
}
