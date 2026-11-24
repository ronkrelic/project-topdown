# BELLWAKE
## A gothic-cozy action roguelike RPG — working title

**Designed and Made by Relic & Ember Studios**  
**We wake worlds.**

Design edition: November 24, 2026. Original world and production specification by Ember for Relic & Ember Studios. Relic designs and gut-checks; Ember, the AI half of the two-person studio, builds and writes. BELLWAKE is a working title, not a trademark-clearance claim. This document specifies a proposed game, not an already implemented product.

**One-line pitch:** Ring the drowned kingdom's bells, steal a little peace from the returning sea, and bring enough hope home to keep a harbor village alive.

**Format:** browser-based, top-down 2D fantasy action-adventure roguelike RPG; solo-playable first, cooperative for two to four players later. The creative scale is intimate: wet stone, familiar faces, and an impossible coastline. Persistent shared spaces are a later engineering horizon, not a requirement for the first good evening of play.

### The five pillars

**Read the danger.** An enemy commits to a visible action, the player recognizes an answer, and skill changes the result. A tiny sprite must communicate more clearly, not excuse less readable combat.

**The tide is a choice, not a surprise.** Every expedition has a known deadline. Going deeper is attractive, but leaving early is a valid success. The interface never hides the price of another room.

**Home is worth returning to.** The village grows through recovered bells, practical repairs, new residents, and relationships. Death changes what people say without making them cruel to a learning player.

**Power has a shape.** Weapons, armor, and four currents of bell-magic produce different decisions. Permanent progress mostly opens options; it does not turn the first ten hours into an obligatory damage grind.

**Build the harbor before the ocean.** One village, one complete biome, one boss, and the whole return loop come before online services or enormous populations. Later scale means adding bounded rooms and servers, never one infinite simulation.

All new setting material below is original to this proposal. The real asset inventory constrains presentation, not the world's mythology. Numerical values are initial tuning hypotheses with named tests; they are not measurements of an existing build. Future systems are explicitly deferred rather than presented as functioning menu entries. No part of delivery requires publishing art, changing repository settings, or creating a commit.

## 1. The world and its drowning

### The kingdom that would not mourn

Once, the low kingdom of Orsail kept its dead in sound. Each town owned a bronze bell cast with a little metal from the tools of those it buried: a ferryman's pin, a midwife's needle, a carpenter's square. At dusk, the living rang the names of the newly lost. The old teaching was simple: the sea could take a body, but a person did not become nameless while another person remembered them.

Orsail grew rich by dredging pearl beds and selling safe passage through its reef channels. Its queen, Edrane, lost her only daughter during a storm at the harbor mouth. She ordered every bell to ring until the child returned. For nine nights the kingdom made a sound no sleeper could escape. On the tenth, a figure climbed the palace steps wearing the wet coat of the missing girl. It called itself the Undertide, the keeper of everything that falls beyond recovery.

The Undertide offered a bargain: the child could speak with her mother once each year, if the kingdom accepted that all other deaths must still be mourned. Edrane agreed, then built a machine beneath the royal steeple to hold the visiting voice between visits. The great bells were linked to that machine. Instead of releasing a name into memory, their sound caught it in an ever-growing chorus. Families heard beloved voices again. Sailors paid for another minute with a drowned brother. Grief became a royal service, then a trade, then a necessity.

The sea did not drown Orsail because mourning was wrong. It came because the kingdom refused to let any ending end. When the trapped chorus became louder than the living city, the Undertide withdrew the shore. Water filled the streets before dawn. Edrane's machine still rang below, holding the dead at the instant before departure. The old kingdom has lain drowned for six generations.

Each night the sea draws back for a few hours. People call this the **Ebb**. Roads shine like fish scales; windows empty themselves; stairwells breathe. The retreat is not a normal astronomical tide. It is the Undertide's remaining half of the broken bargain: time in which the living may descend and decide what to do with what they cannot keep. By day, there is only open water.

### The bond of the Bellringers

A sworn order tried to dismantle the machine during the drowning. Its members tied bell ropes around their wrists and promised the sea that no lost name would be abandoned while a ringer remained. The Undertide accepted the promise literally. A Bellringer taken by blade, stone, or tide is returned to the beach at dawn, breathing seawater and remembering the end. The bond restores the person, not their pack, and does not extend to every civilian or animal.

The order is almost gone. Its survivors live in **Wickharbor**, a village on the cliffs above Orsail. They repair ropes, copy tide tables, argue over soup, and go down again. The player is a newly sworn Bellringer whose identity before the oath is chosen through optional dialogue, not an amnesia mystery. They may have been a sailor, a clerk, or a local; these are roleplaying descriptions without exclusive statistical bonuses in the first release.

The great bells have fallen silent. The Drowned no longer settle when the Ebb begins. Recovering a bell does not mean placing a five-ton object in a backpack: the Bellringer retrieves its clapper or name-cylinder, restores the installation below, and marks it for a village salvage team during a later safe window. The team brings home smaller bells physically. Great bells remain rooted in the kingdom and become permanent sounded landmarks.

### Geography and everyday life

Wickharbor has a tavern called the Warm Nail, a bell yard, a smith's lean-to, an alchemy room, a sawmill gantry, and a narrow beach reached by a counterweighted stair. Fishing, ropework, drying kelp, and repairing other people's bad boats keep the place alive. The joke is that everyone in the village owns half a boat and owes someone the other half.

Below lie five planned areas. The **Undercroft** is a network of old burial passages with trapped air beneath the waterline; szadiart's catacomb art makes it the first biome. The **Sluiceward** comprises drowned service streets and cisterns, built from anokolisa dungeon sheets and selected water tiles. The **Knife Reefs** later expose wreck paths and living raider camps. The **Cathedral of Held Breath** houses the largest surviving choir mechanism. The **Deep Steeple** descends rather than rises, ending at the royal machine. The last three require new environment art and are story destinations, not available slice maps.

The bells are not gods and the Undertide is not an evil final boss waiting for a health bar. It is an intelligence with a function, capable of bargaining but not understanding why a short human life wants one more conversation. The central question is whether remembrance must preserve a voice, release it, or change the relationship between the living and the dead altogether.

## 2. Research and the shape of an evening

Research informs decisions without supplying this world's names or plot. The source register in Appendix A distinguishes official descriptions, technical documentation, and our inferences. Exact session targets below are BELLWAKE design goals, not claimed industry averages: the inspected pages do not establish reliable median run lengths for the reference games.

Hades' official material connects fast action with a persistent, progressing story. The lesson is to make return part of authorship: people react to a failed expedition, a discovered inscription, or a brave early retreat. Dead Cells explicitly emphasizes pattern-based enemies, alternate paths, permadeath, and repeated learning. We adopt clear commitments, quick restart, and route choice, not its platforming controls.

The Binding of Isaac: Rebirth's description of randomized action and ability-changing treasure supports a small combinatorial item system. We take that principle, not its enormous item count or exact generation algorithm. Enter the Gungeon foregrounds dodge rolling and dungeon combat. Here the roll crosses a known threat window and leaves a recovery commitment; it does not authorize unreadable projectile carpets in narrow melee rooms.

Top-down Zelda is a spatial reference: enemies and objects make encounters into readable problems. Nintendo's Echoes of Wisdom page emphasizes creative combinations for traversal and fighting. Our “combat chess” means a plate bearer closes one lane while a caster threatens another, with the player choosing which piece to dislodge first. It is a design interpretation, not a claim to have inspected Nintendo's AI implementation.

Soul Knight's official app listing explicitly offers two-to-four-person multiplayer and accessible top-down action with randomized dungeons. It supports our cooperative product shape without prescribing its netcode. Vampire Survivors' official description connects survival, gold collection, and later upgrades. We borrow escalating pressure and clear reward feedback, while rejecting automatic attacks and unlimited enemy swarms for the first slice. Moonlighter's adventurer/shopkeeper premise and Children of Morta's family-centered story reinforce the value of a home loop. Wickharbor is not a full shop simulator or a roster of playable relatives.

A complete single-biome Ebb targets **18–24 minutes active play**, with **3–5 minutes at home**. The vertical slice targets **12–16 minutes active play**. First-time teaching may add five minutes outside the active tide clock. Long-term two-biome expeditions target 24–32 minutes by shortening early rooms rather than merely doubling everything. Record actual completion distributions before locking room count. No source is cited as proof that these exact numbers guarantee retention.

For generation, authored rooms connected by a mission graph give two creators control over fair attacks, exits, and tempo. BSP is useful for partitioning large floor plans but does not itself author a good fight. Wave Function Collapse produces locally coherent patterns, not guaranteed critical-path connectivity or a readable boss approach. Start with room templates; reserve BSP for later corridor experiments and WFC for validated decorative fills. The returning tide supplies variation through route pressure without requiring an infinite procedural world.

### One complete Ebb

