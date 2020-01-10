class Snake {
	currentGrid;
	gridSystem;
	body;
	direction;
	speed;

	constructor(grid, gridSystem, length, speed) {
		this.direction = new Point(1, 0);
		this.currentGrid = grid;
		this.gridSystem = gridSystem;
		this.speed = speed;
		this.body = new Array(0);

		let head = new PIXI.Graphics();
		head.beginFill(0xfcba03);
		head.lineStyle(1, 0xFF3300, 1);
		head.drawRect(0, 0, 30, 30);
		head.endFill();
		head.position = new Point(
			gridSystem.getGrid(this.currentGrid).position.x,
			gridSystem.getGrid(this.currentGrid).position.y);
		snakeLayer.addChild(head);
		this.body.push(head);

		this.addLength(length - 1);
	}

	setDirection(direction) {
		if (direction.x == 1 && this.direction.x == -1)
			return;
		if (direction.x == -1 && this.direction.x == 1)
			return;
		if (direction.y == 1 && this.direction.y == -1)
			return;
		if (direction.y == -1 && this.direction.y == 1)
			return;
		this.direction = direction;
	}

	move() {
		for (let i = this.body.length - 1; i > 0; i--) {
			this.body[i].position = this.body[i - 1].position;
		}

		// release currentGrid
		let lastGrid = gridSystem.getGrid(new Point(this.body[this.body.length - 1].position.x / 30,
			this.body[this.body.length - 1].position.y / 30));
		lastGrid.block = false;

		let x = this.currentGrid.x + this.direction.x;
		let y = this.currentGrid.y + this.direction.y;

		if (x >= gridSystem.map.length)
			x = 0;
		if (x < 0)
			x = gridSystem.map.length - 1;
		if (y >= gridSystem.map[0].length)
			y = 0;
		if (y < 0)
			y = gridSystem.map[0].length - 1;

		this.currentGrid = new Point(x, y);
		let fisrtGrid = gridSystem.getGrid(this.currentGrid);
		this.body[0].position.set(fisrtGrid.position.x, fisrtGrid.position.y);

		for (let i = this.body.length - 2; i > 0; i--) {
			let fillGrid = gridSystem.getGrid(this.currentGrid);
			fillGrid.block = true;
		}

		if (fisrtGrid.supply != null) {
			fisrtGrid.supply.destroy();
			fisrtGrid.supply = null;
			score += 5 * this.body.length;
			this.speed += 0.5;
			scoreText.text = 'Score: ' + score.toString();
			this.addLength(5);
		}
	}

	addLength(length) {
		let lastGrid = gridSystem.getGrid(new Point(this.body[this.body.length - 1].position.x / 30,
			this.body[this.body.length - 1].position.y / 30));
		for (let i = 0; i < length; i++) {
			let part = new PIXI.Graphics();
			part.beginFill(0x66CCFF);
			part.lineStyle(1, 0xFF3300, 1);
			part.drawRect(0, 0, 30, 30);
			part.endFill();
			part.position = lastGrid.position;
			snakeLayer.addChild(part);
			this.body.push(part);
		}
	}
}
