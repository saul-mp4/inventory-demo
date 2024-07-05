// Drag and drop slice

const dragInitState = {
	currentItem: {},
	startItem: {},
	startSection: "",
}

export default (set, get) => ({
	...dragInitState,

	dragHandlers: {
		start: (event) => {
			const state = get();
			const {item, section} = event.active.data.current

			state.currentItem = Object.assign({}, item);
			state.startItem = Object.assign({}, item);
			state.startSection = section

			state.itemStart(section, item);
		},
		over: (event) => {
			if (!event.over) {
				return;
			}

			const state = get();
			const {section, position} = event.over.data.current

			const item = state.updateItemPosition(state.currentItem, position[0], position[1]);

			state.itemOver(section, item);
		},

		end: (event) => {
			if (!event.over) {
				return;
			}

			const state = get();
			const {section, position} = event.over.data.current

			const item = state.updateItemPosition(state.currentItem, position[0], position[1]);
			state.itemPlace(section, item, state.startSection, state.startItem);

			state.resetDragState();
		},
	},

	resetDragState: () => set({ ...dragInitState})
}) 

//Item drag and drop
//Drag start
//	Item deletes from current section and adds to dragging buffer
//Dragging
//	Drag tracks on which section it works and renders matrix to visualize tiles state
//Drag stopped
//	Item coordinates updates depending on which section is used
//	Drag state resets

