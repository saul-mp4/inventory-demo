import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import createDndSlice from "./dnd_slice";
import createSectionSlice from "./section_slice";

//Three state modules
//Item module
//	Map with <sectinon, items[]> values
//	Actions that operates on items
//Matrix module - matrix that visualizes tiles state
//	Map with <section, matrix> values
//	Actions that operates on matrices
//Drag and drop module
//	All necessery properties and actions to drag and drop items
export const useStoreState = create(
	immer(
		(...args) => ({
			...createSectionSlice(...args),
			...createDndSlice(...args),
		})
	)
)
