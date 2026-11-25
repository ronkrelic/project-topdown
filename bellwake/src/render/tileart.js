// BELLWAKE v0.03a - render/tileart.js
// The room renderer: turns a room def's rows, legend and specs into
// real art from the exported sheets. Everything the room data files
// promise (wall bands, buildings, doors, water, props) is drawn here;
// lighting.js and areatitle.js layer on top of it.
//
// HOTFIX (floor bugs, v0.03a): plank swatch 80x80 -> 80x64 (its
// bottom row held two empty sheet cells that rendered as black
// tavern floor tiles) and water variants moved from the y=80 row
// (three empty cells -> black squares in the harbor) to the clean
// y=96 row.
//
// Sheets load as PLAIN IMAGES on purpose: the JSONs beside nine of
// them are stale from the padded-export overwrite, so every frame
// below is sliced by hand in SPEC. (Player atlases are the exception,
// in anims.js; those JSONs are good.)
//
// Depth plan (lighting starts at 800, titles at 900):
//   0 floors            1 water + shoreline      2 water glints
//   3 alley slots       4 facades, eave, legacy blocks
//   5 wall bands, door openings                   6 door leaves
//   50 flat props (rugs and other floor dressing)
//   100 + bottom-y     everything that y-sorts: props, the player
//   ~700 hanging things (chandeliers ride dz)
//
// Every pixel rect in SPEC and FLOOR_STYLES is tunable. Playtest,
// squint, nudge.

import { TILE } from '../sim/room.js';

// ----------------------------------------------------------- sheets

const SHEETS = [
  ['floors',     'assets/exports/game/anokolisa/original-pack/tilesets/Floors_Tiles.png'],
  ['water',      'assets/exports/Environment/Tilesets/Water_tiles.png'],
  ['bldgwalls',  'assets/exports/Environment/Structures/Buildings/Walls.png'],
  ['roofs',      'assets/exports/Environment/Structures/Buildings/Roofs.png'],
  ['bldgprops',  'assets/exports/Environment/Structures/Buildings/Props.png'],
  ['furniture',  'assets/exports/Environment/Props/Static/Furniture.png'],
  ['vegetation', 'assets/exports/Environment/Props/Static/Vegetation.png'],
  ['intprops',   'assets/exports/Environment/Structures/Buildings/Interior/Interior_Props_01.png'],
  ['intwalls',   'assets/exports/Environment/Structures/Buildings/Interior/Walls.png']
];

// Call from scene preload().
export function loadTileSheets(scene) {
  for (const [key, path] of SHEETS) scene.load.image(key, path);
}

// ------------------------------------------------------------ SPEC
// frame name -> { s: sheet, x, y, w, h } on that sheet.

