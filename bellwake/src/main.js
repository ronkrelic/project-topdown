// BELLWAKE v0.03a - main.js
// Boot file. The canvas is fixed at 480x272: every room in the world
// is 30x17 tiles (bible SS8), so the buffer never resizes. The scene
// snaps whole-integer zoom to the window (pixels.js does the math).

import { pixelGameConfig } from './render/pixels.js';
import { SceneMain } from './render/scene.js';

new Phaser.Game(
  Object.assign(
    {
      type: Phaser.AUTO,
      width: 480,
      height: 272,
      backgroundColor: '#07090c',
      scene: [SceneMain]
    },
    pixelGameConfig()
  )
);