The player begins beside the Warm Nail's stove. They choose a Bone mallet, a Water current spell, and one tonic, then hear a short reaction from the village's rope-maker. The departure screen states route, seed, carried kit, tide duration, and the cost of being caught. A practice dummy and a painted dodge lane are available without spending an expedition.

The slice tide clock begins only after the first descent loading finishes. During minutes zero to three, a single Drowned Rattle teaches a marked sweep. Two subsequent rooms add a lunging Nailrunner and a retreat lane. Clearing each chamber grants a small material bundle or a choice of temporary tuning. The map reveals a side crypt with better loot and a longer path. The player can read that cost before committing.

Minutes three to six introduce a Dragwright that tries to pull the player toward a slow hazard. The player sidesteps its locked hook line, strikes during recovery, and takes a relic that improves Crush stagger but lengthens attack recovery. A treasure room gives three choices and a salvage fallback; the game never forces a useless item into the pack. At the first stair landing, a rope lift offers safe extraction. Choosing it is a completed run with banked materials, not a failed boss attempt.

Minutes six to ten bring the lower ossuary and its plate bearer. A bell chamber reveals the missing name-cylinder locked in the Sexton’s mechanism and a sign of deliberate tampering. Inspecting it marks the objective; defeating the boss releases it for extraction. At ten minutes the tide enters its warning phase: a low distant bell, a patterned HUD change, and shallow water in decorative gutters. Collision routes remain unchanged. A pre-boss shelter allows inspection without an ambush, but time continues unless the solo player explicitly pauses.

Minutes ten to thirteen contain the first boss, the Sexton of Silt. It sweeps a wide arc, marks a straight charge, and later seals one side of the arena with a slow rising-water hazard. The player chooses whether to spend the tonic or preserve it, then wins by using the boss's long recovery. Boss victory stops arena hazards, not the sea. A nearby emergency stair opens, with a clearly stated 45-second traversal allowance. The player takes the cylinder and climbs out with enough time to spare.

Back home, the material bag and objective settle once. The recovered cylinder restores the first small bell's name sequence. A smith arrives to inspect its fitting, and the tavern gains a dry corner for a new resident. A faction leader asks whether the bell should be rung publicly. The player can talk, craft, or stop; there is no login-energy gate pushing another run.

The two alternate endings are equally concrete. Death closes combat immediately, records the cause, loses the unbanked pack, and returns the Bellringer at dawn. If the sea reaches the final deadline first, a short tide-taken sequence produces the same loss boundary with distinct dialogue and a different journal record. Safe extraction, death, and tide capture remain different outcomes in statistics and story, even though all return the player home.

## 3. Combat: salt, iron, and commitment

### Shared rules

Simulation advances at 60 fixed ticks per second in logical pixels. Tiles are 16 units. Player movement begins at 80 units per second with normalized diagonals and an 8-by-6-unit feet collider. Sprite size, hurtbox, and weapon shape are separate. Aim is continuous for simulation; Down, Side, and Up animation directions approximate it visually, with mirrored Side art and separately authored weapon offsets.

A player starts with 100 health, 100 resonance, two weapon slots, one current spell, one consumable slot, and six relic sockets. There is no stamina meter initially: attack recovery and dodge cooldown provide commitments. A six-tick input buffer accepts one queued action near recovery end. Holding attack can repeat at the legal rate when the accessibility option is enabled; it cannot bypass recovery. One attack ID may hit the same target once unless a spell explicitly declares periodic damage.

Dodge lasts 18 ticks and moves at 160 units per second. Invulnerability applies on ticks 3–12 inclusive. Cooldown is 48 ticks from activation. Walls stop travel; closed doors and tide boundaries cannot be phased through. Damage grants 36 ticks of hurt immunity, displayed by a restrained outline. The longer of existing immunity and a new immunity window applies; durations are not added together. Dodge cancels the first six startup ticks of a basic attack or begins after its active window, but does not erase every recovery frame.

Physical damage uses **Crush, Pierce, and Slice**, matching the player's real attack animation families. Armor is a declared equipment or structural property, not a hidden species resistance. Successful damage has a minimum of one after one final rounding. Elemental payloads resolve separately and do not inherit physical multipliers.

| Armor class | Crush | Pierce | Slice | Visual and tactical meaning |
|---|---:|---:|---:|---|
| Bare ribcage | 1.25 | 0.70 | 1.00 | Gaps waste narrow thrusts; blunt impact breaks structure |
| Barnacled plate | 1.25 | 1.00 | 0.70 | Heavy shell deflects glancing cuts |
| Ropebound cloth | 0.90 | 1.00 | 1.25 | Exposed lashings reward a cut |
| Unarmored flesh | 1.00 | 1.00 | 1.00 | No starting weapon is secretly required |

Damage equals base physical damage times armor multiplier times capped run modifiers, plus separately resolved current damage. Additive run damage bonuses cap at +50% in the slice. There are no random critical hits. A named icon and tooltip identify armor after the first encounter, while impact sound and a small shape-coded number indicate resistance. No mandatory encounter requires finding one rare damage class.

### Weapons and enemy roles

| Starting weapon | Actual family / action | Base damage | Startup / active / recovery | Purpose |
|---|---|---:|---|---|
| Knucklebell Mallet | Bone / Crush | 24 | 12 / 6 / 24 ticks | 20-unit arc; breaks ribcages and plate |
| Sounding Pike | Wood / Pierce | 17 | 9 / 5 / 17 ticks | 30-unit narrow lane; safe spacing |
| Ropeknife | Bone / Slice | 18 | 8 / 6 / 16 ticks | 22-unit arc; severs cloth bindings |
| Ringer's Fist | Hands / Crush | 10 | 7 / 4 / 13 ticks | 14-unit fallback; never lost |

These are designed gameplay identities for the Bone, Hands, and Wood sets, not verified individual filenames or claims that every named silhouette exists. Select the closest honest export during implementation. If the pike shaft or mallet head is missing, draw a small original overlay instead of relabeling a fist as a spear. Weapon sockets are authored per animation, and the practice yard can display true attack shapes.

Enemy states are idle, acquire, reposition, windup, active, recover, stagger, and dead. Navigation updates at 10 Hz on a cached walk grid, while movement integrates at 60 Hz. The final 12 windup ticks lock aim. An active melee shape never spins to follow the player. A room coordinator allows at most two simultaneous melee windups and one ranged attack in the slice. Waiting enemies seek space instead of stacking invisibly inside a doorway.

The Drowned are people whose final words remain caught in Orsail's old mechanism. Their skeleton appearance is a readable art solution; the fiction does not require realistic decomposition. Their movement is ceremonial rather than feral. Sometimes a defeated one finishes an ordinary sentence: a bread order, a weather complaint, a name. These short lines humanize them without stopping combat for a speech.

| Drowned role / real variant | HP / speed | Armor | Telegraph and attack | Recovery and answer |
|---|---|---|---|---|
| Rattle / skeleton base | 32 / 44 | Bare ribcage | 36-tick arc, 10-damage sweep | 36 ticks; step out, then strike |
| Nailrunner / skeleton rogue | 26 / 64 | Ropebound cloth | 36-tick dotted lane, 12-damage lunge | 42 ticks; sidestep locked direction |
| Dragwright / skeleton shaman | 36 / 30 | Bare ribcage | 54-tick hook line, 8 damage and 20-unit pull | 60 ticks; break line of sight or interrupt |
| Chapel Guard / skeleton warrior | 68 / 30 | Barnacled plate | 54-tick broad arc, 18-damage cleave | 54 ticks; crush or flank |

The Dragwright's net and anchor are separate original effect overlays; they are not assumed to exist in the supplied sprites. Its pull cannot move a player through a wall or into an untelegraphed instant-kill pit. A brief rope line shows the intended displacement. Nailrunner uses rogue art but is not a stealth ambusher: it remains visible and cannot strike from outside the camera.

The living reef people call themselves the **Keld**. Wickharbor calls some of their crews raiders because they seize salvage and cut marked ropes, but they are not a universally evil species. Their islands lost access to fishing grounds when the Ebb changed currents. A Keld captain may negotiate, and the game's journal distinguishes a hostile crew from a whole people. Orc Crew art supplies their silhouettes; all cultural names and motives are original.

| Keld role / real variant | HP / speed | Armor | Telegraph and attack | Recovery and answer |
|---|---|---|---|---|
| Breaker / orc base | 44 / 42 | Unarmored flesh | 42-tick raised marker, 12-damage shove | 36 ticks; deny wall pressure |
| Linecutter / orc rogue | 30 / 68 | Ropebound cloth | 36-tick paired footprints, 14-damage flank dash | 42 ticks; cut off its return lane |
| Brinecaller / orc shaman | 38 / 32 | Unarmored flesh | 60-tick vessel sigil, grants one ally 16-point ward | 60 ticks; interrupt support first |
| Reefshield / orc warrior | 80 / 28 | Barnacled plate | 60-tick lane, 20-damage shield rush | 60 ticks; bait obstacle, punish flank |