const SPEC = {
  // Interior_Props_01
  'table-long':           { s: 'intprops', x: 0,   y: 0,   w: 64, h: 32 },
  'table-round':          { s: 'intprops', x: 80,  y: 0,   w: 32, h: 48 },
  'table-small':          { s: 'intprops', x: 32,  y: 32,  w: 32, h: 32 },
  'table-square':         { s: 'intprops', x: 112, y: 64,  w: 32, h: 32 },
  'chair-front':          { s: 'intprops', x: 64,  y: 32,  w: 16, h: 32 },
  'chair-side':           { s: 'intprops', x: 64,  y: 0,   w: 16, h: 32 },
  'bench-slat':           { s: 'intprops', x: 0,   y: 96,  w: 48, h: 32 },
  'bench-blue':           { s: 'intprops', x: 0,   y: 160, w: 48, h: 32 },
  'armchair-blue':        { s: 'intprops', x: 224, y: 0,   w: 48, h: 32 },
  'armchair-wood':        { s: 'intprops', x: 224, y: 32,  w: 48, h: 32 },
  'stool-red':            { s: 'intprops', x: 96,  y: 64,  w: 16, h: 16 },
  'counter-low':          { s: 'intprops', x: 64,  y: 224, w: 48, h: 32 },
  'counter-sink':         { s: 'intprops', x: 112, y: 224, w: 96, h: 32 },
  'chandelier-simple':    { s: 'intprops', x: 208, y: 64,  w: 32, h: 32 },
  'chandelier-elaborate': { s: 'intprops', x: 240, y: 64,  w: 32, h: 32 },
  'hearth':               { s: 'intprops', x: 272, y: 48,  w: 48, h: 96 },
  'door-stone':           { s: 'intprops', x: 272, y: 144, w: 48, h: 48 },
  'door-blue':            { s: 'intprops', x: 224, y: 208, w: 48, h: 48 },
  'rug-green':            { s: 'intprops', x: 336, y: 336, w: 48, h: 48 },
  'rug-olive':            { s: 'intprops', x: 384, y: 336, w: 48, h: 48 },
  'plant-a':              { s: 'intprops', x: 0,   y: 352, w: 16, h: 32 },
  'plant-b':              { s: 'intprops', x: 16,  y: 352, w: 16, h: 32 },
  'plant-c':              { s: 'intprops', x: 32,  y: 352, w: 16, h: 32 },
  'shelf-objects':        { s: 'intprops', x: 48,  y: 144, w: 64, h: 32 },
  'cupboard':             { s: 'intprops', x: 176, y: 144, w: 48, h: 48 },
  'barrel':               { s: 'intprops', x: 224, y: 112, w: 16, h: 32 },
  'tankard':              { s: 'intprops', x: 496, y: 272, w: 16, h: 16 },
  'vessel-a':             { s: 'intprops', x: 528, y: 240, w: 16, h: 16 },
  'vessel-b':             { s: 'intprops', x: 544, y: 240, w: 16, h: 16 },
  'bottle-orange':        { s: 'intprops', x: 512, y: 288, w: 16, h: 16 },
  'bottle-green':         { s: 'intprops', x: 528, y: 304, w: 16, h: 16 },
  'bottle-purple':        { s: 'intprops', x: 544, y: 320, w: 16, h: 16 },
  'sign-lettered':        { s: 'intprops', x: 224, y: 256, w: 32, h: 32 },

  // Interior Walls
  'int-wall-cap':         { s: 'intwalls', x: 384, y: 0,  w: 96, h: 32 },
  'int-wall-face':        { s: 'intwalls', x: 384, y: 32, w: 96, h: 16 },
  // measured off the sheet (walls study, Nov 24): the 416,96 window
  // is solid warm boards - rail at +24, wainscot at +30, trim at +43.
  // beam: solid timber only y1..y8; y0 is outline, y9+ is cutaway.
  'int-wall-panel':       { s: 'intwalls', x: 416, y: 96,  w: 32, h: 48 },
  'int-wall-beam':        { s: 'intwalls', x: 400, y: 1,   w: 64, h: 8 },
  'int-wall-side-a':      { s: 'intwalls', x: 416, y: 96,  w: 16, h: 48 },
  'int-wall-side-b':      { s: 'intwalls', x: 432, y: 96,  w: 16, h: 48 },
  'int-wall-base':        { s: 'intwalls', x: 416, y: 128, w: 32, h: 16 },

  // Buildings Walls, facade strips
  'facade-a':             { s: 'bldgwalls', x: 0,   y: 192, w: 96, h: 48 },
  'facade-b':             { s: 'bldgwalls', x: 96,  y: 192, w: 96, h: 48 },
  'facade-tavern':        { s: 'bldgwalls', x: 192, y: 192, w: 96, h: 48 },
  'facade-c':             { s: 'bldgwalls', x: 288, y: 192, w: 96, h: 48 },
  'facade-d':             { s: 'bldgwalls', x: 384, y: 192, w: 96, h: 48 },
  'facade-e':             { s: 'bldgwalls', x: 480, y: 192, w: 96, h: 48 },

  // Roofs
  'eave-trim':            { s: 'roofs', x: 0, y: 240, w: 48, h: 16 },
  'eave-toothed':         { s: 'roofs', x: 0, y: 256, w: 48, h: 16 },

  // Buildings Props
  'window-a':             { s: 'bldgprops', x: 64,  y: 64, w: 32, h: 32 },
  'window-b':             { s: 'bldgprops', x: 96,  y: 64, w: 32, h: 32 },
  'window-c':             { s: 'bldgprops', x: 128, y: 64, w: 32, h: 32 },
  'window-heavy':         { s: 'bldgprops', x: 32,  y: 96, w: 32, h: 32 },
  'chimney':              { s: 'bldgprops', x: 0,   y: 64, w: 32, h: 64 },
  'fence-span':           { s: 'bldgprops', x: 16,  y: 176, w: 48, h: 16 },

  // Furniture
  'lamp-post':            { s: 'furniture', x: 144, y: 448, w: 32, h: 48 },
  'lantern-hanging':      { s: 'furniture', x: 180, y: 452, w: 7, h: 19 },
  'crate-open':           { s: 'furniture', x: 720, y: 64,  w: 16, h: 32 },
  'crate-slatted':        { s: 'furniture', x: 736, y: 64,  w: 16, h: 32 },

  // Vegetation
  'tree-autumn-a':        { s: 'vegetation', x: 144, y: 0,   w: 48, h: 32 },
  'tree-autumn-b':        { s: 'vegetation', x: 144, y: 64,  w: 48, h: 32 },
  'rock-cluster':         { s: 'vegetation', x: 224, y: 400, w: 48, h: 32 }
};

