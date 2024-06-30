import {create} from "zustand";

export const useStoreState = create((set) => ({
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
				quantity: 2,
				weight: 0.5,
			},
			{
				id: 2,
				name: "banana",
				position: [1, 0],
				size: [2, 1],
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
				id: 1,
				name: "apple",
				position: [3, 0],
				size: [1, 1],
				quantity: 2,
				weight: 0.5,
			},
			{
				id: 3,
				name: "bomb",
				position: [0, 0],
				size: [2, 2],
				quantity: 1,
				weight: 2,
			}
		]
	},

/**
 * Move item to free spot inside one section.
 * Update matrix to visualize select.
 * Update matrix to visualize new busy tiles.
 */
	moveItem: (id, x, y, dragStopped = false, section) => set((state) => {
		const {items, matrix} = state[section];
		const found = items.find((it)=> it.id === id);

		//check that found item is valid
		if (!found) {
			return state;
		}

		const newItems = items.filter((it) => it.id !== id);
		const updItem = Object.assign({}, found);
		updItem.position = [x, y];

		const busyDots = newItems.map(getItemPositions).flat();
		const updDots = getItemPositions(updItem);

		//check if new position is available
		//and item doesn't intersect with another item
		const collides = busyDots.some((bd) => 
			updDots.some((ud) => 
				ud[0] === bd[0] &&
				ud[1] === bd[1]
			)
		);

		const outOfBounds = updDots.some((ud) => 
			ud[1] < 0 || ud[1] >= matrix.length ||
			ud[0] < 0 || ud[0] >= matrix[0].length
		);

		//check boundaries of section
		if (outOfBounds || collides) {
			const dots = items.map(getItemPositions).flat()
			const newMatrix = matrix.map((row) => row.map(() => 0));
			dots.forEach((d) => newMatrix[d[1]][d[0]] = 1);

			return {
				[section]: {
					...state[section],
					matrix: newMatrix
				}
			};
		}

		if (dragStopped) {
			newItems.push(updItem);

			//update matrix on new
			const newMatrix = matrix.map((row) => row.map(() => 0));
			[...updDots, ...busyDots].forEach((d) => newMatrix[d[1]][d[0]] = 1);

			return {
				[section]: {
					...state[section],
					items: newItems,
					matrix: newMatrix
				}
			}
		}

		const newMatrix = matrix.map((row) => row.map(() => 0));
		busyDots.forEach((d) => newMatrix[d[1]][d[0]] = 1);
		updDots.forEach((d) => newMatrix[d[1]][d[0]] = 2);

		return {
			[section]: {
				...state[section],
				matrix: newMatrix
			}
		}
	})
}))


/**
 * Gets all item positions in a [[x, y], ...] format
 * @param item - object that contains item properties
 */
function getItemPositions(item) {
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