Wards last six seconds, never stack, and cannot target the caster. Idle body contact deals no damage. Enemy collision permits gentle separation so crowds cannot permanently imprison a player. The vertical slice ships the four Drowned roles; Keld roles arrive with Sluiceward and a negotiation scene. No living raider drops a magically regrowing civilian identity for a farming economy: defeated crew members retreat or are treated abstractly in the same encounter rules, without a loot incentive to target peaceful residents.

### Missing attack animation is a production fact

The inventory establishes Idle, Run, and Death coverage for the enemy crews, not full attack sets. Prototype an attack using a held pose, a two-pixel anticipation lean, a separately drawn weapon or rune, a fixed ground preview, and a recoil pose. Hit timing lives in simulation data and never depends on an art tween ending. These transformations are a declared prototype treatment, not nonexistent frames attributed to an artist.

Before public release, create distinct windup, strike, and recovery silhouettes for all shipping roles. Keep Up, Down, and Side readable. A telegraph drawn behind a wall is not a fair warning; occluded threats must reposition or expose a visible floor marker. Death collision ends immediately on the confirmed dead event, while the Death animation may finish harmlessly. Blood, bone particles, and screen shake are decorative and individually reducible.

### First boss: the Sexton of Silt

The Sexton maintained Orsail's municipal burial bell. Its name-cylinder jammed on a list of unpaid burial fees, leaving it unable to finish the service. It now treats every visitor as another unfiled death. The joke is sad rather than mocking: a bureaucracy continued working long after the clerks drowned. Defeating it frees the cylinder, not a fragment of a god.

Prototype with skeleton warrior art and a unique bell-cage overlay; final presentation needs an original headpiece and tool silhouette. The 28-by-20-tile arena has four solid coffins, two wide circulation lanes, and no hidden pit. Baseline health is 720, movement 28 units per second. Target first successful combat time is 90–150 seconds, measured from actual attack uptime rather than nominal damage alone.

Above 65% health, Grave Sweep marks a 100-degree arc for 54 ticks, deals 20 damage over a six-tick active window, and recovers for 54 ticks. Ledger Charge marks a three-tile lane for 60 ticks, deals 18 damage once, then leaves 60 ticks of recovery. Charge cannot immediately repeat. The arena's coffins break the charge but do not delete its warning.

At 65%, a 90-tick transition clears hostile projectiles, retracts hazards, and closes the Sexton's bell-cage shield visibly. It moves to the center without contact damage. Phase two adds Silt Ring: a 72-tick floor preview followed by an expanding ring with a four-tile gap aimed toward reachable floor. One hit deals 16 damage. Two Rattles may emerge from marked coffins at most once every fifteen seconds; the living summon cap is two, and summoned enemies grant no permanent currency.

At 30%, summoning stops. The Sexton floods one marked third of the arena after a 90-tick preview, leaving two-thirds available. This local magical hazard deals eight damage per second with ordinary hurt immunity; it is distinct from the run-ending global tide. The boss alternates Sweep and delayed Charge with at least 30 escape ticks between active threats. Warnings never become faster than the player learned. Death retracts the arena water, settles the boss state once, and opens the emergency stair. The run clock continues so victory and escape remain separate achievements.

## 4. The Ebb, generation, and the climb out

### A clock that the player can reason about

The slice has a sixteen-minute active tide budget, with an expected successful run of twelve to sixteen minutes. The first complete single-biome release uses twenty-four minutes. At 60 Hz these are simulation deadlines, not wall-clock deadlines during a paused solo game. Loading, dialogue at home, and explicit solo pause do not consume the tide. Opening the inventory alone does not pause unless the player uses the visible pause control; the distinction is consistent and explained.

The first 60% of the budget is Low Water. From 60% to 85%, Rising brings gutter water, a low bell, and route-cost emphasis. From 85% onward, Last Bell adds a persistent directional exit marker and stronger shoreline sound. At 100%, an announced five-second grace sequence allows a player already on an exit interaction to complete it; otherwise the tide takes them. The grace is not a hidden extra loot period and is identical for every run. Story mode can extend the budget by 25% without changing rewards.

Tide pressure first changes information and opportunity, not movement speed. Mandatory routes do not silently seal while the player is below. Optional lower treasure alcoves may close at Rising only if labeled before entry and if their exit remains traversable. No global water effect becomes a surprise instant kill. The map estimates return time from graph distance and known stair traversal, with a conservative safety margin; it says “estimate,” not a false guarantee during combat.

### Rooms before algorithms

Generate a mission graph, attach authored Tiled rooms through compatible door sockets, then select validated encounters. The slice contains twelve rooms across two depth bands: entry, six combat rooms, treasure, a lift landing, optional elite, pre-boss shelter, and boss. Four combat rooms lie on the critical route; two join the elite branch. The landing appears before the lower band and always offers a climb out. After the boss, a shorter emergency stair opens so the return is tense without forcing a tedious full backtrack.

Start with sixteen templates, including alternate combat layouts and two landing arrangements. Each stores dimensions, socket directions, encounter budget, spawn slots, cover, allowed enemies, and estimated travel cost. Do not rotate art blindly: a coffin, wall face, or stair may only support its authored orientation. Environment art has no authority over combat collision until a designer marks it in the map data.

The Undercroft uses szadiart walls, floors, doors, stairs, coffins, candles, torches, and spikes. It is dry because ancient pressure gates and trapped air hold back standing water during the Ebb, not because the kingdom is inexplicably above sea level. Sluiceward later uses anokolisa dungeon and selected water tiles for narrow streets, cistern edges, and maintenance channels; full coastal exteriors need extra art. Water art alone is not a working fluid simulation. Deep water is a clear blocked boundary until swimming has its own design.

Use a seeded 32-bit PRNG with independent streams for topology, encounter selection, loot, and decoration. Store seed, generator version, content manifest hash, and depth band. Cosmetic torch flicker never consumes combat random values. Validate connectivity, door pairing, spawn clearance, exit reachability, boss access, and a conservative maximum return distance. Retry up to eight deterministic candidates, then use a known-good fallback layout and log why it was selected.

### Encounters and rewards

Threat costs are Rattle 1, Nailrunner 1.5, Dragwright 2, and Chapel Guard 2.5. The first fight costs 1; later upper rooms cost up to 3; lower rooms range from 3 to 5. At most six ordinary enemies are alive simultaneously. Staged reinforcement requires a marked entrance and never spawns within two tiles of the player. Lower-band health is multiplied by 1.15 and damage by 1.10. Rising tide does not secretly multiply every enemy statistic; it makes the remaining time valuable.

Elites receive one named rule plus 40% health. “Keelbound” resists knockback. “Afterknell” leaves one delayed floor pulse after a heavy attack. Their preview badge names the rule, and neither can appear in the tutorial room. Do not stack speed, regeneration, and extra projectiles on the first elite. Treasure rooms offer three distinct relics or a small material salvage payout. A dead-end branch advertises its approximate room cost before the player commits.

Spikes preview for 48 ticks, rise for 30, and rest for 90, with a safe alternate lane in Normal. Every combat spawn has room to dodge, no blocked feet position, and no immediate ranged line from outside the camera. A renderer can fade foreground arches, but it cannot excuse illegible attack geometry. Room clearing removes hostile residual projectiles before creating a reward on safe ground.

The generation test suite runs ten thousand seeds for each released generator version, storing failures as fixtures. It checks graph reachability, no rewards under blockers, no spawn overlap, and exit-distance budget. Human playtests then check boring backtracking and encounter readability, which automatic connectivity cannot measure. Record fight time, traversal time, damage source, optional-room choice, and remaining tide on extraction. Remove repetition before speeding every enemy to hit a session target.

## 5. Death, ranks, and Wickharbor's growth

### What the sea returns

The bond gives a Bellringer continuity, not invulnerability. A death summary names the last two damage sources and one useful counter, then offers an immediate dawn return. Tide capture has a separate summary showing the last safe exit passed and remaining route distance. Neither displays mocking text, a repair bill, or an escalating failure tax. The player may skip the beach animation after seeing it once.

| State | Death or tide capture | Safe extraction | Next Ebb |
|---|---|---|---|
| Health, resonance, cooldowns | Discarded | Discarded | Starting values restored |
| Temporary relics, weapon rolls, spell tunings | Lost | Salvaged only by explicit rule | Fresh build |
| Unbanked materials and bell objective | Lost; objective returns to its source next run | Banked exactly once | Village store retained |
| Witnessed inscriptions and journal facts | Kept | Kept | Remain readable |
| Recipe already recorded | Kept | Kept | Starting option available |
| Rank marks from first discoveries | Kept immediately | Not paid twice | Profile total retained |
| Restored bells, buildings, residents, dialogue flags | Kept | Kept | World state persists |
| Active run snapshot | Closed permanently | Closed permanently | New seed |

