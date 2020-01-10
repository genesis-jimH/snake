class Grid {
	position;
	block;
	supply;
	constructor(position) {
		this.position = position;
	}
}

class GridSystem {
	map;
	constructor(size) {
		this.map = new Array(size.x);
		for (let i = 0; i < size.x; i++) {
			this.map[i] = new Array(size.y);
		}
		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[i].length; j++) {
				this.map[i][j] = new Grid(new Point(i * 30, j * 30));
			}
		}
	}
	getGrid(point) {
		if (point.x <= -1 || point.x >= this.map.length)
			return undefined;
		if (point.y <= -1 || point.y >= this.map[point.x].length)
			return undefined;
		return this.map[point.x][point.y];
	}
}