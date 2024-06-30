import React from "react";
import { Tile } from "../tile/tile";
import { Item } from "../item/item";

import style from "./section.module.css";
import global from "../../global";

/**
 * Inventory section.
 * Renders grid. Places items depending on their order.
 * @component
 * @param tileMatrix - 2 dimensional array with 0 or 1 values that indicates if tile empty or not.
 * @param inventoryItems - array of object that contains information about item
 * @param title - title of section
 * @param maxWeight - total sum of items' weight that section can contain
 */
export const Section = (props) => {
	const {title="Name", tileMatrix = [[0, 0], [0, 0]], inventoryItems = []} = props;

	const height = tileMatrix.length;
	const width = tileMatrix[0].length;

	return(
		<div> 
			<h2 className={style.title}>{title}</h2>
			<div 
				className={style.outer}
				style={{
					width: `${width * global.tile}px`,
					height: `${height * global.tile}px`,
				}}	
				>
				<div 
					style={{
						display: "grid",
						gridTemplateColumns: `repeat(${width}, 1fr)`
					}}
					>
					{tileMatrix.flat().map((v, i) => {
						return(
							<Tile key={i} busy={v}/>
						)
						})
					}
				</div>
				{inventoryItems.length > 0 && inventoryItems.map((item) => {
					return(
						<Item key={item.id} itemObject={item}/>
					)
				})}
			</div>
		</div>
	)
}