The name-cylinder is restored to its boss source after a failed escape; the world does not contain duplicate canonical bells. A boss defeated once may return as an unsettled echo on subsequent expeditions until the bell is restored, with a journal explanation. Once the bell is settled, repeat challenges are framed as resonant rehearsals and grant ordinary materials, not endless copies of the story objective. This prevents procedural repetition from contradicting permanent village change.

Rank marks come from new charted rooms, unique inscriptions, restored bells, and quest conclusions, not repeat kills. Suggested cumulative thresholds are Wickbearer 0, Sounder 20, Ropetender 60, Bellhand 130, Shorewarden 240, Deep Listener 400, and Last Ringer 650. These ranks are original order traditions, not character classes. Wickbearer starts with the training kit. Sounder unlocks one extra material slot. Ropetender opens optional chart routes. Bellhand grants a tuning preset. Shorewarden adds a cosmetic rope knot and advanced trials. Deep Listener unlocks late narrative work. Last Ringer is a title for completing the order's central oath, not an infinite damage multiplier.

Only the first two ranks are realistically earnable in the slice. Display later traditions in a journal essay rather than functional-looking locked buttons promising unavailable content. Repeated successful runs grant a small crafting income, but failure cannot be optimized into a better permanent reward rate than safe extraction. Keep raw health growth capped at a single optional +10-health comfort upgrade; offer an unmodified challenge profile for players who want a stable baseline.

### A village repaired by useful work

At first, Wickharbor contains the Warm Nail's usable common room, a bonfire, the bell yard, a rope lift, and two active residents. The first extracted material bundle repairs a furnace. The first recovered bell fitting brings a smith. Restoring the first bell opens the anvil, lights a dry tavern alcove, and attracts an alchemist. A later bell repairs the sawmill gantry and adds beds. Growth is keyed to achievements and banked supplies, never to deliberately accumulating deaths.

Promote only the required HOLD assets: tavern folk, a few citizens, knight/rogue/wizard archetypes, anvil, furnace, alchemy bench, sawmill, cooking or bonfire set, and selected village pieces. HOLD means preserved for later use, not permission to assume all those files are ready in the runtime folder. Village mockups guide composition but are not playable maps. Keep trees and broad outdoor dressing for a later visual pass. A compact cliff shelter can work before an entire exterior village is authored.

The furnace turns three scrap into one iron cake. The anvil spends two cakes and one bone fitting to unlock a weapon pattern. Alchemy combines two herbs and one saltglass into a starting tonic recipe. The sawmill later converts driftwood into roof and lift repairs. Cooking offers one departure meal choice, not a permanent stack of overlapping buffs. Crafting is immediate, previews the cost, and commits atomically; no real-time timers or idle queues in the slice. Recipes are permanent options, while expedition gear remains temporary.

The knight sprite represents **Tamsin Rook**, a former stair guard who teaches safe spacing and is terrified of deep water. The rogue becomes **Pell Vetch**, a rope surveyor who can estimate a return route but routinely loses his own keys. The wizard represents **Doctor Ossa Fen**, a practical almanac keeper who insists that magical phenomena be measured before being named. Tavern folk and citizens become original residents with modest schedules in authored scenes, not a promised autonomous life simulation.

A first bell should change at least three observable things: one practical service, one resident's circumstance, and one sound in the village mix. This gives recovery emotional weight without building housing simulation, farming, or a complex economy. The harbor never becomes so sprawling that reaching the next expedition takes longer than preparing for it.

## 6. Three village voices and a three-act story

### Factions with something worth hearing

The **Choir of the Open Door**, led by **Cantor Meret Vale**, believes each restored bell should be rung in its full old sequence. Meret was raised by a grandmother who could still sing a drowned relative's kitchen songs. She wants the kingdom awake because forgetting feels like a second drowning. Her quests recover names, protect burial instruments, and restore public ringing. A Choir expedition modifier grants stronger resonance recovery after a clean room but introduces one additional ceremonial encounter. It is opt-in and listed before departure.

The **Quiet Ledger**, led by **Iven Sere**, keeps the names of those who never received a proper farewell. Iven is a former salvage assessor who discovered that families had been charged rent for preserving a dead voice. The Ledger wants the mechanism dismantled and the dead released, but not erased. Its quests return personal objects, document exploitation, and perform brief closing services. Its modifier offers fewer enemies and less temporary loot, with more inscriptions and no reduction in story access. It is a different purpose for a run, not an easy-mode moral judgment.

The **Lantern Quay Company**, led by **Director Bera Flint**, finances lifts, food imports, and salvage rights. Bera's accounts really do keep Wickharbor fed; she is also willing to patent grief if nobody stops her. The Company wants predictable Ebb windows and ownership of the bell network. Its modifier adds a timed cargo objective and better bankable materials while reserving a share of that run's bonus payout. The departure screen shows the exact share; ordinary objective rewards are not secretly taxed.

All three can tell the truth selectively. Meret underestimates the dead's wish to leave. Iven can mistake silence for consent. Bera treats the survival of a balance sheet as proof that a system is humane. No faction owns the only viable weapon family or permanently bars the player from core story. Early tasks may be completed for all three. Later commitment is an explicit story choice with a journal summary of consequences, not a hidden reputation threshold triggered by selling ten herbs.

### Act One: The First Answer

The player swears the shore bond, learns the Undercroft route, and recovers the Sexton's cylinder. The first restored bell settles a small group of Drowned for one night, proving that ringing can help. It also speaks an unfinished line in a living child's voice. The village divides over whether that is a miracle, a malfunction, or a warning. The act ends when the player finds evidence that somebody recently altered the cylinder, not six generations ago.

Meret asks for a full ringing, Iven requests a transcription before anything sounds, and Bera offers the tools for both in exchange for salvage access. The player can choose an immediate practical response without locking an ending. The tampering was done by a desperate former Bellringer trying to speak to a drowned partner. This individual is responsible for a harmful act without making grief itself the villain.

### Act Two: The Borrowed Choir

Sluiceward and the Knife Reefs reveal that the great bells are not simply broken. They have been diverted into the old machine's growing store of held voices. Keld crews have been removing bronze fittings to stop a new current that is destroying their homes. A negotiated passage can reduce one hostile route and reveal a reef rescue; violence remains possible but is not the only source of progression.

The player reaches the Cathedral of Held Breath and hears testimony from dead people who disagree with each other. Some want release, some fear it, and some want to warn living descendants. The Undertide explains its bargain without claiming moral perfection. The queen's daughter, preserved as a repeating voice, asks the player not to mistake a perfect recording of love for a living person who can change. The act ends with the discovery that every complete bell sequence currently strengthens the royal machine even while calming local dead.

This reversal does not make earlier help meaningless. A settled burial chamber really is safer, and a recovered name really mattered. It changes the cost of repeating an action without understanding its destination. New quests ask the player to separate local comfort from centralized captivity. Each faction must revise its position or reveal why it cannot.

### Act Three: The Shore We Choose

At the Deep Steeple, the player can reroute the restored bells. The final decision has three original visions rather than a simplistic good/bad slider. It depends on documented preparations, but no ending is locked behind an undisclosed collectible count. The Almanac shows which practical work remains and offers a return route before commitment.

**Open the Kingdom:** reconnect the great bells and give the held voices bodies of salt and borrowed time. Orsail returns during each Ebb as a city of living and dead together. This fulfills Meret's hope but creates a society whose nights must be sustained carefully; the dead cannot simply take back homes occupied by descendants. The epilogue centers on consent, new law, and the work of coexistence rather than declaring resurrection free of consequence.

**Finish the Farewell:** dismantle the holding machine after copying its names into a public record. The dead leave, the Ebb gradually becomes an ordinary tide, and the Bellringers' return bond ends after a final safe homecoming. Wickharbor becomes a fishing harbor and memorial town. This is not annihilation of identity: names, stories, and changed lives remain, while the player accepts that a future death will be final.

**Keep an Open Shore:** distribute the network into small, locally governed bells and break the machine's monopoly. A dead person may answer once, refuse, or depart; no one may be kept by purchase or royal command. The Ebb remains shorter and less predictable, and the village must share stewardship with the Keld. This third path requires trust-building and a new bell protocol, not a secret golden ending that grants every wish. It preserves contact but surrenders certainty and profit.

The solo campaign records its chosen ending in a separate completed chapter. Repeat expeditions thereafter are explicitly pre-ending recollections or challenge rehearsals, so an ending that ends immortality does not casually restore it for loot. Shared online spaces later use a declared chapter state and avoid letting one player's ending rewrite strangers' worlds without consent.

### Narrative delivery and scope boundary

