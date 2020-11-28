# Websocket events

## Maps

### Events

* `map-updated` [`map-state`] - receive (full) state of the map


## Players

### Events

* `player-updated` [`player-state`] - receive state of a user (does also fire, when new player joined)
* `player-leaved` [`player-state`] - player leaved the map

### Actions

* `update-color` [`.color:string`] - update color of your player
* `update-name` [`.name`] - update name of your player
* `leave-game` [] - leave the current map/game (same as disconnect)
* `start-game` [] - start game/join map
* `move-player` [`.x:integer, .y: integer`] - move player to some valid location
* `rotate-player` [`.rotation:integer`] - rotate user to a specific deg





## Definitions

### map-state

* `width` [`integer`]
* `height` [`integer`]
* `obstacles` [`<obstacle-state>[]`]
* `players` [`<player-state>[]`]
* `seeker` [`player-state`]

### obstacle-state

* `x`[`integer`]
* `y`[`integer`]
* `width`[`integer`]
* `height`[`integer`]
* `type`[`string`]

### player-state

* `id`[`string`]
* `name`[`string`]
* `x`[`integer`]
* `y`[`integer`]
* `color`[`string(HEX)`]
* `size`[`integer`]
* `rotation`[`integer`]