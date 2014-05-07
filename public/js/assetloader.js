var assetLoader = (function() {
	// Static variables
	var imagesToLoad = [];
	var soundsToLoad = [];
	var musicsToLoad = [];
	var numAssets = 0;
	var numAssetsLoaded = 0;
	var images = [];
	var sounds = [];
	var musics = [];
	var fnWhenDone;
	var loadingLoopTimer;

	// Methods
	var load = function(fnLoading, fnDone) {
		// Remember what to run after finishing loading
		fnWhenDone = fnDone;

		// Add up numbers
		numAssets = imagesToLoad.length + soundsToLoad.length;
		if(numAssets === 0) {
			fnDone();
			return;
		}

		// Run loading loop
		loadingLoopTimer = window.setInterval(fnLoading, 20);

		// Load images
		for(var i = 0; i < imagesToLoad.length; i++) {
			var image = new Image();
			images[imagesToLoad[i]] = image;
			image.onload = function() {
				this.hereComesAnAsset();
			}.bind(this);
			image.src = imagesToLoad[i];
		}

		// Load sounds
		for(var i = 0; i < soundsToLoad.length; i++) {
			var sound = new Audio();
			sounds[soundsToLoad[i]] = sound;
			sound.onloadeddata = function() {
				this.hereComesAnAsset();
			}.bind(this);
			sound.src = soundsToLoad[i];
		}

		// Load musics
		for(var i = 0; i < musicsToLoad.length; i++) {
			var music = new Audio();
			musics[musicsToLoad[i]] = music;
			music.onloadeddata = function() {
				this.hereComesAnAsset();
			}.bind(this);
			music.src = musicsToLoad[i];
		}
	};

	var addImage = function(src) {
		imagesToLoad.push(src);
	};
	var getImages = function() {
		return images;
	};

	var addSound = function(src) {
		soundsToLoad.push(src);
	};
	var getSounds = function() {
		return sounds;
	};

	var addMusic = function(src) {
		musicsToLoad.push(src);
	};
	var getMusics = function() {
		return musics;
	};

	var hereComesAnAsset = function() {
		console.log('assetLoaded');
		if(++numAssetsLoaded >= numAssets) {
			window.clearInterval(loadingLoopTimer);
			fnWhenDone();
		}
	};

	// Bridging to outer world
	return {
		load: load,
		addImage: addImage,
		addSound: addSound,
		addMusic: addMusic,
		getImages: getImages,
		getSounds: getSounds,
		getMusics: getMusics,
		hereComesAnAsset: hereComesAnAsset,
	}
})();