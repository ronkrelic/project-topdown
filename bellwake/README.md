# BELLWAKE

A browser-based top-down 2D fantasy roguelike. The kingdom of Orsail
drowned; every night the tide pulls back (the Ebb) and the dead walk
out of the water. You are a Bellringer out of Wickharbor, sent down
at each Ebb to recover the great bells of the drowned kingdom, because
every bell rung settles the Drowned dead a little more.

Full design bible: `game-bible.md` at the repo root.

## What's in v0.03a

The opening scene: a tavern. The Drowned Anchor is the Bellringer's
home ground and, one day, the multiplayer hub. This build is the first
one that looks like the game:

- The tavern interior: L-shaped bar, stools, tables set for dinner,
  hearth, chandeliers, the room glowing warm against the night.
- A first slice of Wickharbor outside its door: lamp-lit street at
  dusk, cottages, fence line, and the harbor itself, shimmering.
- Doorway transitions: walk through an open door and the next area
  loads behind a fade. Two areas, one connected place.
- Area title cards on every area load, in system serif. No web fonts,
  no fetches.
- Real art throughout, sliced from the exported sheets in code.
- The Undercroft is deferred to a future version; the old test room
  still boots behind the debug key below.

Under the hood, same as ever: an engine-agnostic 60 Hz sim in
`src/sim`, a Phaser renderer in `src/render`, and nothing else.

## Controls

WASD or arrow keys: walk, 8 directions.
E: use. Doors for now; everything else later.
U: debug. Swaps to the Undercroft test room and back. Dev convenience
only; it comes out before any release.

## Running it

From the repo root:

    python -m http.server

(or `npx serve`), then open http://localhost:8000/bellwake/
Plain file:// will not work; the game loads ES modules.

## Zero-network promise

The game makes zero external requests at runtime. The entire engine is
vendored at `libs/phaser.min.js` (Phaser 3.90.0, official npm build
artifact). Fonts are system fonts. All art ships in the repo.

## Layout

    bellwake/
      index.html            loads Phaser, then src/main.js
      libs/phaser.min.js    the whole engine, vendored
      src/
        main.js             game config and boot
        sim/                the rules, no rendering
          world.js            room registry (tavern, street)
          room.js             grid, legend, spawn and exit data
          sim.js              movement, doors, area transitions
          player.js           the Bellringer's body
          collision.js        AABB vs tiles
        data/rooms/        authored areas
          tavern.js           The Drowned Anchor
          street.js           the Wickharbor slice
          undercroft-test.js  legacy test room (debug key)
        render/            Phaser drawing
          scene.js            the loop, input, transitions
          tileart.js          sheet slicing (SPEC) and room drawing
          lighting.js         ambient dark + warm glows
          areatitle.js        the area cards
          anims.js            player sheets and animations
          pixels.js           pixel-perfect config and zoom
      assets/exports/      the art that ships

One art note: the Aseprite JSONs beside nine of the tile sheets are
stale from a re-export. The game ignores them on purpose and slices
every frame in code (`tileart.js` SPEC). The player atlas JSONs are
good and are used as atlases.

## Versioning

Decimal + phase letter (a = alpha, in-house). v0.03a is the third
rung.

## v0.04a roadmap

The Undercroft returns as the first real delve: szadiart catacomb art,
the first of the Drowned, and the first swings of Crush/Pierce/Slice
against armor classes. After that, in order of need: the Almanac, a
HUD, and the game's first music.
