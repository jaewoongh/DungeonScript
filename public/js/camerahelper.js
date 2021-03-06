var cameraHelper = (function() {
    var goForward = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        var heading = this['heading'];
        switch(heading) {
            case 'north':
                if(y <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y-1][x]}) || {};
                if(tileAhead['passable']) {
                    y--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'east':
                if(x >= map['cols']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x+1]}) || {};
                if(tileAhead['passable']) {
                    x++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'west':
                if(x <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x-1]}) || {};
                if(tileAhead['passable']) {
                    x--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'south':
                if(y >= map['rows']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y+1][x]}) || {};
                if(tileAhead['passable']) {
                    y++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
        }
        this['on'] = queryThings({map$char: map['_mapdata'][y][x]});
        switch(this['heading']) {
            case 'north':   this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'east':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
            case 'west':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'south':   this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
        }
        this['x$pos'] = x;
        this['y$pos'] = y;
        delete this['goforward'];
        return this;
    };

    var goLeft = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        var heading = this['heading'];
        switch(heading) {
            case 'east':
                if(y <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y-1][x]}) || {};
                if(tileAhead['passable']) {
                    y--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'south':
                if(x >= map['cols']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x+1]}) || {};
                if(tileAhead['passable']) {
                    x++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'north':
                if(x <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x-1]}) || {};
                if(tileAhead['passable']) {
                    x--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'west':
                if(y >= map['rows']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y+1][x]}) || {};
                if(tileAhead['passable']) {
                    y++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
        }
        this['on'] = queryThings({map$char: map['_mapdata'][y][x]});
        switch(this['heading']) {
            case 'north':   this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'east':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
            case 'west':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'south':   this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
        }
        this['x$pos'] = x;
        this['y$pos'] = y;
        delete this['goleft'];
        return this;
    };

    var goRight = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        var heading = this['heading'];
        switch(heading) {
            case 'west':
                if(y <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y-1][x]}) || {};
                if(tileAhead['passable']) {
                    y--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'north':
                if(x >= map['cols']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x+1]}) || {};
                if(tileAhead['passable']) {
                    x++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'south':
                if(x <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x-1]}) || {};
                if(tileAhead['passable']) {
                    x--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'east':
                if(y >= map['rows']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y+1][x]}) || {};
                if(tileAhead['passable']) {
                    y++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
        }
        this['on'] = queryThings({map$char: map['_mapdata'][y][x]});
        switch(this['heading']) {
            case 'north':   this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'east':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
            case 'west':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'south':   this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
        }
        this['x$pos'] = x;
        this['y$pos'] = y;
        delete this['goright'];
        return this;
    };

    var goBackward = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        var heading = this['heading'];
        switch(heading) {
            case 'south':
                if(y <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y-1][x]}) || {};
                if(tileAhead['passable']) {
                    y--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'east':
                if(x >= map['cols']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x-1]}) || {};
                if(tileAhead['passable']) {
                    x--;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'west':
                if(x <= 0) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y][x+1]}) || {};
                if(tileAhead['passable']) {
                    x++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
            case 'north':
                if(y >= map['rows']-1) break;
                var tileAhead = queryThings({map$char: map['_mapdata'][y+1][x]}) || {};
                if(tileAhead['passable']) {
                    y++;
                    this['moved'] = true;
                } else {
                    this['blocked'] = true;
                }
                break;
        }
        this['on'] = queryThings({map$char: map['_mapdata'][y][x]});
        switch(this['heading']) {
            case 'north':   this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'east':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
            case 'west':    this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'south':   this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
        }
        this['x$pos'] = x;
        this['y$pos'] = y;
        delete this['gobackward'];
        return this;
    };

    var turnLeft = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        switch(this['heading']) {
            case 'north':   this['heading'] = 'west';   this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'east':    this['heading'] = 'north';  this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'west':    this['heading'] = 'south';  this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
            case 'south':   this['heading'] = 'east';   this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
        }
        delete this['turnleft'];
        return this;
    };

    var turnRight = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        switch(this['heading']) {
            case 'north':   this['heading'] = 'east';   this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'east':    this['heading'] = 'south';  this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'west':    this['heading'] = 'north';  this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
            case 'south':   this['heading'] = 'west';   this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
        }
        delete this['turnright'];
        return this;
    };

    var turnAround = function() {
        var map = this['at'];
        var x = this['x$pos'];
        var y = this['y$pos'];
        switch(this['heading']) {
            case 'north':   this['heading'] = 'south';  this['ahead'] = queryThings({map$char: map['_mapdata'][y][x-1]});   break;
            case 'east':    this['heading'] = 'west';   this['ahead'] = queryThings({map$char: map['_mapdata'][y-1][x]});   break;
            case 'west':    this['heading'] = 'east';   this['ahead'] = queryThings({map$char: map['_mapdata'][y+1][x]});   break;
            case 'south':   this['heading'] = 'north';  this['ahead'] = queryThings({map$char: map['_mapdata'][y][x+1]});   break;
        }
        delete this['turnaround'];
        return this;
    };

    var drawPerspective = function(ctx, thing, meta) {
        /* Visible area and drawing sequence
           .......
           .13542.
           .68A97.
           ..BDC..
           ..EGF..  <- G is also a current camera position
           .......  */
        var x = thing['x'] || 0.5;
        var y = thing['y'] || 0.5;
        var w = thing['width'] || 1.0;
        var h = thing['height'] || 1.0;
        var align = thing['align'] || 'center';

        var tw = meta['target$width'];
        var th = meta['target$height'];

        var heading = thing['heading'];
        if(!thing['at']) return;
        var mapdata = thing['at']['_mapdata'];
        var px = thing['x$pos'];
        var py = thing['y$pos'];

        var l = function() {
            switch(heading) {
                case 'north':   px--;    break;
                case 'east':    py--;    break;
                case 'west':    py++;    break;
                case 'south':   px++;    break;
            }
        }

        var r = function() {
            switch(heading) {
                case 'north':   px++;    break;
                case 'east':    py++;    break;
                case 'west':    py--;    break;
                case 'south':   px--;    break;
            }
        }

        var f = function() {
            switch(heading) {
                case 'north':   py--;    break;
                case 'east':    px++;    break;
                case 'west':    px--;    break;
                case 'south':   py++;    break;
            }
        }

        var b = function() {
            switch(heading) {
                case 'north':   py++;    break;
                case 'east':    px--;    break;
                case 'west':    px++;    break;
                case 'south':   py--;    break;
            }
        }

        // 1
        f(); f(); f(); l(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['further$a']], {
                x: align=='center'?x-w*0.355:x+w*0, y: y, width: w*0.29, height: h, align: align,
                crop$x: 0,  crop$y: 0,  crop$width: Math.round(tw*0.29),  crop$height: th });
            } catch(err) {}
        } }

        // 2
        r(); r(); r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['further$a']], {
                x: align=='center'?x+w*0.355:x+w*0.71, y: y, width: w*0.29, height: h, align: align,
                crop$x: Math.round(tw*0.71), crop$y: 0, crop$width: Math.round(tw*0.29), crop$height: th });
            } catch(err) {}
        } }

        // 3
        l(); l(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['further$b']], {
                x: align=='center'?x-w*0.25:x, y: y, width: w*0.5, height: h, align: align,
                crop$x: 0, crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // 4
        r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['further$b']], {
                x: align=='center'?x+w*0.25:x+w*0.5, y: y, width: w*0.5, height: h, align: align,
                crop$x: Math.round(tw*0.5), crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // 5
        l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['further$a']], {
                x: align=='center'?x:x+w*0.29, y: y, width: w*0.42, height: h, align: align,
                crop$x: Math.round(tw*0.29), crop$y: 0, crop$width: Math.round(tw*0.42), crop$height: th });
            } catch(err) {}
        } }

        // 6
        b(); l(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['far$a']], {
                x: align=='center'?x-w*0.385:x+w*0, y: y, width: w*0.23, height: h, align: align,
                crop$x: 0, crop$y: 0, crop$width: Math.round(tw*0.23), crop$height: th });
            } catch(err) {}
        } }

        // 7
        r(); r(); r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['far$a']], {
                x: align=='center'?x+w*0.385:x+w*0.77, y: y, width: w*0.23, height: h, align: align,
                crop$x: Math.round(tw*0.77), crop$y: 0, crop$width: Math.round(tw*0.23), crop$height: th });
            } catch(err) {}
        } }

        // 8
        l(); l(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['far$b']], {
                x: align=='center'?x-w*0.25:x+w*0, y: y, width: w*0.5, height: h, align: align,
                crop$x: 0, crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // 9
        r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['far$b']], {
                x: align=='center'?x+w*0.25:x+w*0.5, y: y, width: w*0.5, height: h, align: align,
                crop$x: Math.round(tw*0.5), crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // A
        l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['far$a']], {
                x: align=='center'?x:x+w*0.23, y: y, width: w*0.54, height: h, align: align,
                crop$x: Math.round(tw*0.23), crop$y: 0, crop$width: Math.round(tw*0.54), crop$height: th });
            } catch(err) {}
        } }

        // B
        b(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['near$a']], {
                x: align=='center'?x-w*0.25:x, y: y, width: w*0.5, height: h, align: align,
                crop$x: 0, crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // C
        r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['near$a']], {
                x: align=='center'?x+w*0.25:x+w*0.5, y: y, width: w*0.5, height: h, align: align,
                crop$x: Math.round(tw*0.5), crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // D
        l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['near$b']], {
                x: align=='center'?x:x, y: y, width: w, height: h, align: align });
            } catch(err) {}
        } }

        // E
        b(); l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['here$a']], {
                x: align=='center'?x-w*0.25:x, y: y, width: w*0.5, height: h, align: align,
                crop$x: 0, crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // F
        r(); r();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['here$a']], {
                x: align=='center'?x+w*0.25:x+w*0.5, y: y, width: w*0.5, height: h, align: align,
                crop$x: Math.round(tw*0.5), crop$y: 0, crop$width: Math.round(tw*0.5), crop$height: th });
            } catch(err) {}
        } }

        // G
        l();
        if(mapdata[py]) { if(mapdata[py][px]) { try {
            imageHelper.drawImage(ctx, images[queryThings({map$char: mapdata[py][px]})['here$b']], {
                x: align=='center'?x:x, y: y, width: w, height: h, align: align });
            } catch(err) {}
        } }
    };


    return {
        goForward: goForward,
        goLeft: goLeft,
        goRight: goRight,
        goBackward: goBackward,
        turnLeft: turnLeft,
        turnRight: turnRight,
        turnAround: turnAround,
        drawPerspective: drawPerspective
    }
})();