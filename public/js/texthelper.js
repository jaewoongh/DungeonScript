var textHelper = (function() {
	var drawText = function(ctx, option) {
		var fontSize = option['font$size'] * ctx.canvas.height;
		var x = option['x'] * ctx.canvas.width;
		var y = option['y'] * ctx.canvas.height;
		ctx.font = fontSize + 'px ' + option['font'];
		ctx.fillStyle = option['font$color'];
		ctx.textAlign = option['text$align'];
		if(option['wrap$width'] === 0 && option['wrap$height'] === 0) {
			ctx.fillText(option['text'], x, y);
		}
		return this;
	}

	return {
		drawText: drawText
	}
})();