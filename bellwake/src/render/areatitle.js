// BELLWAKE v0.03a - render/areatitle.js
// The area card. Every room loads with its name over the scene:
// THE DROWNED ANCHOR / Wickharbor, WICKHARBOR / Orsail. System serif
// (Georgia) so nothing is fetched - the game stays zero-network -
// letter-spaced with thin spaces for an engraved feel, fading in,
// holding, fading out, then cleaning itself up.
//
// Depth 900: above the lighting overlay (800) and its glows (801),
// so the card stays readable in a dark room.

import { TILE } from '../sim/room.js';

const DEPTH = 900;
const FONT = 'Georgia, "Times New Roman", serif';
const FADE_IN_MS = 500;
const HOLD_MS = 1700;
const FADE_OUT_MS = 700;

// hair-space letterspacing without any web font machinery
function spaced(text) {
  return text.split(' ').map(w => w.split('').join('\u2009')).join('   ');
}

export class AreaTitle {
  constructor(scene, room) {
    this.scene = scene;
    this.objs = [];
    this.timers = [];
    this.tweened = [];
    this.gone = false;

    const title = (room.title || '').trim();
    if (!title) return;

    const W = room.width * TILE;
    const H = room.height * TILE;
    const cx = W / 2;
    const cy = H / 2;

    // title, subtitle, and thin rules above + below; each bit fades
    // to its own resting alpha
    const bits = [];

    const t = scene.add.text(cx, cy - 10, spaced(title), {
      fontFamily: FONT,
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#e8dcc0',
      align: 'center'
    }).setOrigin(0.5).setDepth(DEPTH).setAlpha(0);
    this.objs.push(t);
    bits.push({ obj: t, alpha: 1 });

    if (room.subtitle) {
      const s = scene.add.text(cx, cy + 16, room.subtitle, {
        fontFamily: FONT,
        fontSize: '14px',
        fontStyle: 'italic',
        color: '#b0a890'
      }).setOrigin(0.5).setDepth(DEPTH).setAlpha(0);
      this.objs.push(s);
      bits.push({ obj: s, alpha: 0.9 });
    }

    const rw = Math.min(t.width + 56, W - 48);
    for (const ry of [cy - 36, cy + 36]) {
      const rule = scene.add.rectangle(cx, ry, rw, 1, 0xe8dcc0)
        .setDepth(DEPTH).setAlpha(0);
      this.objs.push(rule);
      bits.push({ obj: rule, alpha: 0.4 });
    }

    // in, hold, out, gone
    for (const b of bits) {
      this.tweened.push(b.obj);
      scene.tweens.add({
        targets: b.obj,
        alpha: b.alpha,
        duration: FADE_IN_MS,
        ease: 'Sine.easeOut'
      });
    }
    this.timers.push(scene.time.delayedCall(FADE_IN_MS + HOLD_MS, () => {
      for (const b of bits) {
        scene.tweens.add({
          targets: b.obj,
          alpha: 0,
          duration: FADE_OUT_MS,
          ease: 'Sine.easeIn'
        });
      }
      this.timers.push(scene.time.delayedCall(FADE_OUT_MS, () => this.destroy()));
    }));
  }

  // safe any time: the card self-destructs after its run, and the
  // scene calls this on a fast area transition to cut it short
  destroy() {
    if (this.gone) return;
    this.gone = true;
    for (const o of this.tweened) this.scene.tweens.killTweensOf(o);
    for (const e of this.timers) this.scene.time.removeEvent(e);
    for (const o of this.objs) o.destroy();
    this.objs.length = 0;
    this.timers.length = 0;
    this.tweened.length = 0;
  }
}
