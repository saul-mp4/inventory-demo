import { Item } from "./item";

export default {
	title: "Item",
	component: Item,
}

export const Primary = {
	args: {
		itemObject: {
			id: 1,
			name: "apple",
			position: [0, 0],
			size: [1, 1],
			quantity: 2,
			weight: 0.5,
		}
	}
}

export const DifferentPosition = {
	args: {
		itemObject: {
			id: 1,
			name: "apple",
			position: [2, 3],
			size: [1, 1],
			quantity: 2,
			weight: 0.5,
		}
	}
}

export const DifferentSize = {
	args: {
		itemObject: {
			id: 1,
			name: "apple",
			position: [0, 0],
			size: [2, 1],
			quantity: 2,
			weight: 0.5,
		}
	}
}