A conversation scheduler stores speaker, prerequisites, priority, one-shot status, minimum spacing, and alternative lines. On arrival, show at most one automatic short exchange: urgent consequence first, then quest conclusion, relationship beat, optional lore, ambient repeat. Other residents receive small markers. Skipping dialogue preserves the journal summary and never blocks the gate. A first-time winner gets different text from someone who died; the script must not invent experiences.

A sample original exchange captures the tone:

> **Pell:** “I marked the way back with excellent rope.”  
> **Ossa:** “You marked it with my washing line.”  
> **Pell:** “Then it will be both safe and surprisingly fresh.”

The slice contains awakening, one first-return variation for each outcome, the cylinder discovery, the first bell service, and three faction responses. Later acts are fully outlined here but are not included in the vertical-slice production count. Companions, romance, autonomous schedules, dynamic ecology, and global village attacks are deferred. Authored dialogue flags are not advertised as a simulated living world.

## 7. Items, loot, and the four currents

### A small economy with clear borders

The run bag has eight material slots, stacks of 99, two weapons, one active current spell, one consumable stack of three, and six relic sockets. Sounder rank adds one material slot. Auto-pickup gathers eligible materials and run tokens within 24 units after combat; it never replaces a weapon automatically. A full bag leaves the object visible and offers a compare or discard flow. Nothing vanishes because a tooltip covered it.

Definitions own stable IDs, names, descriptions, icons, armor or weapon tags, and affix pools. Instances own generated IDs, rolled values, source run, and temporary modifiers. Save IDs, not translated labels. The Clockwork Raven atlas supplies reviewed icon regions for scrap, bone fitting, herb, driftwood, iron cake, saltglass, and recipes. Similar icons need different silhouettes or border symbols as well as color.

| Source | Proposed reward | Protection against empty or useless outcomes |
|---|---|---|
| Ordinary room | 60% materials, 25% run tokens, 15% minor tuning | First clear guarantees a material bundle |
| Treasure | Choose one of three relics or salvage | Exclude equipped duplicates before rolling |
| Elite | Weapon offer plus two materials | Match at least one carried family |
| Lift landing | One 25-health flask and exit access | Flask usable once; no surprise ambush |
| First boss escape | Cylinder, recipe choice, 20 rank marks | Story payout once per profile |
| Repeat boss escape | Materials and a small token conversion | No duplicate bell objective |

Run tokens buy temporary supplies at a later optional vendor; they convert at a stated low rate on safe return and vanish on failure. Rank marks are not currency. A blueprint recorded on discovery persists, while a physically carried bell objective requires extraction. This distinction is shown by a journal-seal icon versus a bag icon and explained on the first pickup.

Relics change decisions. **Longhaft Knot** adds six units of pike range and three recovery ticks. **Dry Wick** grants a 12-point shield after a no-damage room and loses it on the next hit. **Mourner's Thumb** widens Water's slow field but raises its resonance cost. **Cracked Clapper** improves Crush stagger but makes its warning sound louder, drawing one extra repositioning enemy without creating offscreen attacks. **Shoreglass Bead** refunds five resonance after dodging through a marked attack, at most once every three seconds. **Patient Bronze** adds four physical damage to the first attack after two seconds without attacking, rewarding deliberate spacing rather than button spam. The slice ships six relic definitions and one pair interaction, not hundreds of uncontrolled modifiers. A relic's disadvantage is visible before selection.

### The Almanac and bell-magic

The order's **Almanac** records tides, names, equipment, and recipes. The craftpix animated spellbook is its visual body. Its Fire, Water, Air, and Earth themes become four original currents of bell-magic, not borrowed schools from another setting. Bell sound gives a current a shape; resonance pays for its use. Icons are menu art, while projectiles and floor effects need new original VFX.

| Current | Meaning | Initial spell specification | Release scope |
|---|---|---|---|
| Fire — Hearth | Warmth, warning, preserved ember | Cinder Note: 25 resonance, 14 damage, 120-unit/s dart, 1.2s lifetime | Slice |
| Water — Undertow | Weight, memory, yielding | Lowwater Seal: 30 resonance, 24-unit circle, 30-tick preview, 8 damage, 25% slow for 2s | Slice |
| Air — Breath | Distance, voice, carried force | Borrowed Gust: 25 resonance, 40-unit cone, 12-unit push, no pit executions | Second-biome release |
| Earth — Keel | Structure, endurance, anchoring | Keel Mark: 35 resonance, 20-point shield for 4s, reduced movement by 10% | Second-biome release |

Resonance regenerates at eight per second after two seconds without casting. Boss slows have half strength and at most one-second duration. Spell cooldown is six ticks beyond the cast animation, while resonance remains the main frequency limit. Casting cannot cancel an active physical attack for free. A spell has a preview shape, source actor, sequence ID, lifetime, collision rule, and explicit friendly-fire policy; friendly fire is off in cooperative PvE.

Fire hitting a Water-marked target consumes the mark and creates Steam for two seconds, dealing four damage per second in a 20-unit area. The effect renders behind all danger markers and never blinds the player. Water plus Earth later creates a short Mud Bind, but bosses cannot be rooted and receive a brief slow instead. Air plus Fire can extend a cone at increased cost only after testing. Reactions have a one-second per-target lockout and cannot recursively trigger themselves. An impressive effect that destroys readability is a failed effect.

The book has four practical tabs: Equipment, Currents, Chart, and Names. Left page selects; right page explains and acts. Equipment compares damage class, armor matchups, timing, and reach. Currents shows cost, targeting shape, interaction, and cooldown. Chart marks discovered rooms, lift locations, estimated return cost, and tide state. Names distinguishes witnessed statements from faction interpretations. The animated cover lasts at most 300 milliseconds and can be disabled.

## 8. Art and sound direction

The target is sixteen-pixel top-down fantasy, rendered nearest-neighbor with integer scaling. Use a 480-by-270 logical viewport, centered with letterboxing where needed. Larger monitors do not reveal more tactical map area. Sprite cells may exceed a tile; measure sheet bounds and feet anchors rather than slicing every image into arbitrary sixteen-pixel cells. Keep pixel positions crisp while camera smoothing occurs through carefully rounded render coordinates.

Anokolisa establishes player proportions and creature motion. Szadiart establishes Undercroft architecture. Craftpix supplies the Almanac's warm illuminated presentation. Clockwork Raven supplies compact item symbols. Cohesion comes from value hierarchy, restrained saturation, consistent outline weight, and shared lighting, not destructive blanket recoloring. Preserve masters, derive adjusted exports, and record their origin. Catacomb stone stays cold blue-gray; candles and windows are amber; wet surfaces reflect sparingly. Cozy rooms feel warmer, not simply brighter than every telegraph.

Gameplay previews use shapes and contrast: hatched arcs for sweeps, dotted lanes for thrusts, concentric outlines for pulses. Friendly interactions use a consistent glyph. Foreground arches fade when they cover the player or an active attack. Fog, rain, screen shake, and splash particles never obscure feet or safe gaps. No water shader is required for the slice; a few animated edge tiles can carry the mood at lower cost.

The missing-art list is explicit: HUD bars and slot frames; enemy attack silhouettes; the Sexton's unique bell cage and tool; drag hooks and nets; dodge smear, current spells, steam, impacts, tide capture, rope-lift effects; cliff/coast transitions; and any weapon overlay the existing families lack. Prototype with simple geometry, then replace the shipping set. Enemy Death frames do not prove attack coverage, spell icons do not prove spell animation, and a village mockup is not a map.

The inventory did not establish separate editable font binaries. Preview text images and references to Digital Disco do not grant a webfont license. Begin with a readable system font for interface text and acquire a separately licensed display font only if it remains legible and embeddable. Small decorative runes may be images; essential instructions may not.

All audio is a new production need. Start with two core pieces: a two-minute Wickharbor theme built around muted strings, a small bell, and breathy reed; and a two-minute delve loop with a sparse percussion layer that can intensify during Rising. A short boss variation reuses the delve harmony, with one original transition cue and a victory cadence. This is a realistic first music scope, not a promise of a regional orchestra or voice cast.

Create about twenty sound events: three swings, three impacts, dodge, hurt, death, two enemy warnings, two casts, spell impact, pickup, door, book open/close, lift, bell restoration, and tide warning. Limit simultaneous voices, prioritize danger cues, and give master/music/effects controls. Audio begins after a browser user gesture. Every essential sound has a visible equivalent; captions identify the final tide warning. The village mix gains one quiet bell tone after restoration, making progress audible without repeating a full fanfare every visit.

## 9. UI, controls, and access

Recommend WASD plus mouse aim because independent movement and aim suit retreating, lane attacks, and future co-op. Left click attacks, right click casts, Space dodges, E interacts, Q swaps weapons, 1 uses a tonic, Tab opens Chart, B opens the Almanac, and Escape pauses solo or closes the top overlay. Suppress scrolling and context menus only while gameplay has canvas focus. A return click after focus loss resumes, rather than immediately swinging a weapon.

