// app/_theme/theme-provider.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { palette } from "./palette";
import { createContrast } from "./contrast";
import { getPrimary } from "./presets";
import { typography } from "./typography";
import { shadows } from "./shadows";

type ThemeMode = "light" | "dark";
type ThemeContrast = "default" | "bold";
type ThemePreset = string;

interface ThemeContextType {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;

	contrast: ThemeContrast;
	setContrast: (contrast: ThemeContrast) => void;

	preset: ThemePreset;
	setPreset: (preset: ThemePreset) => void;

	theme: any;

	setModeFunction: (mode: ThemeMode) => void;
	setPresetFunction: (preset: ThemePreset) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<ThemeMode>("light");
	const [contrast, setContrast] = useState<ThemeContrast>("default");
	const [preset, setPreset] = useState<ThemePreset>("default");

	const setModeFunction = (newMode: ThemeMode) => {
		console.log("Setting mode to:", newMode);
		setMode(newMode);
	};

	const setPresetFunction = (newPreset: ThemePreset) => {
		console.log("Setting preset to:", newPreset);
		setPreset(newPreset);
	};

	const theme = useMemo(() => {
		const presets = { palette: { primary: getPrimary(preset) } };
		const contrastOptions = createContrast(contrast, mode);

		return {
			...palette(mode),
			...presets,
			...contrastOptions,
			typography,
			shadows: shadows(mode),
			shape: { borderRadius: 5, cardBorderRadius: 8 },
		};
	}, [mode, contrast, preset]);

	const memoizedTheme = useMemo(() => {
		return {
			mode,
			setMode,
			contrast,
			setContrast,
			preset,
			setPreset,
			theme,
			setModeFunction,
			setPresetFunction,
		};
	}, [theme, mode, contrast, preset]);

	return (
		<ThemeContext.Provider
			value={memoizedTheme}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export default ThemeProvider;
