import { Section } from "./section";

export default {
	title: "Section",
	component: Section,
	tag: ["autodocs"]
}

export const Primary = {}

export const CustomSize = {
	args: {
		tileMatrix: [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]
	}
}

export const OneItem = {
	args: {
		tileMatrix: [
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0]
		],
		inventoryItems: [
			{
				id: 1,
				name: "apple",
				position: [1, 1],
				size: [1, 1],
				quantity: 2,
				weight: 0.5,
			}
		],
	}
}

export const SeveralItems = {
	args: {
		tileMatrix: [
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],
		inventoryItems: [
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
				name: "gun",
				position: [1, 0],
				size: [2, 1],
				quantity: 1,
				weight: 1,
			}
		]
	}
}
