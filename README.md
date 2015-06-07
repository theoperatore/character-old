Character
=========

DISCLAIMER
==========

This project is slowly being deprecated and moved to another project located [here](https://github.com/ClockworkMonocle/character). The code in this repo should be considered out of date and deprecated. If you would like to contribute, head on over the above link and make a pull request! 

This repo will remain open for legacy purposes.

---

The goal of this project is to create a digital character sheet for playing Dungeons and Dragons 5th edition that removes the writing, erasing, and printing of paper character sheets. 

It's decent right now with a beta preview [here](http://anpetersen.me/character/), but still needs some work! It currently uses Firebase as the backend.

Eventually this will be included in a larger project aimed at helping custom campaign crafting.


## TODO / Bugs

Fix / Do now:

- ~~Traits / Info / Saving throws close on save~~
- ~~Add tent to Glyphicons?~~
- ~~Resistences in defenses pane under saving throws~~
- ~~hit dice -- figure out how they really work: roll + CON mod.~~
  - ~~long rest gives _some_ hitdice. get up to half hitdice total.~~
  - ~~remaining / total~~
- ~~spells slots be it's own block, not in spell list~~
  - decide if slots to be like class charges, or interwoven with associated level
- ~~prepared spell toggle~~
- ~~editing money~~
- ~~Switch to computing all scores on state updates, don't use score (allow character updates to trigger true re-renders)~~
- ~~Should prolly use React Immutability Helpers...~~ (switched to Immutable.js)
- ~~Switch to translate3d for settings menus~~

Non-Important stuff:

- **Test various layouts for best mobile use** (1mb+ js bundle!!!)
- Nail down data model (WIP)

    
## License 

MIT

