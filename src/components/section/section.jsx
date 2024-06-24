import React from "react";
import {Tile} from "../tile/tile";
import style from "./section.module.css";

export const Section = (props) => {
	const {width = 1, height = 1} = props;

	return(
		<div className={style.grid}>
			{new Array(width).fill(0).map(() => {
					return(
						<Tile />
					)
				})
			}
		</div>
	)
}
