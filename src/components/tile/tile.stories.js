import { Tile } from "./tile.jsx";

export default {
	component: Tile,
	title: "Tile"
}

export const Primary = {}

export const Busy = {
	args: {
		busy: true,
	}
}