// Floor styles: a swatch per style, sliced into 16x16 variants and
// hash-scattered so floors don't look tiled. Plank is 80x64, not
// 80x80: the region's bottom row has two empty cells on the sheet
// ((0,640) and (64,640)) that hashed in as black tiles on the tavern
// floor, so the swatch stops one row short of them.
const FLOOR_STYLES = {
  plank: { sheet: 'intwalls', x: 0,   y: 576, w: 80, h: 64 },
  stone: { sheet: 'floors',   x: 96,  y: 160, w: 48, h: 32 },
  grass: { sheet: 'floors',   x: 16,  y: 160, w: 48, h: 32 },
  earth: { sheet: 'floors',   x: 176, y: 160, w: 48, h: 32 }
};
const FLOOR_VARIANTS = {};

// Shoreline cells from Water_tiles template 1 (the 5x5 land-lobe
// matrix). Only the south set is used by the harbor slice; the rest
// are registered for the day we need them.
const SHORE_CELLS = {
  S:  [32, 64], N: [32, 0], E: [64, 32], W: [0, 32],
  SW: [16, 64], SE: [48, 64], NW: [16, 0], NE: [48, 0]
};

// Flat-color fallbacks so legacy rooms (the Undercroft, via its bare
// rows array) still render without any sheet art.
const LEGACY = {
  floor: 0x23262c,
  wall: [0x34383f, 0x2f333a],
  water: 0x14283a,
  leaf: 0x4a3628,
  opening: 0x07090c,
  flame: 0xffa04a
};

// Default color behind a sheet-door leaf (the recess the frame sits
// in). Rooms override with doors.recess; the street asks for warm
// light spilling out of the common room.
const DOOR_RECESS = 0x161c24;

// ------------------------------------------------- frame registration

let framesReady = false;

function addFrame(scene, sheet, name, x, y, w, h) {
  if (!scene.textures.exists(sheet)) return;
  const tex = scene.textures.get(sheet);
  if (tex.has(name)) return;
  tex.add(name, 0, x, y, w, h);
}

function ensureFrames(scene) {
  if (framesReady) return;
  for (const [name, r] of Object.entries(SPEC)) {
    addFrame(scene, r.s, name, r.x, r.y, r.w, r.h);
  }
  for (const [style, sw] of Object.entries(FLOOR_STYLES)) {
    const cols = Math.floor(sw.w / TILE);
    const rows = Math.floor(sw.h / TILE);
    FLOOR_VARIANTS[style] = cols * rows;
    for (let i = 0; i < cols * rows; i++) {
      addFrame(scene, sw.sheet, `fl-${style}-${i}`,
        sw.x + (i % cols) * TILE, sw.y + Math.floor(i / cols) * TILE,
        TILE, TILE);
    }
  }
  // six columns of the brown board family, for side walls
  for (let i = 0; i < 6; i++) {
    addFrame(scene, 'intwalls', `int-wall-tex-${i}`, 384 + i * TILE, 48, TILE, TILE);
  }
  // textured water patches - sliced from the y=96 row; the y=80 row
  // has three empty cells (columns 0, 4 and 5) that showed up as
  // black squares scattered across the harbor
  for (let i = 0; i < 8; i++) {
    addFrame(scene, 'water', `water-${i}`, i * TILE, 96, TILE, TILE);
  }
  for (const [cell, [x, y]] of Object.entries(SHORE_CELLS)) {
    addFrame(scene, 'water', `shore-${cell}`, x, y, TILE, TILE);
  }
  framesReady = true;
}

