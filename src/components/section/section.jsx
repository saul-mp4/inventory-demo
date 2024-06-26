import React from "react";
import { Tile } from "../tile/tile";
import { Item } from "../item/item";
import style from "./section.module.css";

/**
 * Inventory section.
 * Renders grid. Places items depending on their order.
 * @component
 * @param width - number of tiles horizontally
 * @param height - number of tiles verticaly
 * @param inventoryItems - array of object that contains information about item
 * @param title - title of section
 * @param maxWeight - total sum of items' weight that section can contain
 */
export const Section = (props) => {
	const {width = 4, height = 4, inventoryItems = []} = props;

	return(
		<div 
			className={style.outer}
			style={{
				width: `${width*32}px`,
				height: `${height*32}px`,
			}}	
		>
			<div 
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${width}, 1fr)`
				}}
				>
				{new Array(width*height).fill(0).map(() => {
					return(
					<Tile />
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
	)
}
