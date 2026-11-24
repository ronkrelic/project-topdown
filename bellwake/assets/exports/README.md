# assets/exports/
Build-ready art: spritesheet exports (PNG + JSON pairs).

- Exports mirror the source tree: assets/game/<creator>/<pack>/x.aseprite
  exports to assets/exports/game/<creator>/<pack>/x.png + x.json.
- Sources never ship. Exports are what the game loads.
- PNG + JSON must stay a matched pair; always regenerate them together.
- JSON is the Aseprite atlas format (frame rects + animation tags),
  which Phaser's Aseprite import reads directly.
