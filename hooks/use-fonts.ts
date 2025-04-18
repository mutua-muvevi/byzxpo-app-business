// app/hooks/useFonts.ts
import { useFonts } from "expo-font";

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		"PublicSans-Regular": require("../assets/fonts/PublicSans-Regular.ttf"),
		"PublicSans-Medium": require("../assets/fonts/PublicSans-Medium.ttf"),
		"PublicSans-SemiBold": require("../assets/fonts/PublicSans-SemiBold.ttf"),
		"PublicSans-Bold": require("../assets/fonts/PublicSans-Bold.ttf"),
		"PublicSans-ExtraBold": require("../assets/fonts/PublicSans-ExtraBold.ttf"),
		"Barlow-Regular": require("../assets/fonts/Barlow-Regular.ttf"),
		"Barlow-Medium": require("../assets/fonts/Barlow-Medium.ttf"),
		"Barlow-SemiBold": require("../assets/fonts/Barlow-SemiBold.ttf"),
		"Barlow-Bold": require("../assets/fonts/Barlow-Bold.ttf"),
		"Barlow-ExtraBold": require("../assets/fonts/Barlow-ExtraBold.ttf"),
	});

	return fontsLoaded;
};
