import { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/auth/provider";
import { Stack } from "expo-router";
import { BusinessProvider } from "@/contexts/business/fetch";
import { CategoryProvider } from "@/contexts/categories/fetch";
import { ActivityIndicator } from "react-native";
import { AuthGuard } from "@/auth";
import { EnquiriesContextProvider } from "@/contexts/enquiries/provider";
import { LeadsContextProvider } from "@/contexts/leads/provider";
import { ReviewsContextProvider } from "@/contexts/reviews/provider";
import { AnalyticsProvider } from "@/contexts/analytics/provider";

const AppLayout = () => {
	const { accessToken, loading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !accessToken) {
			router.replace("/(public)/login");
		}
	}, [loading, accessToken]);

	if (loading) return <ActivityIndicator size="large" />;
	if (!accessToken) return null;

	return (
		<AuthGuard>
			<BusinessProvider>
				<CategoryProvider>
					<EnquiriesContextProvider>
						<LeadsContextProvider>
							<ReviewsContextProvider>
								<AnalyticsProvider>
									<Stack>
										<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
										<Stack.Screen
											name="business-details/[id]"
											options={{ headerShown: false }}
										/>
										<Stack.Screen name="category/[id]" options={{ headerShown: false }} />
										<Stack.Screen
											name="my-business-details/(tabs)"
											options={{ headerShown: false }} // Header disabled
										/>
										<Stack.Screen name="my-businesses" options={{ headerShown: false }} />
										<Stack.Screen name="profile" options={{ headerShown: false }} />
										<Stack.Screen name="account" options={{ headerShown: false }} />
										<Stack.Screen name="edit" options={{ headerShown: false }} />
										<Stack.Screen name="settings" options={{ headerShown: false }} />
									</Stack>
								</AnalyticsProvider>
							</ReviewsContextProvider>
						</LeadsContextProvider>
					</EnquiriesContextProvider>
				</CategoryProvider>
			</BusinessProvider>
		</AuthGuard>
	);
};

export default AppLayout;
