// Section and item slice of state

export default (set) => ({
	sections: {
		pocket: {
			title: "Pocket",
			matrix:[
				[0, 1, 1, 0, 0],
				[0, 1, 0, 0, 0],
			],
			items: [
				{
					id: 1,
					name: "apple",
					position: [1, 1],
					size: [1, 1],
					dots: [[1, 1]],
					quantity: 2,
					weight: 0.5,
				},
				{
					id: 2,
					name: "banana",
					position: [1, 0],
					size: [2, 1],
					dots: [[1, 0], [2, 0]],
					quantity: 1,
					weight: 1,
				}
			]
		},
		baggage: {
			title: "Baggage",
			matrix:[
				[1, 1, 0, 1, 0, 0],
				[1, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
			],
			items: [
				{
					id: 3,
					name: "apple",
					position: [3, 0],
					size: [1, 1],
					dots: [[3, 0]],
					quantity: 2,
					weight: 0.5,
				},
				{
					id: 4,
					name: "bomb",
					position: [0, 0],
					size: [2, 2],
					dots: [[0, 0],[1, 0],[0, 1],[1, 1]],
					quantity: 1,
					weight: 2,
				}
			]
		},
	},

	itemStart: (startSection, item) => set((state) => {
		const busyDots = state.sections[startSection].items.filter(i => i.id !== item.id).map(i => i.dots).flat();
		const m = state.sections[startSection].matrix;

		//reset last select values
		m.forEach((row, rI) => {
			row.forEach((_, i) => {
				m[rI][i] = 0;
			})
		});

		busyDots.forEach((d) => {
			m[d[1]][d[0]] = 1;
		});

	}),

	itemOver: (section, item) => set((state) => {
		//reset last select values
		state.sections.pocket.matrix.forEach((row, rI) => {
			row.forEach((v, i) => {
				if (v === 2) {
					state.sections.pocket.matrix[rI][i] = 0;
				}
			})
		})
		state.sections.baggage.matrix.forEach((row, rI) => {
			row.forEach((v, i) => {
				if (v === 2) {
					state.sections.baggage.matrix[rI][i] = 0;
				}
			})
		})
		
		const m = state.sections[section].matrix;
		const dots = item.dots

		if (cantPlace(m, dots)) {
			return;
		}

		//set new select values
		dots.forEach((d) => {
			m[d[1]][d[0]] = 2;
		});
	}),

	itemPlace: (section, item, startSection, startItem) => set((state) => {
		const m = state.sections[section].matrix;
		const dots = item.dots
		let items = [];

		state.sections[startSection].items = state.sections[startSection].items.filter((i) => i.id !== item.id);
		
		if (cantPlace(m, dots)) {
			items = state.sections[startSection].items;
			items.push(startItem);
		} else {
			items = state.sections[section].items
			items.push(item);
		}

		//reset last select values
		m.forEach((row, rI) => {
			row.forEach((_, i) => {
				m[rI][i] = 0;
			})
		})

		//draw new busy dots
		const newDots = items.map(i => i.dots).flat();
		newDots.forEach((d) => {
			m[d[1]][d[0]] = 1;
		});
	}),

	updateItemPosition: (item, nX, nY) => {	
		const newItem = Object.assign({}, item);
		newItem.position = [nX, nY];
		newItem.dots = getItemDots(newItem);
		return newItem;
	},
})

/**
 * Check if item can be placed on new position
 * depending on its dots
 */
const cantPlace = (matrix, dots) => {
	const busyDots = [];

	matrix.forEach((row, y) => {
		row.forEach((v, x) => {
			if (v === 1) {
				busyDots.push([x, y])
			}
		})
	})

	const collides = busyDots.some((bd) => 
		dots.some((d) => 
			d[0] === bd[0] &&
				d[1] === bd[1]
		)
	);

	const outOfBounds = dots.some((d) => 
	d[1] < 0 || d[1] >= matrix.length ||
		d[0] < 0 || d[0] >= matrix[0].length
	);

	if (collides || outOfBounds) {
		return true;
	} else {
		return false;
	}

}

/**
 * Gets all item positions in a [x, y] format
 * @param item - object that contains item properties
 */
const getItemDots = (item) => {
	const [width, height] = item.size;
	const [x, y] = item.position;

	const positions = []
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			positions.push([x + j, y + i]);
		}
	}

	return positions;
}
