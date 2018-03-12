var lusk = function (elem) {
	var ib = this;
	ib.elem = document.getElementById(elem);	
	ib.ct = ib.elem.getContext("2d");
	ib.height = 2000;
	ib.width = 2000;
	ib.ct.imageSmoothingEnabled = false;
	
	ib.ct.clear = function() {
		ib.ct.clearRect(0, 0, 400, 400);
	};
	ib.ct.reSize = function (wth, hgt) {
		ib.height = hgt;
		ib.width = wth;
	};	
	ib.global = {
		maxX : 300,
		maxY : 100,
		step : 5,
		gravity : 10,
		leap : 60,
		level : 1,
		falling : false,
		game : null,
		clock : 30
	};
	
	ib.protagonist = {
		element : null, // document.getElementById("protagonist"),
		selectedFrame : 0,
		img : new Image(),	
		frms : ["Sprites/Runner/Runner-Running-0.png","Sprites/Runner/Runner-Running-1.png","Sprites/Runner/Runner-Running-2.png","Sprites/Runner/Runner-Running-3.png","Sprites/Runner/Runner-Running-4.png","Sprites/Runner/Runner-Running-5.png","Sprites/Runner/Runner-Running-6.png","Sprites/Runner/Runner-Running-7.png"],
		x : 45,
		y : 0
	};
	
	ib.antagonists = [];
	
	ib.start = function () {
		ib.global.game = setInterval(ib.handleEvents, ib.global.clock);
	};

	ib.stop = function () {
		clearInterval(game);
	};

	ib.init = function () {
		// var wt = window.innerWidth;
		// var ht = window.innerHeight;
		// ib.global.maxX = wt;
		// ib.global.maxY = ht;
		//ib.ct.reSize(400, 400);
		ib.protagonist.y = ib.global.maxY;
		ib.placeItem();
		ib.start();
	};

	ib.handleGravity = function () {
		if (ib.protagonist.y < ib.global.maxY) {
			ib.global.falling = true;
			ib.protagonist.y += ib.global.gravity;		
			ib.placeItem();
		}
		else {
			ib.global.falling = false;
		}
	};

	ib.handleAntagonists = function () {

	};

	ib.handleEvents = function () {
		//ib.ct.clear();
		ib.handleGravity();
	};
	ib.placeItem = function (index) {
		if (!index) {
			//ib.ct.fillStyle = "Red";
			//ib.ct.fillRect(ib.protagonist.x,ib.protagonist.y,20,20);
			if (ib.protagonist.selectedFrame < ib.protagonist.frms.length) {
				ib.protagonist.selectedFrame++;
			}
			else {
				ib.protagonist.selectedFrame = 0;
			}
			ib.protagonist.img.src = ib.protagonist.frms[ib.protagonist.selectedFrame];
			ib.ct.clear();
			ib.ct.drawImage(ib.protagonist.img, ib.protagonist.x, ib.protagonist.y - 74);			
			/*
			ib.protagonist.element.style.left = ib.protagonist.x + "vw";
			ib.protagonist.element.style.top = ib.protagonist.y + "vh";
			*/
		}
		else {

			/*
			ib.antagonists[index].element.style.left = ib.protagonist.x + "vw";
			ib.antagonists[index].element.style.top = ib.protagonist.y + "vh";
			*/
		}	
	};

	ib.jump = function (index) {
		var elm = ib.protagonist;
		if (index) {
			elm = ib.antagonists[index];
		}
		if (!ib.global.falling) {
			elm.y -= ib.global.leap;
			index ? ib.placeItem(index) : ib.placeItem();
		}
	};

	ib.move = function (direction) {
		if (direction) {
			if (ib.protagonist.x < ib.global.maxX) {
				ib.protagonist.x += ib.global.step;
			}	
		}
		else {
			if (ib.protagonist.x > 0) {
				ib.protagonist.x -= ib.global.step;
			}	
		}
		ib.placeItem();
	};
	
	ib.init();

	window.addEventListener("keydown", function(e) {
		var code = e.keyCode;
		if (code) {
			switch (code) {
				case 32: ib.jump(); break;
				case 38: ib.jump(); break;
				case 37: ib.move(false); break;
				case 39: ib.move(true); break;			
				case 65: ib.move(false); break;			
				case 68: ib.move(true); break;
				case 87: ib.jump(); break;
			}
		}
	});
	document.addEventListener("click", function() {
		ib.jump();
	});
	
};
