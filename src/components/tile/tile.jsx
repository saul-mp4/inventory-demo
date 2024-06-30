import React from "react";

import styles from "./tile.module.css";
import global from "../../global";

const tileStates = ["empty", "busy", "selecting"]

/**
 * A minimum unit for section grid.
 * Renders a small container.
 */
export const Tile = (props) => {
	const { busy } = props;
	const tileStyles = `
		${styles.tile}
		${styles[tileStates[busy]]}
	`;
	return(
	<div 
			className={tileStyles}
			style={{
				width: `${global.tile}px`,
				height: `${global.tile}px`
			}}
			>
	</div>
	)
}

