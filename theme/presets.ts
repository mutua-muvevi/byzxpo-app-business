// app/theme/presets.ts
import { primary } from "./palette";

export const cyan = {
	lighter: "#CCF4FE",
	light: "#68CDF9",
	main: "#078DEE",
	dark: "#0351AB",
	darker: "#012972",
	contrastText: "#FFFFFF",
};

export const purple = {
	lighter: "#EBD6FD",
	light: "#B985F4",
	main: "#7635dc",
	dark: "#431A9E",
	darker: "#200A69",
	contrastText: "#FFFFFF",
};

export const blue = {
	lighter: "#D1E9FC",
	light: "#76B0F1",
	main: "#2065D1",
	dark: "#103996",
	darker: "#061B64",
	contrastText: "#FFFFFF",
};

export const green = {
	lighter: "#61e29b",
	light: "#4edf8f",
	main: "#3adb82",
	dark: "#34c575",
	darker: "#2eaf68",
	contrastText: "#000000",
};

export const red = {
	lighter: "#FFE3D5",
	light: "#FFC1AC",
	main: "#FF3030",
	dark: "#B71833",
	darker: "#7A0930",
	contrastText: "#FFFFFF",
};

export const brown = {
	lighter: "#ae7d5a",
	light: "#a26a42",
	main: "#8b4513",
	dark: "#7d3e11",
	darker: "#61300d",
	contrastText: "#FFFFFF",
};

export const orange = {
	lighter: "#ff9e5d",
	light: "#ff9146",
	main: "#ff7518",
	dark: "#e66916",
	darker: "#cc5e13",
	contrastText: "#000000",
};

export const presetOptions = [
	{ name: "default", value: primary.main },
	{ name: "cyan", value: cyan.main },
	{ name: "purple", value: purple.main },
	{ name: "blue", value: blue.main },
	{ name: "orange", value: orange.main },
	{ name: "red", value: red.main },
	{ name: "brown", value: brown.main },
	{ name: "green", value: green.main },
];

export const getPrimary = (preset: string) => {
	const colors: Record<string, typeof primary> = {
		default: primary,
		cyan,
		purple,
		blue,
		orange,
		red,
		brown,
		green,
	};

	return colors[preset] || primary;
};
