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
