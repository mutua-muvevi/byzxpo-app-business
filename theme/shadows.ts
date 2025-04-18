// app/theme/shadows.ts
import { grey, common } from "./palette";

export const shadows = (mode: "light" | "dark") => {
	const color = mode === "light" ? grey[500] : common.black;

	const transparent1 = `rgba(${
		color === grey[500] ? "145, 158, 171" : "0, 0, 0"
	}, 0.2)`;
	const transparent2 = `rgba(${
		color === grey[500] ? "145, 158, 171" : "0, 0, 0"
	}, 0.14)`;
	const transparent3 = `rgba(${
		color === grey[500] ? "145, 158, 171" : "0, 0, 0"
	}, 0.12)`;

	return [
		"none",
		`0px 2px 1px -1px ${transparent1}, 0px 1px 1px 0px ${transparent2}, 0px 1px 3px 0px ${transparent3}`,
		`0px 3px 1px -2px ${transparent1}, 0px 2px 2px 0px ${transparent2}, 0px 1px 5px 0px ${transparent3}`,
		// Add up to 24 shadows as per your MUI shadows.ts
		`0px 11px 15px -7px ${transparent1}, 0px 24px 38px 3px ${transparent2}, 0px 9px 46px 8px ${transparent3}`,
	];
};
