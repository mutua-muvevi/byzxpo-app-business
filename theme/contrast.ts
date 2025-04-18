// app/theme/contrast.ts
import { grey } from "./palette";
import { shadows } from "./shadows";

export const createContrast = (contrast: string, mode: "light" | "dark") => {
	const theme = {
		...(contrast === "bold" &&
			mode === "light" && {
				background: {
					default: grey[200],
				},
			}),
	};

	const components = {
		...(contrast === "bold" && {
			card: {
				shadow: shadows(mode)[1],
			},
		}),
	};

	return {
		...theme,
		components,
	};
};