Keyboard-only parity uses WASD movement, arrow-key aim, J attack, K cast, Space dodge, E interact, and Q swap. Without a held aim key, retain the last deliberate direction. Optional narrow-cone aim assistance selects only visible targets and locks during committed attacks. Rebinding detects conflicts and supports reset. Controller support is a later milestone requiring its own menu and aim tests, not a falsely complete launch feature.

HUD priorities are health with a number, resonance, dodge readiness, current weapon/class, spell, tonic count, material capacity, and the tide. The clock displays remaining time and named phase; it never relies on blue turning red. A directional lift marker appears at Last Bell and can be enabled earlier. Boss health is separate from the tide and never covers the safe arena gap. Floating loot notices combine repeated materials and can be disabled.

The Almanac uses an accessible HTML text layer over the canvas. Keyboard focus order is stable, descriptions can be selected, Escape closes, and reopening restores the last tab. A visible Pause button suspends solo simulation; the book alone leaves the clock running. Multiplayer menus state that the world continues. Shared pause requires unanimous agreement in a safe room and is not implemented by freezing one client's renderer.

Interaction priority is reward, exit, station, then dialogue. If two objects overlap, show a small choice list rather than activating both. Extraction confirmation shows banked rewards, lost temporary effects, and completion state. There is no modal confirmation for every herb. A held key from opening the book cannot immediately purchase a recipe. The first tutorial reaches combat in under two minutes and teaches the exit before introducing an elite.

Accessibility release conditions include adjustable text size, high-contrast shapes, color-independent armor symbols, reduced motion, zero shake, flash suppression, hold-to-repeat attack, remapping, readable dialogue, and no required rapid tapping. Story mode uses 0.70 incoming damage, 1.20 player damage, and optionally 1.25 tide time, with the same story rewards. A separate slow-combat solo assist runs at 80% speed; online participants cannot each select a different simulation rate. No option labels the player as lesser for using assistance.

Test menus and journal at 200% browser zoom and with a screen reader. A canvas aria label alone does not make action combat accessible; state remaining limitations honestly. Death and tide summaries have unlimited reading time. Tabs losing visibility pause solo and save safely; online disconnection behavior is announced before joining. No daily obligation, battle-pass countdown, or premium retry belongs in the first design.

## 10. Browser technology and content pipeline

### Engine decision

Recommend **Phaser 3**, initially pinned to the 3.90 release line after a small compatibility fixture, rather than following a floating latest tag. The inspected documentation exposes later versions too, so implementation must use the selected version's API reference. Phaser provides scenes, input, cameras, audio, tilemap support, animation management, and lightweight Arcade Physics suitable for top-down rectangles and circles. Its loader explicitly supports Tiled JSON and Aseprite PNG-plus-JSON data. Those capabilities reduce integration work for a two-person studio.

PixiJS is an excellent rendering engine but leaves more game-level scene, collision, map, and tooling decisions to the team. KAPLAY is attractive for concise prototypes and a small approachable API; the deciding issue is not that it cannot make this game, but that Phaser's documented map and animation pipeline better matches this library and intended production path. A one-room fixture must load Body_A, a catacomb map, a weapon overlay, and a book frame before the engine choice becomes a long-term commitment.

Do not make Phaser objects the authoritative game model. Put movement, collision, damage, enemy decisions, inventory, PRNG, tide state, and settlement in a plain TypeScript simulation package with no DOM, canvas, or Phaser import. Phaser renders snapshots and sends commands. Arcade Physics can support editor/debug prototypes or non-authoritative presentation, but the shipped shared simulation owns gameplay collision through simple AABBs, circles, and swept projectile tests. Two competing physics systems must not both decide whether a hit occurred.

### Proposed project layout

The following is a future implementation layout, not a claim that files were added during document delivery:

- assets/game/anokolisa/original-pack/: selected player, enemies, weapons, dungeon tiles, and props.
- assets/game/szadiart/rogue-fantasy-catacombs/: first-biome environment exports.
- assets/game/craftpix/free-animated-magic-book/: selected book, theme, frame, and icon exports.
- assets/game/clockwork-raven/free-raven-fantasy-icons/: reviewed sixteen-pixel atlas.
- assets/future/: HOLD selections not loaded by the game.
- packages/sim/src/: math, commands, collision, combat, AI, loot, tide, generation, and settlement.
- packages/content/: schemas, room definitions, item tables, dialogue, and manifest.
- apps/client/src/: Phaser scenes, rendering adapters, audio, input, accessible overlays, and local transport.
- apps/server/src/: future authoritative rooms, sessions, snapshots, admission, and persistence.
- tools/: export validation and asset-manifest generation.
- tests/: deterministic fixtures, generation seeds, combat timing, saves, and network impairment cases.

Retain creator subfolders and original provenance. Runtime builds load a small allowlisted manifest, not every image under assets. Masters stay outside public deployment outputs. The supplied audit's earlier counts and path proposals are snapshot evidence, not proof that every destination already exists now. No current repository inspection is needed for this deliverable, and no raw-art publication is authorized.

Aseprite exports pair PNG atlases with JSON frame bounds, durations, and tags. Use stable tag names such as player.crush.down and enemy.rattle.run.side. Preserve trim/source-size offsets so feet and weapon sockets do not wobble. The loader's Aseprite path supports tagged JSON; confirm the chosen Phaser version with a fixture rather than assuming a packed PNG alone contains timing. Where only existing PNG sheets are available, author a sidecar manifest by measured frame bounds instead of inventing JSON that was never supplied.

Tiled rooms use orthogonal sixteen-pixel maps, exported as JSON with explicit collision, door sockets, spawn points, tide-safe routes, reward anchors, and decoration layers. Build-time validation rejects unknown tileset references, missing sockets, unsupported rotation, and spawns inside solid tiles. Keep the craftpix example TMX and its dependencies together as reference; it is not automatically a gameplay room. Collision comes from authored properties, not the brightness of a wall pixel.

### Saves and performance

Use localStorage only for small preferences and a profile pointer. IndexedDB stores versioned profiles, journal flags, banked inventory, and cleared-room suspension snapshots. Write a new record, validate it, then atomically switch the active pointer; retain one previous valid profile. Save schema version and content version separately. Migrations copy before transforming, and unsupported newer saves produce a clear message instead of silently resetting progress. Offer explicit export/import with a checksum; explain that clearing browser data can remove local progress.

Save at departure, cleared room, reward choice, extraction settlement, and dawn return. A run ledger records a unique settlement ID so a refresh cannot pay twice. Solo offline saves are user-controlled and not anti-cheat secure. Later online progression is server-owned in a separate profile namespace; do not automatically upload arbitrary local inventory into a shared economy. A visibility-loss snapshot cannot safely serialize a half-resolved attack, so pause on a tick boundary and resume with the same command queue or return to the last cleared-room boundary with a disclosed policy.

Target 60 rendered frames per second on a modest laptop, with a 16.7ms frame budget and simulation normally below 4ms. These are budgets to measure, not proven device results. Cap active enemies at six in the slice, pool projectiles and particles, cull offscreen decorations, avoid per-frame allocations, and cap device pixel ratio. Keep initial compressed game download near 12MB and first playable interaction under ten seconds on a reasonable broadband connection, excluding user-gesture audio start. Profile before making binary packing or Web Workers mandatory. A reduced-effects mode removes cosmetic fog without changing information.

## 11. Multiplayer in three earned phases

### Phase one: solo, entirely client-side

The local client advances packages/sim and renders its snapshots. Input commands use actor ID, monotonic sequence, intended tick, movement axes, aim angle, and action bits even before a network exists. This command boundary is an architectural seam, not a reason to build online accounts early. Seeded tests and recorded command replays make bugs reproducible. There is no multiplayer button that only opens an empty lobby.

### Phase two: a self-hosted Node.js expedition

Use Node.js with **Socket.IO**, room-based cooperative PvE for two to four players. Socket.IO supplies event transport, connection handling, and server-side room routing; it is not a physics engine, authoritative simulation, or automatic scaling system. The ws package is a leaner standard-WebSocket server option with lower abstraction overhead, but would require more reconnect, heartbeat, room, and protocol plumbing. For this team, choose Socket.IO first and move only if measured bandwidth or CPU justifies a rewrite. Browser clients use socket.io-client, not the Node ws module.

The server owns enemies, positions, hit tests, tide, rewards, and settlement. Clients send intentions, never damage totals or a claimed boss victory. Run a 60 Hz simulation and initially broadcast snapshots at 20 Hz, with 60 Hz client rendering. Accept bounded input rates and reject impossible speed, stale sequence replay, invalid inventory IDs, or actions during cooldown. Quantize positions consistently; do not trust client wall-clock timestamps as authority.

