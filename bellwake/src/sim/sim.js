// BELLWAKE v0.03a - sim/sim.js
// The fixed-timestep world. Engine-agnostic: the future co-op server
// runs this file unchanged (bible SS11).
//
// v0.03a: doorways lead somewhere now. A room's def carries an exit
// ({ to, spawn, face }); walking onto an OPEN doorway that has one
// sets sim.pending, and the renderer fades through. A spawn guard
// holds the trigger until the Bellringer steps clear of the doorway
// he arrived through, so a transition can never loop on itself. The
// doorway you arrive in is opened for you: you are standing in it.

import { TILE } from './room.js';
import { moveWithCollision } from './collision.js';

const DOOR_RANGE = 30; // px: how close the Bellringer must stand to use a door

// Contiguous door tiles form one door: a 3-tile doorway is ONE door,
// not three third-doors. (Unchanged from v0.02a.)
function groupDoors(tiles) {
  const doors = [];
  const remaining = tiles.slice();
  while (remaining.length) {
    const group = [remaining.pop()];
    let grew = true;
    while (grew) {
      grew = false;
      for (let i = 0; i < remaining.length; ) {
        const t = remaining[i];
        const adjacent = group.some(
          g => Math.abs(g.tx - t.tx) + Math.abs(g.ty - t.ty) === 1);
        if (adjacent) {
          group.push(remaining.splice(i, 1)[0]);
          grew = true;
        } else {
          i++;
        }
      }
    }
    doors.push({ tiles: group, open: false });
  }
  return doors;
}

export class Sim {
  constructor(room, player) {
    this.room = room;
    this.player = player;
    // Door state lives here, with the world's rules; the renderer
    // draws it. Each group carries the room's exit, if it has one.
    this.doors = groupDoors(room.doors());
    for (const d of this.doors) d.exit = room.exitInfo();
    this.pending = null;     // set once the Bellringer walks through
    this.spawnGuard = false; // true right after arriving in a doorway
  }

  // Closed doors are solid. Open ones are the walkable way through.
  doorBlocks(tx, ty) {
    return this.doors.some(
      d => !d.open && d.tiles.some(t => t.tx === tx && t.ty === ty));
  }

  solid(tx, ty) {
    return this.room.isWall(tx, ty) || this.doorBlocks(tx, ty);
  }

  // The "use" action: open the nearest closed door in range, if any.
  useDoor() {
    const p = this.player;
    for (const d of this.doors) {
      if (d.open) continue;
      const near = d.tiles.some(t =>
        Math.hypot(p.x - (t.tx * TILE + TILE / 2),
                   p.y - (t.ty * TILE + TILE / 2)) <= DOOR_RANGE);
      if (near) {
        d.open = true;
        return true;
      }
    }
    return false;
  }

  // The open door the Bellringer stands in, or null.
  onDoorway() {
    const p = this.player;
    const tx = Math.floor(p.x / TILE);
    const ty = Math.floor(p.y / TILE);
    return this.doors.find(
      d => d.open && d.tiles.some(t => t.tx === tx && t.ty === ty)) || null;
  }

  // Arrive in a room: swap it in, place the Bellringer, open the
  // doorway he came through (he is standing in it), arm the guard.
  // The renderer calls this after a fade; spawn is a pixel point
  // (room.js tileCenter), facing one of 'down'/'up'/'left'/'right'.
  enter(room, spawn, facing) {
    this.room = room;
    this.doors = groupDoors(room.doors());
    for (const d of this.doors) d.exit = room.exitInfo();
    const p = this.player;
    p.x = spawn.x;
    p.y = spawn.y;
    p.moving = false;
    if (facing) p.facing = facing;
    const tx = Math.floor(spawn.x / TILE);
    const ty = Math.floor(spawn.y / TILE);
    for (const d of this.doors) {
      if (d.tiles.some(t => t.tx === tx && t.ty === ty)) d.open = true;
    }
    this.pending = null;
    this.spawnGuard = true;
  }

  // Advance the world by dt seconds. Called at a fixed 60 Hz by the
  // renderer now, by the server tick later.
  step(dt) {
    const p = this.player;
    let dx = p.intentX;
    let dy = p.intentY;

    if (dx !== 0 || dy !== 0) {
      // Normalize so diagonals aren't faster.
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;
      p.moving = true;
      if (Math.abs(dx) > Math.abs(dy)) p.facing = dx > 0 ? 'right' : 'left';
      else p.facing = dy > 0 ? 'down' : 'up';
      moveWithCollision(
        this.room, p, dx * p.speed * dt, dy * p.speed * dt,
        (tx, ty) => this.solid(tx, ty));
    } else {
      p.moving = false;
    }

    if (p.use) {
      p.use = false; // consumed this step; holding E re-triggers next frame
      this.useDoor();
    }

    // Standing in an open doorway that leads somewhere asks for a
    // transition, unless we just arrived through it. Stepping
    // clear of every doorway re-arms the trigger.
    const doorway = this.onDoorway();
    if (doorway && doorway.exit && !this.spawnGuard) {
      this.pending = {
        to: doorway.exit.to,
        spawnTx: doorway.exit.spawn[0],
        spawnTy: doorway.exit.spawn[1],
        face: doorway.exit.face
      };
    } else if (!doorway) {
      this.spawnGuard = false;
    }
  }
}
