// BELLWAKE v0.01a - render/pixels.js
// Nearest-neighbor pixel presentation (bible SS8, SS11).
export function pixelGameConfig() {
  return {
    pixelArt: true,    // texture filtering OFF: crisp nearest-neighbor
    roundPixels: true, // draw positions snapped to whole pixels
    scale: {
      mode: Phaser.Scale.FIT, // v0.02a: snap to whole-integer factors
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 2
    }
  };
}
