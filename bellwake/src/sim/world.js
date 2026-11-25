// BELLWAKE v0.03a - sim/world.js
// The world registry: every place the Bellringer can stand, keyed
// for area transitions. v0.03a opens with two areas, the Drowned
// Anchor itself and a slice of Wickharbor street outside its door.
// The Undercroft stays parked in data/rooms/undercroft-test.js
// until the delve returns; it is not registered here yet.

import { Room } from './room.js';
import { TAVERN } from '../data/rooms/tavern.js';
import { STREET } from '../data/rooms/street.js';

// Fixed canvas: every room is 30 x 17 tiles = 480 x 272 px.
export const WORLD_W = 480;
export const WORLD_H = 272;

export const WORLD = {
  tavern: TAVERN,
  street: STREET
};

// Look up a room definition by key. A typo in an exit should fail
// loudly on load, not silently mid-play.
export function roomDef(key) {
  const def = WORLD[key];
  if (!def) throw new Error(`[world] no room named "${key}"`);
  return def;
}

// Build a live Room from the registry.
export function makeRoom(key) {
  return new Room(roomDef(key));
}
