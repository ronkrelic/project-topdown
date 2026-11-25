// BELLWAKE v0.02a - render/pixels.js
// Nearest-neighbor pixel presentation (bible SS8, SS11).
// v0.02a: whole-integer zoom. The canvas is never stretched to a
// fractional factor: it snaps to 1x, 2x, 3x... of the 480x272 buffer,
// so pixels stay square and seams stay crisp at any window size.
export function pixelGameConfig() {
  return {
    pixelArt: true,    // texture filtering OFF: crisp nearest-neighbor
    roundPixels: true, // draw positions snapped to whole pixels
    scale: {
      mode: Phaser.Scale.NONE, // no stretching; zoom is set by the scene
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 2 // initial; scene.js snaps it to the window right away
    }
  };
}

// Largest whole-integer zoom that fits the window. The rule lives
// here, written once; scene.js calls it on boot and on every resize.
export function snappedZoom(gameW, gameH) {
  const z = Math.floor(
    Math.min(window.innerWidth / gameW, window.innerHeight / gameH)
  );
  return Math.max(1, z);
}
