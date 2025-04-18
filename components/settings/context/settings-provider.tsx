import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCallback, useMemo, useState } from "react";
import { SettingsContext } from "./settings-context";

const STORAGE_KEY = "settings";

interface SettingsProviderProps {
	children: React.ReactNode;
	defaultSettings: object | any;
}

const SettingsProvider = ({
	children,
	defaultSettings,
}: SettingsProviderProps) => {
	const { state, update, reset } = useLocalStorage(
		STORAGE_KEY,
		defaultSettings,
	);

	const [openDrawer, setOpenDrawer] = useState(false);

	// drawer
	const onToggleDrawer = useCallback(() => {
		setOpenDrawer((prev: any) => !prev);
	}, []);

	const onCloseDrawer = useCallback(() => {
		setOpenDrawer(false);
	}, []);

	const memoizedValues = useMemo(
		() => ({
			...state,
			onUpdate: update,
			onReset: reset,

			//drawer
			open: openDrawer,
			onToggle: onToggleDrawer,
			onClose: onCloseDrawer,
		}),
		[reset, update, state, onToggleDrawer, onCloseDrawer, openDrawer],
	);

	return (
		<SettingsContext.Provider value={memoizedValues}>
			{children}
		</SettingsContext.Provider>
	);
}

export default SettingsProvider