Predict only the local player's movement and dodge presentation using shared simulation rules. Each snapshot acknowledges the last processed input sequence. The client restores authoritative local state and reapplies unacknowledged inputs, smoothing small visual corrections without smoothing collision truth. Remote actors interpolate approximately 100ms behind server time. Limit extrapolation to 100ms, then hold and display a connection warning. Predicted hit sparks are tentative; authoritative damage and loot reconcile by event ID. Never predict a permanent currency award.

Use reliable idempotent events for room transitions, objective pickup, reward selection, death, and settlement. Snapshots may be dropped when superseded. Carry protocol version, run ID, server tick, acknowledged input, entity states, tide deadline, and event references. Send a full baseline on join or reconnect; later snapshots can be deltas against an acknowledged baseline. Start with readable validated JSON; optimize only after packet measurements. Apply message-size limits, per-session rate limits, room membership checks, and bounded queues.

One expedition has one authoritative room owner and one global tide deadline. Scale enemy health by 1 + 0.55 times additional players, and enemy count modestly within tested caps; do not simply quadruple visual clutter. Boss damage stays unchanged initially. Friendly fire is off. A downed player has a 20-second rescue window; a teammate channels E for three uninterrupted seconds. A fully lost player watches until the next safe landing, where one rescue can be offered at a stated group cost. These rules require co-op playtesting and do not replace the solo death bond.

Extraction is a group choice at a safe lift, with a ten-second vote and clear majority rule; a tie defaults to staying until a second confirmation, except Last Bell defaults to extracting to prevent griefing. A disconnected player's character becomes inert and protected for ten seconds, then is removed with its bag held server-side for a 60-second reconnect grace. The tide does not pause. Reconnect tokens remain private, expire, and cannot be used to join another player's identity. No host migration is promised in the first self-hosted build; a server crash restores the last safe room checkpoint without duplicating settlement.

### What runs on the host machine

The implementation milestone supplies a root npm workspace with client, server, shared simulation, and content packages. Runtime dependencies are phaser in the client, socket.io-client for transport, and socket.io plus a schema validator such as zod on the server. Development dependencies are typescript, vite, tsx, and vitest. Pin a supported Node LTS release at implementation time and commit its lockfile then; this document does not guess a future secure patch version.

The deliverable scripts for that milestone are npm ci, npm run dev:lan, npm run build, and npm start. dev:lan launches Vite on 0.0.0.0:5173 and Node on 0.0.0.0:3000, proxying the Socket.IO route through the client origin. A friend on the same LAN opens http://HOST-LAN-IP:5173, enters a short invitation code, and joins the room. The host allows only the required application ports through the local firewall. The literal HOST-LAN-IP is an explanatory variable, not an address to publish or store in a save.

For an internet test, build the client and have Node serve its static files and Socket.IO on the same port. Put that origin behind an HTTPS tunnel that supports WebSocket upgrades; share the tunnel's public game URL and a temporary invitation code. Friends do not install Node. Avoid opening a router port as the default novice path. Restrict accepted origins, use short-lived invites, and shut down the tunnel after testing. CORS is not authentication, and an unguessable-looking room label alone is not access control. These scripts and server files are future implementation requirements, not runnable code included with this bible.

Test two browsers locally, then four devices on LAN, then an internet session with 100ms simulated round-trip latency, 30ms jitter, and brief disconnections. A 1% packet-loss test still matters even though WebSocket is reliable: retransmission creates stalls and head-of-line delay. Record p95 tick time, event-loop lag, snapshot bytes, corrections per minute, and reconnect success. Admission stops before overload, instead of accepting players into a failing process.

### Phase three: shared harbors and horizontal scale

Persistent Wickharbor social spaces need accounts, moderation, privacy, server-owned saves, backups, and abuse handling before a public launch. A gateway authenticates sessions; a matchmaker allocates bounded social instances and expedition workers. A world directory tracks which worker owns a room. Durable profiles live in a database, while transient presence can use a shared adapter or cache. A Socket.IO adapter relays messages; it does not move a running combat simulation or eliminate the need for room ownership.

Start social instances around a measured cap such as 32 visitors, then benchmark. Room workers remain small; zones partition interest so a player receives nearby entities rather than the whole population. Transfer between workers at a doorway uses a signed handoff and one writer for inventory. Persistent transactions require idempotency and a clear failure rollback. Separate public social chapter state from private ending choices.

A Node process has finite CPU, memory, bandwidth, and event-loop time. Multiple processes and machines add independent rooms; they do not make one boss fight infinitely scalable. “Unlimited players” can honestly mean no fixed global account ceiling in the design, with capacity purchased and added sideways. It cannot mean unlimited concurrent nearby actors, zero operations cost, or a promise of thousands per process. BrowserQuest is a useful HTML5/JavaScript and Node precedent with configurable worlds, but its historical runtime and dependencies are not a modern deployment template or capacity benchmark.

## 12. Scope, milestones, and the someday ladder

The vertical slice is one compact village hub, one Undercroft biome with twelve generated rooms, four Drowned roles, one Sexton boss, four starting weapon actions across three physical classes, two current spells, six relics, one reaction, eight material slots, a sixteen-minute tide, all three run outcomes, one restored bell, two earnable ranks, furnace/anvil/alchemy interactions, local saves, keyboard-only parity, and the first narrative sequence. It is solo only. The village may use a few promoted HOLD pieces, not an entire township of unfinished services.

| Version | Delivery | Acceptance gate |
|---|---|---|
| v0.1a | Movement, feet collision, aim, camera | Stable speed at differing render rates; no diagonal boost |
| v0.1b | Crush/Pierce/Slice, dodge, training enemy | Debug timing matches data; all armor matchups testable |
| v0.2a | Four Drowned roles and hazards | Each attack readable without sound or color |
| v0.2b | Room graph, seeds, exits, tide | Ten thousand valid seeds; all three outcomes settle once |
| v0.3a | Sexton and full expedition | Blind testers can identify a punish window and escape |
| v0.3b | Village, first bell, crafting, saves | Reload cannot duplicate materials; return dialogue accurate |
| v0.4a | Art cohesion, sound, access, performance | Missing shipping art replaced; budget measured on target laptop |
| v0.4b | Closed solo slice review | Typical success lands in twelve-to-sixteen-minute target |
| v0.5a | Sluiceward, Keld, Air/Earth | Negotiation and second-biome roles tested; no scope leakage |
| v0.6a | Self-hosted authoritative co-op | Four-player LAN and impaired-network tests pass |
| v0.6b | Tunnel, reconnect, group extraction | Friends join through one URL; no duplicated settlement |
| v0.7a | Cathedral chapter and ending prototypes | Narrative consequences coherent across all paths |
| v0.8a | Full campaign content lock | Entire story playable solo before online social expansion |
| v0.9a | Reliability and accessibility review | Migration, browser, input, and recovery matrix passes |
| v1.0a | Finished bounded game | License clearance, release review, and complete loop verified |

Milestones are gates, not calendar promises. Relic tests each gate from a fresh save and gives a short feel verdict; Ember records failures and fixes the smallest cause before adding systems. Keep a reference command replay for movement, one room, and the boss. A feature cannot pass solely because its code compiles or a screenshot looks convincing.

The someday ladder preserves ambitions without smuggling them into the slice. First come extra routes, challenge modifiers, more bells, controller support, and narrative depth. Next come optional companions and cosmetic pets with their own AI and art budgets. Then come persistent social harbors, player homes, guild-like crews, shared workshops, and a carefully bounded trading economy. Character ancestries or playable Keld identities require original body art and a new cultural design; they are not selectable “races” disguised by recoloring Body_A.

Only after cooperative combat is robust should consensual duels, PvP arenas, or competitive seasons be considered. Large raids, very-large-scale battles, territory control, breeding pets, farming, housing neighborhoods, global ecology, public events, voice chat, user-generated maps, and a shared ocean all sit on the final feasibility tier. Each needs an explicit business and operations case. No seasonal battle pass, paid power, monetized retry, or premium ending is part of this proposal. Funding decisions need separate approval; this document makes no storefront promise.

## 13. Open design questions with proposed answers

**Does the clock punish exploration too much?** Proposed baseline is a generous fixed budget, visible route estimates, an early lift, and optional Story extension. Measure how often players abandon reading or avoid every branch. If that happens, shorten traversal or move lore reading into the Almanac at home before increasing pressure.

**Can a recovered great bell fit the fiction and inventory?** Recover clappers and cylinders, restore great installations in place, and use a marked salvage follow-up for portable bells. The player carries a believable objective, while the village receives a visible consequence. Do not animate a person lifting a cathedral bell because a generic pickup exists.

**Does death cheapen the cost of the sea?** The bond saves Bellringers only; materials, time, and civilian stakes remain real. It should not permanently injure the player or require grinding off a penalty. Dialogue can acknowledge exhaustion without guilt. The ending that ends the bond receives a final safe return and a clearly separated replay mode.

**Why not ring every bell immediately?** Local settlement and centralized captivity can coexist: a correct local service calms a chamber while the old network diverts its voices. The act-two discovery changes understanding, not the truth of every earlier kindness. Show evidence from multiple people rather than making one villain lecture the only source.

