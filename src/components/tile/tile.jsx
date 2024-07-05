import React from "react";

import styles from "./tile.module.css";
import global from "../../global";

import {useDroppable} from "@dnd-kit/core";

const tileStates = ["empty", "busy", "selecting"]

/**
 * A minimum unit for section grid.
 * Renders a small container.
 */
export const Tile = (props) => {
	const { state, section, position } = props;
	const [x, y] = position;
	const {setNodeRef} = useDroppable({
		id: `${section}${x}${y}`,
		data: {
			position: [x, y],
			section
		}
	});
	const tileStyles = `
		${styles.tile}
		${styles[tileStates[state]]}
	`;
	return(
	<div 
			ref={setNodeRef}
			className={tileStyles}
			style={{
				width: `${global.tile}px`,
				height: `${global.tile}px`
			}}
			>
	</div>
	)
}

