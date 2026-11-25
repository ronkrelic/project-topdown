// BELLWAKE v0.03a - data/rooms/tavern.js
// The Drowned Anchor, common room. One public hall for now: the
// kitchen and bedrooms are shelved (the Anchor is Wickharbor's
// neutral ground and the future multiplayer hub, so the hall comes
// first). 30 x 17 tiles.
//
// Everything here is data. Solidity lives in rows + legend; the
// rest is renderer specs (tileart.js reads walls/doors/waterSpec/
// props, lighting.js reads ambient + lights). Every art rect is a
// named frame in tileart.js SPEC, and every coordinate in this file
// is tunable: playtest and nudge, nothing is load-bearing except
// the rows/legend grid itself.
//
// Layout:
//   rows 0-2    north wall band (cap + face over the hall)
//   rows 3-4    barkeep's walk behind the L-bar
//   rows 5-6    bar counter, long run; rows 7-12 the L returns south
//   rows 8-14   the hall: long table, round table, square + small
//   row 16      south wall, front door at cols 13-15 ('DDD')

export const TAVERN = {
  key: 'tavern',
  title: 'THE DROWNED ANCHOR',
  subtitle: 'Wickharbor',

  rows: [
    '##############################',
    '##############################',
    '##############################',
    '#.......................HHH..#',
    '#.......................HHH..#',
    '#..BBBBBBBBBBBB.........HHH..#',
    '#..BBBBBBBBBBBBV.....VVV..VVV#',
    '#..BB..........V.....VVV..VVV#',
    '#..BB............TTTT...TT...#',
    '#..BB............TTTT...TT...#',
    '#..BB...................TT...#',
    '#.VBB........................#',
    '#.VBB....TT..................#',
    '#........TT........TT........#',
    '#..................TT........#',
    '#............................#',
    '#############DDD##############'
  ],

  legend: {
    '#': { solid: true },                  // wall band
    '.': { floor: 'plank' },               // warm planks
    'B': { solid: true, floor: 'plank' },  // bar counter
    'T': { solid: true, floor: 'plank' },  // tables
    'H': { solid: true, floor: 'plank' },  // hearth masonry
    'V': { solid: true, floor: 'plank' },  // casks, armchairs, hefty props
    'D': { door: true, floor: 'plank' }    // the front door
  },

  spawn: { tx: 15, ty: 12 },

  // Where the front door leads. spawn is the doorway tile in the
  // street you arrive standing in; the sim opens it for you.
  exit: { to: 'street', spawn: [15, 3], face: 'down' },

  // Renderer specs -------------------------------------------------
  ambient: 0.45, // darkness over the hall; chandeliers + hearth lift it

  lights: [
    { tx: 9,  ty: 4, r: 105, color: 0xffd9a0 },              // west chandelier
    { tx: 20, ty: 4, r: 105, color: 0xffd9a0 },              // east chandelier
    { tx: 25, ty: 5, r: 70, color: 0xff9a55, flicker: true }, // hearth
    { tx: 14, ty: 15, r: 40, color: 0xffb070 }               // street light spilling over the threshold
  ],

  walls: {
    style: 'interior',
    north: 3,    // rows of cap + face band
    south: 1,    // single-row south wall; the front door punches it
    sides: true, // cols 0 and 29 get wall texture
    cap: 'int-wall-cap',
    face: 'int-wall-face',
    tex: 'int-wall-tex'
  },

  doors: { frame: 'door-stone', recess: 0x5f4a30 }, // recess: the dusk street beyond, not a void

  waterSpec: null, // no water in the hall

  // Props. frame = named frame in tileart.js SPEC. tx/ty = tile the
  // art's BOTTOM sits on (origin bottom-left). dx/dy = pixel nudges,
  // angle = degrees, flip = mirror X, flat = floor decor drawn under
  // everything that y-sorts, dz = depth bias (1 sits a prop on a
  // table, ~520 hangs one from the ceiling).
  props: [
    // behind the bar, on the wall
    { frame: 'shelf-objects', tx: 5, ty: 2 },
    { frame: 'cupboard', tx: 11, ty: 2 },
    // the L-bar: long run, then the return south
    { frame: 'counter-sink', tx: 3, ty: 6 },
    { frame: 'counter-low', tx: 9, ty: 6 },
    { frame: 'counter-low', tx: 12, ty: 6 },
    { frame: 'counter-low', tx: 4, ty: 9, angle: -90 },
    { frame: 'counter-low', tx: 4, ty: 12, angle: -90 },
    // hearth against the north wall, armchairs pulled up to it
    { frame: 'hearth', tx: 24, ty: 5 },
    { frame: 'armchair-wood', tx: 21, ty: 7 },
    { frame: 'armchair-blue', tx: 26, ty: 7 },
    // hanging light
    { frame: 'chandelier-simple', tx: 8, ty: 4, dz: 520 },
    { frame: 'chandelier-elaborate', tx: 19, ty: 4, dz: 520 },
    // stools at the bar
    { frame: 'stool-red', tx: 6, ty: 7 },
    { frame: 'stool-red', tx: 8, ty: 7 },
    { frame: 'stool-red', tx: 10, ty: 7 },
    { frame: 'stool-red', tx: 12, ty: 7 },
    // long table with benches
    { frame: 'table-long', tx: 17, ty: 9 },
    { frame: 'bench-slat', tx: 17, ty: 7 },
    { frame: 'bench-blue', tx: 17, ty: 11 },
    // round pedestal table
    { frame: 'table-round', tx: 24, ty: 10 },
    { frame: 'chair-side', tx: 23, ty: 9 },
    { frame: 'chair-side', tx: 26, ty: 9, flip: true },
    // square table on the green rug
    { frame: 'table-square', tx: 9, ty: 13 },
    { frame: 'chair-side', tx: 8, ty: 13 },
    { frame: 'chair-side', tx: 11, ty: 13, flip: true },
    { frame: 'chair-front', tx: 9, ty: 11 },
    // small table by the south wall
    { frame: 'table-small', tx: 19, ty: 14 },
    { frame: 'chair-front', tx: 19, ty: 12 },
    { frame: 'chair-side', tx: 21, ty: 14, flip: true },
    // place settings
    { frame: 'tankard', tx: 18, ty: 9, dy: -6, dz: 1 },
    { frame: 'tankard', tx: 10, ty: 13, dy: -6, dz: 1 },
    { frame: 'vessel-a', tx: 24, ty: 10, dy: -4, dz: 1 },
    { frame: 'vessel-b', tx: 25, ty: 10, dy: -4, dz: 1 },
    { frame: 'bottle-purple', tx: 19, ty: 14, dy: -6, dz: 1 },
    // bottles on the bar
    { frame: 'bottle-orange', tx: 5, ty: 6, dy: -8, dz: 1 },
    { frame: 'bottle-green', tx: 8, ty: 6, dy: -8, dz: 1 },
    { frame: 'bottle-purple', tx: 12, ty: 6, dy: -8, dz: 1 },
    // casks and greenery
    { frame: 'barrel', tx: 15, ty: 7 },
    { frame: 'barrel', tx: 2, ty: 12 },
    { frame: 'plant-a', tx: 1, ty: 3 },
    { frame: 'plant-b', tx: 17, ty: 3 },
    { frame: 'plant-c', tx: 28, ty: 3 },
    // floor dressing
    { frame: 'rug-green', tx: 8, ty: 13, flat: true },
    { frame: 'rug-olive', tx: 22, ty: 13, flat: true },
    // the sign on the front wall, clear of the door
    { frame: 'sign-lettered', tx: 18, ty: 16 }
  ]
};
