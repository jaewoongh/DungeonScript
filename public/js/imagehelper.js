var imageHelper = (function() {
    var drawImage = function(ctx, img, option) {
        if(!img) return;
        var x = option['x'] * ctx.canvas.width;
        var y = option['y'] * ctx.canvas.height;
        var w = option['width'] * ctx.canvas.width;
        var h = option['height'] * ctx.canvas.height;
        var cx = option['crop$x'];
        var cy = option['crop$y'];
        var cw = option['crop$width'];
        var ch = option['crop$height'];
        if(cx !== undefined && cy !== undefined && cw !== undefined && ch !== undefined) {
            if(w !== undefined || h !== undefined) {
                // Scale proportionally if only one parameter is given
                w = w || (h*img.width/img.height);
                h = h || (w*img.height/img.width);
                // Apply align option
                x = option['align'] === 'center' ? x - w*0.5 : x;
                y = option['align'] === 'center' ? y - h*0.5 : y;
                ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
            } else {
                w = ctx.canvas.width * cw/img.width;
                h = ctx.canvas.height * ch/img.height;
                x = option['align'] === 'center' ? x - w*0.5 : x;
                y = option['align'] === 'center' ? y - h*0.5 : y;
                ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
            }
        } else if(w !== undefined || h !== undefined) {
            // Scale proportionally if only one parameter is given
            w = w || (h*img.width/img.height);
            h = h || (w*img.height/img.width);
            // Apply align option
            x = option['align'] === 'center' ? x - w*0.5 : x;
            y = option['align'] === 'center' ? y - h*0.5 : y;
            ctx.drawImage(img, x, y, w, h);
        } else {
            x = option['align'] === 'center' ? x - img.width*0.5  : x;
            y = option['align'] === 'center' ? y - img.height*0.5 : y;
            ctx.drawImage(img, x, y);
        }
    };

    return {
        drawImage: drawImage
    }
})();