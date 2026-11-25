# BELLWAKE
### v0.02a - "The Open Door" (alpha, in-house)
Designed and Made by Relic & Ember Studios. We wake worlds.

A browser-based top-down 2D fantasy roguelike. The Bellringer has a
face now: real sprite, real walk cycle. And the Undercroft's door
opens.

## Controls
WASD or arrow keys: walk, 8 directions.
E: use. Doors now, everything else later.

## Running it
From the repo root:

    python -m http.server

(or `npx serve`), then open http://localhost:8000/bellwake/
Plain file:// will not work: ES modules require a local server.

## CDN-free promise
The game makes zero external requests at runtime. The entire engine is
vendored at libs/phaser.min.js (Phaser 3.90.0, official npm build
artifact: https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js).
All art the game loads lives in bellwake/assets/exports/.
No web fonts, no remote images, no telemetry.

## What's in v0.02a
- Real Bellringer: the New_Version Idle and Walk sheets, loaded from
  bellwake/assets/exports/. The exported JSONs carry no usable
  frameTags, so animations are defined in code (render/anims.js)
- A door that opens: walk up, press E. Closed doors are solid
- Whole-integer zoom: the canvas snaps to 1x/2x/3x, never stretches

## Folder map (bible section each file implements)
    bellwake/
      index.html          entry point
      libs/phaser.min.js  vendored Phaser 3.90.0
      assets/exports/     sprite sheets the game loads
      src/main.js         bootstrap; wires sim to render      (SS11)
      src/sim/            engine-agnostic simulation         (SS11)
        sim.js            fixed 60 Hz world step + doors     (SS3)
        player.js         Bellringer state                   (SS4)
        collision.js      AABB vs solid grid, axis-sliding   (SS4)
        room.js           room model + tile legend
      src/render/         Phaser layer; no game rules here  (SS11)
        scene.js          input + drawing
        anims.js          player animation definitions
        lighting.js       torch flicker + tide shimmer       (SS8)
        pixels.js         nearest-neighbor presentation     (SS8, SS11)
      src/data/rooms/undercroft-test.js  the test room      (SS5)

## Known placeholders
Room art is still code-drawn until the szadiart catacomb tileset is
wired. The door is code-drawn planks. Side-facing sheets are assumed
to face right (flipped for left); if the walk cycle moonwalks, it is
one flag in scene.js. No audio yet.

## Versioning
Decimal + phase letter (a = alpha, in-house). v0.02a is the second rung.

## v0.03a roadmap
Szadiart catacomb tileset for real room art, the first Drowned, and
something actual beyond the stair.

## Credits
Designed and Made by Relic & Ember Studios. We wake worlds.
Engine: Phaser 3 (MIT), vendored locally.
Player sprite: anokolisa top-down character pack (free tier).