// --------------------------------------------------------- door groups
// Same flood fill the sim uses, so each drawn leaf matches one sim
// door. Matching is by tile membership, not order.

function groupTiles(tiles) {
  const key = t => `${t.tx},${t.ty}`;
  const set = new Set(tiles.map(key));
  const seen = new Set();
  const groups = [];
  for (const t of tiles) {
    if (seen.has(key(t))) continue;
    const group = [];
    const stack = [t];
    seen.add(key(t));
    while (stack.length) {
      const c = stack.pop();
      group.push(c);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nk = `${c.tx + dx},${c.ty + dy}`;
        if (set.has(nk) && !seen.has(nk)) {
          seen.add(nk);
          stack.push({ tx: c.tx + dx, ty: c.ty + dy });
        }
      }
    }
    groups.push(group);
  }
  return groups;
}

// ------------------------------------------------------------- TileArt

export class TileArt {
  constructor(scene, room) {
    this.scene = scene;
    this.room = room;
    this.objs = [];
    this.tweened = [];
    this.doorGroups = [];
    this.legacy = !room.def.walls && !room.def.buildings;
    ensureFrames(scene);
    this.drawFloors();
    this.drawWater();
    if (room.def.walls) this.drawInteriorWalls();
    if (room.def.buildings) this.drawBuildings();
    if (this.legacy) this.drawLegacyWalls();
    this.drawDoors();
    this.drawProps();
  }

  push(o) {
    this.objs.push(o);
    return o;
  }

  destroy() {
    for (const o of this.tweened) this.scene.tweens.killTweensOf(o);
    for (const o of this.objs) o.destroy();
    this.objs.length = 0;
    this.tweened.length = 0;
    this.doorGroups.length = 0;
  }

  // ----------------------------------------------------------- floors

  drawFloors() {
    const { room, scene } = this;
    for (let ty = 0; ty < room.height; ty++) {
      for (let tx = 0; tx < room.width; tx++) {
        const entry = room.entryAt(tx, ty);
        if (entry.water) continue; // water draws its own surface
        const style = entry.floor || '';
        if (FLOOR_STYLES[style]) {
          const v = (tx * 7 + ty * 13) % FLOOR_VARIANTS[style];
          this.push(scene.add.image(tx * TILE + 8, ty * TILE + 8, FLOOR_STYLES[style].sheet, `fl-${style}-${v}`).setDepth(0));
        } else if (this.legacy) {
          this.push(scene.add.rectangle(tx * TILE + 8, ty * TILE + 8, TILE, TILE, LEGACY.floor).setDepth(0));
        }
      }
    }
  }

  // ------------------------------------------------- water + shoreline

  drawWater() {
    const { room, scene } = this;
    const spec = room.def.waterSpec;
    for (const { tx, ty } of room.water()) {
      if (spec) {
        const v = (tx * 5 + ty * 11) % 8;
        this.push(scene.add.image(tx * TILE + 8, ty * TILE + 8, 'water', `water-${v}`).setDepth(1));
      } else {
        this.push(scene.add.rectangle(tx * TILE + 8, ty * TILE + 8, TILE, TILE, LEGACY.water).setDepth(1));
      }
    }
    // shoreline: pick the template cell by where the water actually is
    for (let ty = 0; ty < room.height; ty++) {
      for (let tx = 0; tx < room.width; tx++) {
        if (!room.entryAt(tx, ty).shore) continue;
        this.push(scene.add.image(tx * TILE + 8, ty * TILE + 8, 'water', `shore-${this.shoreCell(tx, ty)}`).setDepth(1));
      }
    }
    if (spec && spec.shimmer && room.water().length) {
      this.startShimmer(room.water());
    }
  }

