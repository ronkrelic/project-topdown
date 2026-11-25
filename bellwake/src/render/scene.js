// BELLWAKE v0.03a - render/scene.js
// The conductor. Boots the Drowned Anchor, runs the fixed-step sim
// loop, wires input, draws the Bellringer, and owns area
// transitions: walk through an open doorway, the camera fades to
// black, the next room boots (art, lighting, title card), and it
// fades back in.
//
// Also here: the U debug key, which swaps to the Undercroft test
// room and back. That exercises the legacy render path (flat
// colors, torch auto-lights, bare-rows Room wrapping) without it
// being part of the shipped game. Pull it before a release build.
//
// v0.02a's stair hint text is gone on purpose: v0.03a has no
// Undercroft stair, and area cards now do the announcing.

import { TILE, tileCenter, Room } from '../sim/room.js';
import { makeRoom } from '../sim/world.js';
import { Sim } from '../sim/sim.js';
import { Player } from '../sim/player.js';
import { UNDERCROFT_TEST } from '../data/rooms/undercroft-test.js';

import { loadTileSheets, TileArt } from './tileart.js';
import { Lighting } from './lighting.js';
import { AreaTitle } from './areatitle.js';
import { loadPlayerSheets, makePlayerAnims, measureAnimPads } from './anims.js';
import { snappedZoom } from './pixels.js';

const STEP_MS = 1000 / 60; // fixed sim step
const FOOT_Y = 4;          // ground point this far below player.y
const FADE_MS = 260;       // area transition fade, to/from #07090c
const MAX_FRAME_MS = 250;  // clamp so a backgrounded tab can't spiral

export class SceneMain extends Phaser.Scene {
  constructor() {
    super('main');
  }

  preload() {
    loadPlayerSheets(this);
    loadTileSheets(this);
  }

  create() {
    makePlayerAnims(this);
    this.animPads = measureAnimPads(this);

    this.player = new Player(0, 0);
    this.acc = 0;
    this.transitioning = false;
    this.debugTarget = null;
    this.zoom = 0;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,E,U');

    this.playerSprite = this.add.sprite(0, 0, 'p-idle-down', '0')
      .setOrigin(0.5, 1)
      .play('idle-down');

    this.bootArea(makeRoom('tavern'));
    this.cameras.main.fadeIn(FADE_MS, 7, 9, 12);
    this.cameras.main.on('camerafadeoutcomplete', () => this.onFadedOut());
    this.scale.on('resize', this.refresh, this);
  }

  // Build one area: sim, player placement, art, mood, title card.
  // Called for the boot and for every transition, so they share
  // exactly one path.
  bootArea(room, spawn, facing) {
    if (this.tileArt) this.tileArt.destroy();
    if (this.lighting) this.lighting.destroy();
    if (this.areaTitle) this.areaTitle.destroy();

    this.room = room;
    this.sim = new Sim(room, this.player);
    this.sim.enter(room, spawn || room.spawnPoint(), facing || 'down');

    this.tileArt = new TileArt(this, room);
    this.lighting = new Lighting(this, room);
    this.areaTitle = new AreaTitle(this, room);
    this.refresh();
  }

  // Fit the room to the window, snapped to whole pixels.
  refresh() {
    const z = snappedZoom(this.room.width * TILE, this.room.height * TILE);
    if (z !== this.zoom) {
      this.zoom = z;
      this.scale.setZoom(z);
    }
  }

  update(time, delta) {
    if (!this.sim) return;

    this.readInput();

    this.acc = Math.min(this.acc + delta, MAX_FRAME_MS);
    while (this.acc >= STEP_MS) {
      this.sim.step(STEP_MS);
      this.acc -= STEP_MS;
    }

    this.tileArt.syncDoors(this.sim.doors);
    this.drawPlayer();

    if (this.sim.pending && !this.transitioning) {
      this.transitioning = true;
      this.cameras.main.fadeOut(FADE_MS, 7, 9, 12);
    }
    if (!this.transitioning && Phaser.Input.Keyboard.JustDown(this.keys.U)) {
      this.debugTarget = this.room.key === 'undercroft' ? 'tavern' : 'undercroft';
      this.transitioning = true;
      this.cameras.main.fadeOut(FADE_MS, 7, 9, 12);
    }
  }

  readInput() {
    const p = this.player;
    if (this.transitioning) {
      p.intentX = 0;
      p.intentY = 0;
      p.use = false;
      return;
    }
    const c = this.cursors;
    const k = this.keys;
    let ix = 0, iy = 0;
    if (c.left.isDown || k.A.isDown) ix -= 1;
    if (c.right.isDown || k.D.isDown) ix += 1;
    if (c.up.isDown || k.W.isDown) iy -= 1;
    if (c.down.isDown || k.S.isDown) iy += 1;
    p.intentX = ix;
    p.intentY = iy;
    p.use = Phaser.Input.Keyboard.JustDown(k.E);
  }

  drawPlayer() {
    const p = this.player;
    const spr = this.playerSprite;
    const dir = (p.facing === 'left' || p.facing === 'right') ? 'side' : p.facing;
    const animKey = (p.moving ? 'walk-' : 'idle-') + dir;
    if (!spr.anims.currentAnim || spr.anims.currentAnim.key !== animKey) {
      spr.play(animKey);
    }
    spr.setFlipX(p.facing === 'left');
    const pad = this.animPads[animKey] || 0;
    spr.setPosition(Math.round(p.x), Math.round(p.y + FOOT_Y + pad));
    // y-sort with the props: the sprite's bottom edge is the key
    spr.setDepth(100 + p.y + FOOT_Y);
  }

  // The screen is black: swap the area behind it.
  onFadedOut() {
    if (!this.transitioning) return;
    this.transitioning = false;

    let room = null, spawn = null, facing = 'down';

    if (this.debugTarget) {
      room = this.debugTarget === 'undercroft'
        ? new Room(UNDERCROFT_TEST)
        : makeRoom('tavern');
      this.debugTarget = null;
    } else if (this.sim.pending) {
      const pend = this.sim.pending;
      this.sim.pending = null;
      room = makeRoom(pend.to);
      spawn = tileCenter(pend.spawnTx, pend.spawnTy);
      facing = pend.face;
    }
    if (!room) return;

    this.bootArea(room, spawn, facing);
    this.cameras.main.fadeIn(FADE_MS, 7, 9, 12);
  }
}
