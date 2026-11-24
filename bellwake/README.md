# BELLWAKE
### v0.01a - "First Steps" (alpha, in-house)
Designed and Made by Relic & Ember Studios. We wake worlds.

A browser-based top-down 2D fantasy roguelike. This is the very first
playable step: one Undercroft test room, one Bellringer, candlelight.

## Controls
WASD or arrow keys: walk, 8 directions. That's everything, for now.

## Running it
From the repo root:

    python -m http.server

(or `npx serve`), then open http://localhost:8000/bellwake/
Plain file:// will not work: ES modules require a local server.

## CDN-free promise
The game makes zero external requests at runtime. The entire engine is
vendored at libs/phaser.min.js (Phaser 3.90.0, official npm build
artifact: https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js).
No web fonts, no remote images, no telemetry.

## Folder map (bible section each file implements)
    bellwake/
      index.html          entry point
      libs/phaser.min.js  vendored Phaser 3.90.0
      src/main.js         bootstrap; wires sim to render      (SS11)
      src/sim/            engine-agnostic simulation         (SS11)
        sim.js            fixed 60 Hz world step             (SS3)
        player.js         Bellringer state                   (SS4)
        collision.js      AABB vs wall grid, axis-sliding    (SS4)
        room.js           room model + tile legend
      src/render/         Phaser layer; no game rules here   (SS11)
        scene.js          input + drawing
        lighting.js       torch flicker + tide shimmer       (SS8)
        pixels.js         nearest-neighbor presentation      (SS8, SS11)
      src/data/rooms/undercroft-test.js  the test room       (SS5)

## Known placeholders
The Bellringer is drawn in code until the Body_A Aseprite exports
(PNG + JSON pairs) land in assets/exports/. Room art is code-drawn
until the szadiart catacomb tileset is wired. All intentional, all v0.02a.

## Versioning
Decimal + phase letter (a = alpha, in-house). v0.01a is the first rung.

## v0.02a roadmap
Real Body_A sprite with 4-direction idle/run from assets/exports/,
a door that actually opens, whole-integer scale snapping.

## Credits
Designed and Made by Relic & Ember Studios. We wake worlds.
Engine: Phaser 3 (MIT), vendored locally.