  shoreCell(tx, ty) {
    const { room } = this;
    const wet = (x, y) => {
      if (x < 0 || y < 0 || x >= room.width || y >= room.height) return true; // off-grid counts as water at the slice edges
      return room.isWater(x, y);
    };
    const s = wet(tx, ty + 1), n = wet(tx, ty - 1);
    const w = wet(tx - 1, ty), e = wet(tx + 1, ty);
    if (s && w) return 'SW';
    if (s && e) return 'SE';
    if (n && w) return 'NW';
    if (n && e) return 'NE';
    if (s) return 'S';
    if (n) return 'N';
    if (e) return 'E';
    if (w) return 'W';
    return 'S';
  }

  startShimmer(tiles) {
    const { scene } = this;
    const step = Math.max(1, Math.floor(tiles.length / 12));
    for (let i = 0; i < tiles.length; i += step) {
      const { tx, ty } = tiles[i];
      const g = scene.add.rectangle(
        tx * TILE + 3 + (i * 7) % 10, ty * TILE + 3 + (i * 5) % 10,
        3, 1, 0xaadcee).setDepth(2).setAlpha(0);
      this.push(g);
      this.tweened.push(g);
      scene.tweens.add({
        targets: g,
        alpha: { from: 0, to: 0.45 },
        duration: 900 + (i % 5) * 350,
        yoyo: true, repeat: -1,
        delay: (i % 7) * 300
      });
    }
  }

  // --------------------------------------------- interior wall bands

  drawInteriorWalls() {
    const { room, scene } = this;
    const w = room.def.walls;
    const W = room.width * TILE, H = room.height * TILE;
    // north band: the warm panel (32x48) tiled across, sized for a
    // 3-row band; a beam cornice rides along the top of it
    for (let x = 0; x < W; x += 32) {
      this.push(scene.add.image(x, 0, 'intwalls', 'int-wall-panel').setOrigin(0, 0).setDepth(5));
    }
    for (let x = 0; x < W; x += 64) {
      this.push(scene.add.image(x, 0, 'intwalls', 'int-wall-beam').setOrigin(0, 0).setDepth(5));
    }
    // side walls: 16x48 board slices hashed a/b, stepped 3 rows so
    // the 48px art tiles the column (the south band covers the seam)
    for (let ty = w.north; ty < room.height - w.south; ty += 3) {
      for (const tx of [0, room.width - 1]) {
        const v = (tx * 3 + ty * 7) % 2 ? 'b' : 'a';
        this.push(scene.add.image(tx * TILE, ty * TILE, 'intwalls', `int-wall-side-${v}`).setOrigin(0, 0).setDepth(5));
      }
    }
    // south band: baseboard strip along the bottom edge
    if (w.south) {
      for (let x = 0; x < W; x += 32) {
        this.push(scene.add.image(x, H - w.south * TILE, 'intwalls', 'int-wall-base').setOrigin(0, 0).setDepth(5));
      }
    }
  }

  // ------------------------------------------------- street buildings

  drawBuildings() {
    const { room, scene } = this;
    const b = room.def.buildings;
    // alleys first: a shadowed board wall with one lit open
    // doorway, so the gap reads as a passage, not a hole
    for (const [c0, c1] of b.alleys) {
      const ax = c0 * TILE;
      const cw = (c1 - c0 + 1) * TILE;
      for (let x = 0; x < cw; x += 32) {
        const frame = (cw - x) >= 32 ? 'int-wall-panel' : 'int-wall-side-a';
        this.push(scene.add.image(ax + x, TILE, 'intwalls', frame)
          .setOrigin(0, 0).setTint(0x6e7480).setDepth(3));
      }
      const dx = ax + cw / 2;
      this.push(scene.add.rectangle(dx, 48, 24, 32, 0x11141a).setDepth(3));
      this.push(scene.add.rectangle(dx, 50, 16, 24, 0x8a5a28).setDepth(3));
    }
    // facades: 96x48 strips tiled across each block, rows 1-3
    for (const blk of b.blocks) {
      for (let x = blk.cols[0] * TILE; x <= blk.cols[1] * TILE; x += 96) {
        this.push(scene.add.image(x, TILE, SPEC[blk.facade].s, blk.facade).setOrigin(0, 0).setDepth(4));
      }
    }
    // the roofline: trim with toothed eave over row 0
    for (let x = 0; x < room.width * TILE; x += 48) {
      this.push(scene.add.image(x, 0, SPEC[b.eave.trim].s, b.eave.trim).setOrigin(0, 0).setDepth(4));
    }
    for (let x = 0; x < room.width * TILE; x += 48) {
      this.push(scene.add.image(x, 0, SPEC[b.eave.teeth].s, b.eave.teeth).setOrigin(0, 0).setDepth(4));
    }
  }

