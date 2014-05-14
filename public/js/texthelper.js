var textHelper = (function() {
	var drawText = function(ctx, option) {
		var text = option['text'];
		if(!text) return this;
		if(text instanceof Array) text = text.join(', ');
		var fontSize = option['font$size'] * ctx.canvas.height;
		var x = option['x'] * ctx.canvas.width;
		var y = option['y'] * ctx.canvas.height;
		ctx.font = fontSize + 'px ' + option['font'];
		ctx.fillStyle = option['font$color'];
		ctx.textAlign = option['text$align'];
		if(option['wrap$width'] === 0 && option['wrap$height'] === 0) {
			if(typeof text === 'number') text = text.toString();
			var textlines = text.split('\n');
			for(var i = 0; i < textlines.length; i++) {
				ctx.fillText(textlines[i], x, y + i*fontSize);
			};
		}
		return this;
	}

	return {
		drawText: drawText
	}
})();