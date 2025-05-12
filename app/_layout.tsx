// export default RootLayout;
import { Stack } from "expo-router";
import { AuthProvider } from "@/auth/provider";
import ThemeProvider from "@/theme/provider";
import { SettingsProvider } from "@/components/settings/context"
;import { SearchProvider } from '@/contexts/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<ThemeProvider>
				<SettingsProvider
					defaultSettings={{ themeMode: "light", themeColorPresets: "default" }}
				>
					<SearchProvider>
						<Stack>
							<Stack.Screen name="(public)" options={{ headerShown: false }} />
							<Stack.Screen name="(app)" options={{ headerShown: false }} />
						</Stack>
					</SearchProvider>
				</SettingsProvider>
			</ThemeProvider>
		</AuthProvider>
	</QueryClientProvider>
);

export default RootLayout;
