Character
=========

The goal of this project is to create a digital character sheet for playing Dungeons and Dragons 5th edition that removes the writing, erasing, and printing of paper character sheets. 

## Features (planned)

including, but not limited to:

- automation of ability score mods, skills, proficiency, etc.
- built-in way of handling attack/damage mods for melee, ranged, spells
- use of Markdown to format descriptions
- custom macro language for adding numbers together?
	- in a description: "Adds [{DEX} + 3] to AC"
	- would resolve, if Dex mod was 3, to: "Adds 6 to AC"


## TODO / Bugs

Fix / Do now:

- ~~Traits / Info / Saving throws close on save~~
- ~~Add tent to Glyphicons?~~
- ~~Resistences in defenses pane under saving throws~~
- ~~hit dice -- figure out how they really work: roll + CON mod.~~
  - ~~long rest gives _some_ hitdice. get up to half hitdice total.~~
  - ~~remaining / total~~
- spells slots be it's own block, not in spell list
- prepared spell toggle
- ~~editing money~~
- Switch to computing all scores on state updates, don't use score (allow character updates to trigger true re-renders)
- Should prolly use React Immutability Helpers...
- ~~Switch to translate3d for settings menus~~

Non-Important stuff:

- **Test various layouts for best mobile use** (1mb+ JS!)
- Nail down data model (WIP)

    
## License 

MIT

