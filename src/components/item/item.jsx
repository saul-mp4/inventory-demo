import React from "react";
import {useDraggable} from '@dnd-kit/core';
 
import {CSS} from '@dnd-kit/utilities';
import styles from "./item.module.css";
import global from "../../global";

/**
 * Container of item icon.
 * Renders item and visualizes information about it.
 * @param itemObject - object with inventory item properties 
 */
export const Item = (props) => {
	const { itemObject, section } = props;

	const [x, y] = itemObject.position;
  const [w, h] = itemObject.size;

	const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: itemObject.id,
		data: {
			item: itemObject,
			section
		}
  });

	const transformStyle = {
		transform: CSS.Translate.toString(transform),
	}

	return(
		<div 
			className={styles.item}
			style={{
				position: "absolute",
				left: `${x * global.step}px`,
				top: `${y * global.step}px`,
				width: `${w * global.tile}px`,
				height: `${h * global.tile}px`,
				...transformStyle,
			}}
			ref={setNodeRef} 
			{...listeners} 
			{...attributes}		
			>
			{itemObject.quantity}
		</div>
	)
}
