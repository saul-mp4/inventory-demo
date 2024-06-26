import React from "react";
import styles from "./item.module.css";

/**
 * Container of item icon.
 * Renders item and visualizes information about it.
 * @param itemObject - object with inventory item properties 
 */
export const Item = (props) => {
	const { itemObject } = props;
	const [x, y] = itemObject.position;
	const [w, h] = itemObject.size;
	return(
		<div 
			className={styles.item}
			style={{
				position: "absolute",
				left: `${x * 34}px`,
				top: `${y * 34}px`,
				width: `${w * 32}px`,
				height: `${h * 32}px`
			}}
			>
			{itemObject.quantity}
		</div>
	)
}
