// BELLWAKE v0.03a - sim/room.js
// Engine-agnostic room model. No Phaser here, ever.
//
// v0.03a: a room is defined as an object (see data/rooms/tavern.js):
//   {
//     key, title, subtitle,
//     rows,     // 30x17 char grid, same shape as always
//     legend,   // char -> entry, see below
//     spawn,    // optional { tx, ty } pixel spawn override
//     ambient,  // 0..1 darkness base, renderer hint
//     lights,   // [{ tx, ty, r, color, flicker }] renderer hints
//     walls, doors, waterSpec, props,  // renderer specs (tileart.js)
//     exit      // { to, spawn:[tx,ty], face } for 'D' doorways, or null
//   }
//
// Legend entries are plain data:
//   solid  blocks the Bellringer (doors are NOT solid here; the sim
//          layers closed doors back on, since they open)
//   floor  floor art style key ('plank', 'grass', ...), '' for none
//   water  shallow seepage or harbor water (solidity is separate)
//   shore  shoreline dressing tile
//   door   doorway tile: groups into doors, opens with E
//   torch  wall torch, lights itself
//   spawn  player spawn tile (walkable)
//
// The Undercroft's bare rows array still loads unchanged: it gets
// wrapped in the legacy legend below, same chars, same solidity,
// so undercroft-test.js ships byte-identical.

export const TILE = 16;

// Legacy legend (v0.01a/v0.02a Undercroft), preserved exactly:
//   '#' stone wall   'T' torch wall   'P' pillar        (blocking)
//   '.' floor        'W' water seepage (walkable)
//   'D' door alcove  'S' spawn        (walkable)
const LEGACY_LEGEND = {
  '#': { solid: true },
  'T': { solid: true, torch: true },
  'P': { solid: true },
  '.': { floor: 'legacy' },
  'W': { water: true },
  'D': { door: true },
  'S': { spawn: true }
};

// Pixel-space center of a tile.
export function tileCenter(tx, ty) {
  return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 };
}

export class Room {
  constructor(def) {
    if (Array.isArray(def)) {
      // Legacy bare rows array (the Undercroft).
      def = {
        key: 'undercroft',
        title: 'THE UNDERCROFT',
        subtitle: '',
        rows: def,
        legend: LEGACY_LEGEND,
        spawn: null,
        ambient: 0.5,
        lights: [],
        walls: null,
        doors: null,
        waterSpec: null,
        props: [],
        exit: null
      };
    }
    this.def = def;
    this.key = def.key || 'room';
    this.title = def.title || '';
    this.subtitle = def.subtitle || '';
    this.rows = def.rows;
    this.height = this.rows.length;
    this.width = this.rows[0].length;
    this.legend = def.legend || LEGACY_LEGEND;

    // Resolve every tile against the legend once, up front. Unknown
    // chars resolve as solid: a typo in a room fails safe, not
    // silently walkable.
    this.grid = [];
    for (let ty = 0; ty < this.height; ty++) {
      const row = [];
      for (let tx = 0; tx < this.width; tx++) {
        row.push(this.legend[this.rows[ty][tx]] || { solid: true });
      }
      this.grid.push(row);
    }
  }

  tileAt(tx, ty) {
    if (ty < 0 || ty >= this.height || tx < 0 || tx >= this.width) return '#';
    return this.rows[ty][tx];
  }

  entryAt(tx, ty) {
    if (ty < 0 || ty >= this.height || tx < 0 || tx >= this.width) {
      return { solid: true };
    }
    return this.grid[ty][tx];
  }

  // Static solidity, same contract as v0.02a: walls, torches and
  // pillars block; door alcoves and water seepage do not. The sim
  // adds closed doors on top.
  isWall(tx, ty) {
    const e = this.entryAt(tx, ty);
    return !!e.solid && !e.door;
  }

  isWater(tx, ty) {
    return !!this.entryAt(tx, ty).water;
  }

  // Floor art style key for the renderer, '' when there is none.
  floorAt(tx, ty) {
    return this.entryAt(tx, ty).floor || '';
  }

  // Cached scans, for the renderer and the sim.
  torches() {
    if (!this._torches) this._torches = this.scan(e => e.torch);
    return this._torches;
  }

  water() {
    if (!this._water) this._water = this.scan(e => e.water);
    return this._water;
  }

  doors() {
    if (!this._doors) this._doors = this.scan(e => e.door);
    return this._doors;
  }

  scan(test) {
    const found = [];
    for (let ty = 0; ty < this.height; ty++)
      for (let tx = 0; tx < this.width; tx++)
        if (test(this.grid[ty][tx])) found.push({ tx, ty });
    return found;
  }

  // Pixel-space center of the spawn tile.
  spawnPoint() {
    if (this.def.spawn) {
      return tileCenter(this.def.spawn.tx, this.def.spawn.ty);
    }
    const s = this.scan(e => e.spawn);
    if (s.length) return tileCenter(s[0].tx, s[0].ty);
    return tileCenter(2, 2); // fallback corner, as in v0.02a
  }

  // Where this room's doorways lead, or null for plain doors
  // (the Undercroft's alcoves lead nowhere, as ever).
  exitInfo() {
    return this.def.exit || null;
  }
}
