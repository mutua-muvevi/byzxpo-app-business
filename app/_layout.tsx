import { SettingsProvider } from "@/components/settings/context";
import { useCustomFonts } from "@/hooks/use-fonts";
import ThemeProvider from "@/theme/provider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const RootLayout = () => {
	const fontsLoaded = useCustomFonts();

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SettingsProvider
			defaultSettings={{
				themeMode: "light", // "dark" | "light" | "system"
				themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
			}}
		>
			<ThemeProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="+not-found" />

					<Stack.Screen
						name="business-details/[id]"
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name="category/[id]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="my-business-details/[id]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="my-businesses"
						options={{ headerShown: false }}
					/>
				</Stack>

				{/* <StatusBar style="auto" animated /> */}
			</ThemeProvider>
		</SettingsProvider>
	);
};

const styles = StyleSheet.create({});

export default RootLayout;