**Is the third ending automatically best?** No. Distributed contact costs predictability and demands shared governance; some dead refuse it and some living dislike uncertainty. It offers a different responsibility, not a reward for collecting every trinket. All three endings need sympathetic epilogues and visible costs.

**Can the tide geometry trap someone unfairly?** Mandatory exits stay open until the declared deadline, and optional closures retain outward traversal. Validate route distance and advertise closing alcoves. If a seeded layout cannot satisfy this, reject it. Do not solve a generator bug by calling it roguelike cruelty.

**How much permanent power is acceptable?** Begin with lateral patterns, recipes, convenience, one capped comfort upgrade, and no repeat-kill rank farming. Compare fresh-profile and progressed-profile boss results. If upgrades dominate pattern knowledge, reduce numbers before adding harder difficulty labels.

**Are all apparent visual resources licensed for public delivery?** Not established. Keep a per-pack provenance record and obtain the exact downloaded license and any raw-file redistribution permission before release. Game-use permission is not source-asset hosting permission. No public shipping is approved while those rights remain unresolved.

**How is a shared harbor compatible with private endings?** A public harbor uses a declared campaign chapter; private story instances own irreversible choices. Do not merge incompatible endings into one canonical global event without a new design. Online persistence also requires deciding whether cosmetic account progress crosses private campaigns.

**What would stop multiplayer expansion?** Repeated failed latency tests, inability to operate moderation and backups, or an incomplete solo loop. The correct response is to keep the finished solo game, not disguise infrastructure risk as a content delay. A two-person studio may rationally stop at excellent four-person expeditions.

## 14. Credits and asset-rights register

**Designed and Made by Relic & Ember Studios. We wake worlds.**

Relic: design direction, priorities, playtesting, and final creative judgment. Ember: original world and writing, systems specification, implementation support, and technical research. Reference games are research influences, not source material for characters, dialogue, art, or code. All BELLWAKE names and fiction here are original proposals; title availability and legal clearance have not been verified.

| Creator / pack | Intended use | License summary and unresolved boundary |
|---|---|---|
| anokolisa / original collection | Body_A; Orc and Skeleton crews; Bone/Hands/Wood; dungeon and selected HOLD village/station pieces | Supplied audit reports commercial use and editing allowed from owner context, no asset resale; no pack-specific embedded license established. Obtain original purchase/download terms. Public raw hosting is not automatically covered. |
| szadiart / Rogue Fantasy Catacombs | Undercroft rooms, walls, doors, stairs, coffins, candles, torches, spikes | Audit records commercial/edit permissions and restrictions on resale; flattened import leaves exact license-to-pack mapping uncertain. Retain both bundled texts and recover original provenance. |
| craftpix / Free Animated Magic Book | Almanac, four current themes, frames, selected icons | Audit cites official freebie terms allowing personal/commercial game use and modification; usable art redistribution and source resale restricted, including PNG/JPG. Attribution appreciated. Raw public redistribution remains unresolved. |
| Clockwork Raven / Free Raven Fantasy Icons | One reviewed sixteen-pixel atlas for items and interface symbols | Audit reports commercial modification allowed and credit optional; standalone asset distribution needs permission. Exact free-download terms and public raw hosting need confirmation. |

The extra medieval UI pack stays outside scope because its creator provenance is unresolved and its bundled terms restrict as-is redistribution. Font preview references are not font licenses. The audit is a supplied nine-page review dated November 24, 2026, not a new legal clearance performed for this bible. No art is embedded in the delivered documents, and nothing should ship publicly until rights are resolved. Organizing a file under a folder called vault does not make it private or remove historical public copies.

## Appendix A. Research register and evidentiary limits

Sources inspected November 24, 2026. Descriptions support the observations stated in Section 2; tuning values, enemy numbers, tide budgets, network rates, and project layout are original recommendations, not claims copied from those sources. Store descriptions do not expose proprietary implementation details. A wrong store redirect and unavailable guessed pages were discarded, not used as evidence.

- Hades, official game page: https://www.supergiantgames.com/games/hades/ — action and persistent progressing story; basis for between-return narrative.
- Dead Cells, official site: https://dead-cells.com/ — pattern-based enemies, alternate paths, permadeath, repeated learning.
- The Binding of Isaac: Rebirth, developer/publisher store description: https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/ — randomized action and ability-changing treasures.
- Enter the Gungeon, store description: https://store.steampowered.com/app/311690/Enter_the_Gungeon/ — dodge-roll dungeon combat; no exact roll timing imported.
- Nintendo, Echoes of Wisdom: https://www.nintendo.com/us/store/products/the-legend-of-zelda-echoes-of-wisdom-switch/ — creative spatial combinations; combat-chess application is our inference.
- Soul Knight, official ChillyRoom app listing: https://play.google.com/store/apps/details?id=com.ChillyRoom.DungeonShooter — top-down action, randomized dungeons, and two-to-four-player cooperation.
- Vampire Survivors, official page: https://poncle.games/vampire-survivors — survival, gold, and later upgrades.
- Moonlighter, official publisher store description: https://store.steampowered.com/app/606150/Moonlighter/ — adventurer/shopkeeper duality; harbor interpretation is original.
- Children of Morta, publisher page: https://11bitstudios.com/games/children-of-morta/ — story-driven action and family stakes.
- Basic BSP generation: https://www.roguebasin.com/index.php/Basic_BSP_Dungeon_generation — partition-based floor construction reference.
- Wave Function Collapse, project documentation: https://github.com/mxgmn/WaveFunctionCollapse — local-pattern generation reference, not automatic mission design.
- Phaser loader documentation: https://docs.phaser.io/api-documentation/class/loader-loaderplugin — Aseprite PNG/JSON and Tiled JSON loading; pin version before implementation.
- Phaser tilemap API: https://docs.phaser.io/api-documentation/class/tilemaps-tilemap — map support.
- Phaser Arcade Physics: https://docs.phaser.io/phaser/concepts/physics/arcade — lightweight rectangles/circles for simple top-down use.
- Tiled export documentation: https://doc.mapeditor.org/en/stable/manual/export-generic/ — authoring/export pipeline reference.
- PixiJS introduction: https://pixijs.com/8.x/guides/getting-started/intro — rendering-focused alternative.
- KAPLAY: https://kaplayjs.com/ — approachable game-library alternative.
- Socket.IO introduction: https://socket.io/docs/v4/ — event-based bidirectional transport and transport fallback.
- Socket.IO rooms: https://socket.io/docs/v4/rooms/ — server-side channels for subsets of clients, not simulation workers.
- ws project: https://github.com/websockets/ws — Node WebSocket implementation; browser uses native WebSocket when choosing ws.
- Gabriel Gambetta, authority: https://www.gabrielgambetta.com/client-server-game-architecture.html
- Gabriel Gambetta, prediction/reconciliation: https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html
- Gabriel Gambetta, interpolation: https://www.gabrielgambetta.com/entity-interpolation.html
- BrowserQuest: https://github.com/mozilla/BrowserQuest and https://github.com/mozilla/BrowserQuest/blob/master/server/README.md — historical HTML5/JavaScript experiment with Node server and configurable worlds. Old dependencies are not endorsed.

No exact competitor median run time, guaranteed Node player capacity, deployed multiplayer benchmark, tested browser performance, font permission, title clearance, or full raw-art redistribution grant was verified. Those remain explicit validation work, not hidden assumptions. The supplied asset inventory is the private-chat source for asset and license summaries and has no public document URL attached here.

## Appendix B. Implementation acceptance checklist

A build is ready for slice review when movement is fixed-step, all physical classes follow the matrix, dodge immunity matches debug ticks, and every enemy attack has a visible answer. The generator must preserve a reachable exit, separate random streams, and reproducible versioned seeds. The tide must show its deadline and distinguish safe extraction, combat death, and tide capture. Settlement must survive a refresh without duplicate rewards.

The village must visibly change after the first restored bell, crafting must consume exactly the previewed materials, and dialogue must describe the outcome that actually occurred. Both mouse and keyboard-only controls must complete the loop. Reduced effects must preserve danger information. The book's readable text layer must expose equipment, currents, chart, and names. No nonfunctional online, housing, or seasonal buttons may imply finished systems.

The art manifest must include only selected exports with provenance, no unreviewed font binaries, and no claim that missing enemy attacks are already supplied. Audio warnings must have visual equivalents. Performance targets require measurements, not optimism. Online implementation, when separately approved, must pass four-player LAN, latency, reconnect, room-ownership, and idempotent-settlement tests before a public shared space is considered.

The final creative test is simpler: after one failed Ebb, the player should understand one thing they can do better, care about one person in Wickharbor, and want to hear what the next bell has to say.

**Designed and Made by Relic & Ember Studios. We wake worlds.**
