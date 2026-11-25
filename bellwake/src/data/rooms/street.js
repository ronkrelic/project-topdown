// BELLWAKE v0.03a - data/rooms/street.js
// A slice of Wickharbor outside the Anchor's door: three facades,
// two dark alleys, the harbor street, and the Ebb beyond the
// railing. 30 x 17 tiles, same canvas as the tavern.
//
// Layout:
//   rows 0-3   building band: cottage A, alley, the Anchor
//              (door 'DDD' at cols 14-16), alley, cottage C
//   rows 4-5   grass in front of the buildings, stone stoop at
//              cols 13-17 under the door
//   rows 6-9   the street proper (stone), lamps at row 8
//   rows 10-12 harbor lawn: trees, rocks, fence with a gap
//   row 13     the shore, solid; rows 14-16 the harbor water
//
// NOTE: the slice has no side walls, so the west/east edges rely
// on room.js treating out-of-grid tiles as solid. If the player
// can walk off the left or right edge in playtest, say the word
// and I'll patch room.js to clamp.
//
// LAMP PASS (v0.03a): the two lamp-posts now mirror each other
// (east one flipped), each lantern hangs off its own arm tip with
// the tightened lantern-hanging crop, and the lantern lights sit
// one row up, on the lamps themselves - the glow used to pool a
// tile low, under the posts.
//
// DOOR GLOW PASS (v0.03a patch 2): the Anchor's door reads from
// outside now. doors.recess warms the "beyond the door" panel
// tileart paints behind the leaf, so the open doorway glows like
// the common room is lit behind it, and a steady pool sits on the
// stoop - no door in any sheet has a lit window, so warm recess +
// stoop light is the dusk visibility plan. also: grid rows 13, 15
// and 16 were one character short (29 vs 30), which dropped the
// far-east column of the shore and water off-grid into a black
// notch at the SE corner. all rows padded to 30.

export const STREET = {
  key: 'street',
  title: 'WICKHARBOR',
  subtitle: 'Orsail',

  rows: [
    '######xxx############xxx######',
    '######xxx############xxx######',
    '######xxx############xxx######',
    '######xxx#####DDD####xxx######',
    '........VV...ppppp....VV......',
    '........VV...ppppp....VV......',
    'pppppppppppppppppppppppppppppp',
    'pppppppppppppppppppppppppppppp',
    'pppppppppppLLppppLLppppppppppp',
    'pppppppppppppppppppppppppppppp',
    '...TTT..................TTT...',
    '...TTT......VVV...............',
    '.FFFFFFFFF..VVV.....FFFFFFFFF.',
    'SSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
  ],

  legend: {
    '#': { solid: true },                   // building mass
    'x': { solid: true, floor: 'earth' },   // dark alley slots
    'D': { door: true, floor: 'stone' },    // the Anchor's door
    '.': { floor: 'grass' },
    'p': { floor: 'stone' },                 // the street
    'T': { solid: true, floor: 'grass' },   // trees
    'F': { solid: true, floor: 'grass' },    // fence
    'L': { solid: true, floor: 'stone' },    // lamp posts
    'V': { solid: true, floor: 'grass' },    // casks, crates, rocks
    'S': { shore: true, solid: true, floor: 'earth' }, // harbor's edge
    'W': { water: true, solid: true }        // the harbor itself
  },

  spawn: { tx: 15, ty: 8 }, // fallback if booted straight into the street

  // Back inside. spawn = the tavern's doorway tile (row 16, under
  // the sign); the sim opens it for you on arrival.
  exit: { to: 'tavern', spawn: [14, 16], face: 'up' },

  // Renderer specs -------------------------------------------------
  ambient: 0.6, // dusk on the street; lamps + windows lift it

  lights: [
    // lantern glows sit ON the lamps (row 6); a row lower and the
    // pool reads as coming from under the post
    { tx: 13, ty: 6, r: 55, color: 0xffc890, flicker: true }, // west lantern
    { tx: 16, ty: 6, r: 55, color: 0xffc890, flicker: true }, // east lantern
    { tx: 11, ty: 2, r: 40, color: 0xffd9a0 },               // tavern window glow
    { tx: 19, ty: 2, r: 40, color: 0xffd9a0 },               // tavern window glow
    // steady, no flicker: reads as the common room's light
    // spilling out the open door onto the stoop, not another lamp
    { tx: 15, ty: 4, r: 50, color: 0xffb070 }                // stoop pool
  ],

  walls: null, // no interior band; the buildings carry the art

  buildings: {
    // row 0 dresses the top of every facade
    eave: { trim: 'eave-trim', teeth: 'eave-toothed' },
    // facades are 96x48 strips, tiled horizontally per block
    blocks: [
      { cols: [0, 5],    facade: 'facade-a' },      // neighbor cottage
      { cols: [9, 20],  facade: 'facade-tavern' },  // the Anchor herself
      { cols: [24, 29], facade: 'facade-c' }        // harbor cottage
    ],
    alleys: [ [6, 8], [21, 23] ] // dressed as shadowed sidewalls by tileart
  },

  // blue metalwork, seen from outside. recess = what tileart
  // paints behind the leaf: warm, the common room lit behind the
  // open door (tileart's default is dim dusk)
  doors: { frame: 'door-blue', recess: 0x8a5a28 },

  waterSpec: { style: 'harbor', shimmer: true },

  // Same prop contract as the tavern: frame = tileart SPEC name,
  // tx/ty = tile the art's bottom sits on, dx/dy nudges, angle,
  // flip, flat, dz.
  props: [
    // silhouettes and glow on the building band
    { frame: 'chimney', tx: 2, ty: 2 },
    { frame: 'window-a', tx: 4, ty: 3 },
    { frame: 'window-heavy', tx: 10, ty: 3 },
    { frame: 'window-c', tx: 18, ty: 3 },
    { frame: 'window-a', tx: 25, ty: 3 },
    { frame: 'window-b', tx: 27, ty: 3 },
    // lamps flanking the Anchor's door: posts mirror each other,
    // lanterns hang off each arm's tip (dx/dy tuned to touch the
    // bracket to the arm end - nudge freely, they're just offsets)
    { frame: 'lamp-post', tx: 11, ty: 8 },
    { frame: 'lamp-post', tx: 17, ty: 8, flip: true },
    { frame: 'lantern-hanging', tx: 13, ty: 7, dx: -3, dy: -8, dz: 1 },
    { frame: 'lantern-hanging', tx: 16, ty: 7, dx: 6, dy: -8, dz: 1, flip: true },
    // clutter by the alley mouths
    { frame: 'barrel', tx: 8, ty: 5 },
    { frame: 'barrel', tx: 9, ty: 5 },
    { frame: 'crate-slatted', tx: 22, ty: 5 },
    { frame: 'crate-open', tx: 23, ty: 5 },
    // trees, rocks, railing
    { frame: 'tree-autumn-a', tx: 3, ty: 11 },
    { frame: 'tree-autumn-b', tx: 24, ty: 11 },
    { frame: 'rock-cluster', tx: 12, ty: 12 },
    { frame: 'fence-span', tx: 1, ty: 12 },
    { frame: 'fence-span', tx: 4, ty: 12 },
    { frame: 'fence-span', tx: 7, ty: 12 },
    { frame: 'fence-span', tx: 20, ty: 12 },
    { frame: 'fence-span', tx: 23, ty: 12 },
    { frame: 'fence-span', tx: 26, ty: 12 }
  ]
};
