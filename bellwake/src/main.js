// BELLWAKE v0.01a - bootstrap.
// Wires the engine-agnostic simulation to the Phaser renderer (bible SS11).
import { Room, TILE } from './sim/room.js';
import { Player } from './sim/player.js';
import { Sim } from './sim/sim.js';
import { BellwakeScene } from './render/scene.js';
import { pixelGameConfig } from './render/pixels.js';
import { UNDERCROFT_TEST } from './data/rooms/undercroft-test.js';

const room = new Room(UNDERCROFT_TEST);
const spawn = room.spawnPoint();
const player = new Player(spawn.x, spawn.y);
const sim = new Sim(room, player);

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#05070c',
  width: room.width * TILE,
  height: room.height * TILE,
  scene: new BellwakeScene({ room, sim }),
  ...pixelGameConfig()
});
