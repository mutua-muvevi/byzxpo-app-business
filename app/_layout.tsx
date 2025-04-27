// import { AuthProvider, useAuth } from "@/auth/provider";
// import { SettingsProvider } from "@/components/settings/context";
// import { BusinessProvider } from "@/contexts/business/fetch";
// import { CategoryProvider } from "@/contexts/categories/fetch";
// import { useCustomFonts } from "@/hooks/use-fonts";
// import ThemeProvider, { useTheme } from "@/theme/provider";
// import { Slot, Stack, useRouter } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import { ActivityIndicator, StyleSheet, View } from "react-native";

// const RootLayout = () => {
// 	const fontsLoaded = useCustomFonts();

// 	useEffect(() => {
// 		if (fontsLoaded) {
// 			SplashScreen.hideAsync();
// 		}
// 	}, [fontsLoaded]);

// 	if (!fontsLoaded) {
// 		return null;
// 	}

// 	return (
// 		<AuthProvider>
// 			{/* <AuthGuard> */}
// 			<ThemeProvider>
// 				<SettingsProvider
// 					defaultSettings={{
// 						themeMode: "light", // "dark" | "light" | "system"
// 						themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
// 					}}
// 				>
// 					<BusinessProvider>
// 						<CategoryProvider>
// 							<Stack screenOptions={{ headerShown: false }}>
// 								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// 								<Stack.Screen name="+not-found" />

// 								<Stack.Screen
// 									name="business-details/[id]"
// 									options={{ headerShown: false }}
// 								/>

// 								<Stack.Screen
// 									name="category/[id]"
// 									options={{ headerShown: false }}
// 								/>
// 								<Stack.Screen
// 									name="my-business-details/[id]"
// 									options={{ headerShown: false }}
// 								/>
// 								<Stack.Screen
// 									name="my-businesses"
// 									options={{ headerShown: false }}
// 								/>
// 								<Stack.Screen name="profile" options={{ headerShown: false }} />
// 								<Stack.Screen name="login" options={{ headerShown: false }} />
// 							</Stack>
// 						</CategoryProvider>
// 					</BusinessProvider>
// 				</SettingsProvider>
// 			</ThemeProvider>
// 			{/* </AuthGuard> */}
// 		</AuthProvider>
// 	);
// };

// const AuthGuard = () => {
// 	const { accessToken, loading, fetchMe } = useAuth();
// 	const context = useAuth();
// 	const theme = useTheme();
// 	const router = useRouter();

// 	useEffect(() => {
// 		if (accessToken) {
// 			fetchMe();
// 		}
// 	}, [accessToken]);

// 	if (loading) {
// 		return (
// 			<View>
// 				<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
// 			</View>
// 		);
// 	}
// 	console.log("Auth context", context);

// 	if (!accessToken) {
// 		router.replace("/login");
// 		return;
// 	}

// 	return (
// 		<>
// 			<BusinessProvider>
// 				<CategoryProvider>
// 					<Stack screenOptions={{ headerShown: false }}>
// 						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// 						<Stack.Screen name="+not-found" />

// 						<Stack.Screen
// 							name="business-details/[id]"
// 							options={{ headerShown: false }}
// 						/>

// 						<Stack.Screen name="category/[id]" options={{ headerShown: false }} />
// 						<Stack.Screen
// 							name="my-business-details/[id]"
// 							options={{ headerShown: false }}
// 						/>
// 						<Stack.Screen name="my-businesses" options={{ headerShown: false }} />
// 						<Stack.Screen name="profile" options={{ headerShown: false }} />
// 						<Stack.Screen name="login" options={{ headerShown: false }} />
// 					</Stack>
// 				</CategoryProvider>
// 			</BusinessProvider>
// 		</>
// 	);
// };

// export default RootLayout;
import { Stack } from "expo-router";
import { AuthProvider } from "@/auth/provider";
import ThemeProvider from "@/theme/provider";
import { SettingsProvider } from "@/components/settings/context";

const RootLayout = () => (
	<AuthProvider>
		<ThemeProvider>
			<SettingsProvider
				defaultSettings={{ themeMode: "light", themeColorPresets: "default" }}
			>
				<Stack>
					<Stack.Screen name="(public)" options={{ headerShown: false }} />
					<Stack.Screen name="(app)" options={{ headerShown: false }} />
				</Stack>
			</SettingsProvider>
		</ThemeProvider>
	</AuthProvider>
);

export default RootLayout;
