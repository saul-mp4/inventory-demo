import { Section } from "./section";

export default {
	title: "Section",
	component: Section,
	tag: ["autodocs"]
}

export const Primary = {}
export const CustomSize = {
	args: {
		width: 12,
		height: 6
	}
}

const items = [
	{
		id: 1,
		name: "apple",
		position: [1, 1],
		size: [1, 1],
		quantity: 2,
		weight: 0.5,
	}
]

export const OneItem = {
	args: {
		inventoryItems: items,
	}
}
