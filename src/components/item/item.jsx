import React, {useState} from "react";
import Draggable from "react-draggable";
import { useStoreState } from "../../state/state";

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
	const moveItem = useStoreState((state) => state.moveItem);
	
  const [w, h] = itemObject.size;

	const [position, setPosition] = useState({ x: 0, y: 0 });

	const conditionalRound = (num) => Math.abs(num) > 0.5 ? 
		num > 0 ? Math.ceil(num) : Math.floor(num) :
		num > 0 ? Math.floor(num) : Math.ceil(num) 

  const handleDrag = (_, data) => {
		const newX = conditionalRound(data.x / global.step)
		const newY = conditionalRound(data.y / global.step)

		const changed = newX > 0 || newX < 0 ||
			newY > 0 || newY < 0;

		if (changed) {
			moveItem(itemObject.id, newX + x, newY + y, false, section);
		}

    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = (_, data) => {
		const newX = conditionalRound(data.x / global.step) + x
		const newY = conditionalRound(data.y / global.step) + y

		moveItem(itemObject.id, newX, newY, true, section);

    setPosition({ x: 0, y: 0 });
  };

	return(
		<Draggable
			defaultPosition={{ x: 0, y: 0 }}
      position={position}
      onDrag={handleDrag}
      onStop={handleStop}
			>
			<div 
				className={styles.item}
				style={{
					position: "absolute",
					left: `${x * global.step}px`,
					top: `${y * global.step}px`,
					width: `${w * global.tile}px`,
					height: `${h * global.tile}px`
				}}
				>
				{itemObject.quantity}
			</div>
		</Draggable>
	)
}
