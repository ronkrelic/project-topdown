// BELLWAKE v0.02a - render/anims.js
// Player animations, defined in code. The exported JSONs carry no
// usable frameTags, so instead of createFromAseprite we read each
// atlas's frame names at runtime and build the cycles here. Frame
// counts come from the sheets themselves; only the rates are ours.
//
// Grounding fix: the idle sheets are 64x64 canvases, the walk sheets
// 48x48, and the feet do not sit the same distance from the canvas
// bottom in both. Bottom-anchoring alone made the Bellringer hop
// between idle and walk. measureAnimPads() scans each frame's pixels
// for the lowest opaque row and works out, per animation, how far
// down the sprite must sit for the contact foot to meet the ground.
// Self-calibrating: swap in any sheets and he stays grounded.

const SHEETS = 'assets/exports/Entities/Characters/New_Version';

// atlas key -> [png, json], both under SHEETS (relative to index.html)
export const PLAYER_ATLASES = {
  'p-idle-down': ['Idle/Idle_Down.png', 'Idle/Idle_Down.json'],
  'p-idle-up':   ['Idle/Idle_Up.png',   'Idle/Idle_Up.json'],
  'p-idle-side': ['Idle/Idle_Side.png', 'Idle/Idle_Side.json'],
  'p-walk-down': ['Walk/Down.png',      'Walk/Down.json'],
  'p-walk-up':   ['Walk/Up.png',        'Walk/Up.json'],
  'p-walk-side': ['Walk/Walk_Side.png', 'Walk/Walk_Side.json']
};

// anim key -> { atlas, rate }. Rates are the tuning knobs: idle should
// breathe, walk should read at 80 px/s. Playtest values, change freely.
const PLAYER_ANIMS = [
  { anim: 'idle-down',  atlas: 'p-idle-down',  rate: 6 },
  { anim: 'idle-up',    atlas: 'p-idle-up',    rate: 6 },
  { anim: 'idle-side',  atlas: 'p-idle-side',  rate: 6 },
  { anim: 'walk-down',  atlas: 'p-walk-down',  rate: 10 },
  { anim: 'walk-up',    atlas: 'p-walk-up',    rate: 10 },
  { anim: 'walk-side',  atlas: 'p-walk-side',  rate: 10 }
];

export function loadPlayerSheets(scene) {
  for (const [key, [png, json]] of Object.entries(PLAYER_ATLASES)) {
    scene.load.atlas(key, `${SHEETS}/${png}`, `${SHEETS}/${json}`);
  }
}

// Transparent rows between the lowest opaque pixel and the canvas
// bottom of one frame. Reads the sheet through a scratch canvas; the
// game's own renderer never enters into it.
function framePad(scene, atlasKey, frameName) {
  const tex = scene.textures.get(atlasKey);
  const f = tex.get(frameName);
  const src = tex.source[0].image;
  const c = document.createElement('canvas');
  c.width = f.cutWidth;
  c.height = f.cutHeight;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(src, f.cutX, f.cutY, f.cutWidth, f.cutHeight,
                0, 0, f.cutWidth, f.cutHeight);
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  for (let y = c.height - 1; y >= 0; y--) {
    for (let x = 0; x < c.width; x++) {
      if (d[(y * c.width + x) * 4 + 3] > 0) return c.height - 1 - y;
    }
  }
  return c.height; // fully transparent frame: harmless fallback
}

// Per animation: the largest bottom padding across its frames. The
// contact foot plants on the ground; a frame where both feet leave
// the floor rises naturally instead of dragging the ground up.
export function measureAnimPads(scene) {
  const pads = {};
  for (const def of PLAYER_ANIMS) {
    const tex = scene.textures.get(def.atlas);
    const names = tex.getFrameNames().filter(n => /^\d+$/.test(n));
    let pad = 0;
    for (const n of names) pad = Math.max(pad, framePad(scene, def.atlas, n));
    pads[def.anim] = pad;
  }
  return pads;
}

export function makePlayerAnims(scene) {
  for (const def of PLAYER_ANIMS) {
    const tex = scene.textures.get(def.atlas);
    let names = tex.getFrameNames().filter(n => /^\d+$/.test(n));
    if (names.length === 0) {
      // safety net: take whatever frames exist besides the base
      names = tex.getFrameNames().filter(n => n !== '__BASE');
    }
    names.sort((a, b) => Number(a) - Number(b));
    scene.anims.create({
      key: def.anim,
      frames: names.map(n => ({ key: def.atlas, frame: n })),
      frameRate: def.rate,
      repeat: -1
    });
  }
}
