Language design concerns for DungeonScript
==========================================

I am so lost, so write this.


BUILT-IN AND CANNOT-BE-THROUGHLY-TWEAKED FEATURES
-------------------------------------------------
Which means that there's no point of making language general-purpose for these features.

### DUNGEON MAP
* Two-dimensional maps should always exist
* Series of ASCII characters may represent the map like:
```
####################
#.#...#..#...c#..#>#
#...#.#.##..###..#.#
#.#.###.#..##...##.#
#<#.......##..#....#
####################
```

### DUNGEON MINIMAP
* This is optional, but one cannot througly tweak the feature
* One might be able to customize color

### CAMERA
* There should be a camera somewhere on the map
* This does not necessarily mean that there need to be a player character

### INPUT
* Key bindings for input are pre-defined
* Mouse/touch interaction is supported, but also pre-defined
* There are 6 types of input: UP DOWN LEFT RIGHT ACTION CANCEL

### BASIC LAYOUT FOR MENU & UI DESIGN
* Text and image should be able to be placed on screen with ease
* For the sake of easiness, options are few

### SPRITE SHEET TEMPLATE & SUPPORT
* One never needs to write code to handle sprite sheets
* There is a template for the sprite sheet


NOT-BUILT-IN BUT KINDA-COMMON FEATURES
--------------------------------------
Which means that making language more general-purpose for these features would help enabling diverse game mechanics.

### PLAYER
* Player itself is not defined by default
* One need to create player with coding
* What this means is that the language does not force the game to have just one player character nor a party of maybe four character, nor even no character