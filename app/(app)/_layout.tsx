import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/auth/provider";
import { Stack } from "expo-router";
import { BusinessProvider } from "@/contexts/business/fetch";
import { CategoryProvider } from "@/contexts/categories/fetch";
import { ActivityIndicator } from "react-native";

const AppLayout = () => {
	const { accessToken, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !accessToken) {
			router.replace("/(public)/login");
		}
	}, [loading, accessToken]);

	if (loading) return <ActivityIndicator size="large" />;
	if (!accessToken) return null;

	return (
		<BusinessProvider>
			<CategoryProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="business-details/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="category/[id]" options={{ headerShown: false }} />
					<Stack.Screen
						name="my-business-details/[id]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="my-businesses" options={{ headerShown: false }} />
					<Stack.Screen name="profile" options={{ headerShown: false }} />
				</Stack>
			</CategoryProvider>
		</BusinessProvider>
	);
};

export default AppLayout;