  // -------------------------------------------- legacy (Undercroft)

  drawLegacyWalls() {
    const { room, scene } = this;
    for (let ty = 0; ty < room.height; ty++) {
      for (let tx = 0; tx < room.width; tx++) {
        const e = room.entryAt(tx, ty);
        if (!e.solid || e.door || e.water) continue;
        const tone = LEGACY.wall[(tx * 5 + ty * 3) % LEGACY.wall.length];
        this.push(scene.add.rectangle(tx * TILE + 8, ty * TILE + 8, TILE, TILE, tone).setDepth(4));
        if (e.torch) {
          this.push(scene.add.rectangle(tx * TILE + 8, ty * TILE + 13, 4, 5, LEGACY.flame).setDepth(100 + (ty + 1) * TILE));
        }
      }
    }
  }

  // ----------------------------------------------------------- doors

  drawDoors() {
    const { room, scene } = this;
    const tiles = room.doors();
    if (!tiles.length) return;
    const want = room.def.doors && SPEC[room.def.doors.frame] ? room.def.doors.frame : null;
    for (const g of groupTiles(tiles)) {
      const minX = Math.min(...g.map(t => t.tx));
      const maxX = Math.max(...g.map(t => t.tx));
      const maxY = Math.max(...g.map(t => t.ty));
      const x = minX * TILE;
      const bot = (maxY + 1) * TILE;
      const gw = (maxX - minX + 1) * TILE;
      // our doors are 3 tiles wide and the frames are 48x48, so the
      // leaf covers the doorway and then some upward (the recess)
      const gh = want ? SPEC[want].h : TILE;
      const recess = want
        ? (room.def.doors && room.def.doors.recess != null ? room.def.doors.recess : DOOR_RECESS)
        : LEGACY.opening;
      this.push(scene.add.rectangle(x + gw / 2, bot - gh / 2, gw, gh, recess).setDepth(5));
      const leaf = want
        ? scene.add.image(x, bot, SPEC[want].s, want).setOrigin(0, 1).setDepth(6)
        : scene.add.rectangle(x + gw / 2, bot - gh / 2, gw, gh, LEGACY.leaf).setDepth(6);
      this.push(leaf);
      this.doorGroups.push({ tiles: g, leaf });
    }
  }

  // Call once per frame with sim.doors: each group is
  // { tiles: [{tx,ty}], open: bool }. Leaves default to closed.
  syncDoors(simDoors) {
    if (!simDoors) return;
    for (const g of this.doorGroups) {
      const first = g.tiles[0];
      const sim = simDoors.find(sg =>
        sg.tiles && sg.tiles.some(t => t.tx === first.tx && t.ty === first.ty));
      if (sim) g.leaf.setVisible(!sim.open);
    }
  }

  // ----------------------------------------------------------- props

  drawProps() {
    const { room, scene } = this;
    const props = room.def.props;
    if (!props) return;
    for (const p of props) {
      if (!SPEC[p.frame]) {
        console.warn('[tileart] no SPEC frame for prop:', p.frame);
        continue;
      }
      const px = p.tx * TILE + (p.dx || 0);
      const py = (p.ty + 1) * TILE + (p.dy || 0);
      const spr = scene.add.image(px, py, SPEC[p.frame].s, p.frame).setOrigin(0, 1);
      if (p.flip) spr.setFlipX(true);
      if (p.angle) spr.setRotation(Phaser.Math.DegToRad(p.angle));
      spr.setDepth(p.flat ? 50 : 100 + py + (p.dz || 0));
      this.push(spr);
    }
  }
}
