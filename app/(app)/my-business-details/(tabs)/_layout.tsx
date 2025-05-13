import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/theme";

const BusinessLayout = () => {
	const { theme } = useTheme();

	// Custom tab bar component to add shadow view
	const CustomTabBar = ({ state, descriptors, navigation }: any) => {
		return (
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
				}}
			>
				{/* Shadow line at the top */}
				<View
					style={{
						height: 1,
						backgroundColor: theme.text.primary,
						opacity: 0.1, // Subtle shadow effect
						...Platform.select({
							ios: {
								shadowColor: theme.text.primary,
								shadowOffset: { width: 0, height: -1 },
								shadowOpacity: 0.2,
								shadowRadius: 2,
							},
							android: {
								elevation: 2, // Small elevation for Android shadow
							},
						}),
					}}
				/>
				{/* Default tab bar content */}
				<View
					style={{
						flexDirection: "row",
						height: 60,
						borderTopWidth: 0,
						...Platform.select({
							ios: {
								shadowColor: theme.common.black, // Use theme.common.black
								shadowOffset: { width: 0, height: -2 },
								shadowOpacity: 0.15,
								shadowRadius: 4,
							},
							android: {
								elevation: 8, // Adjusted for a balanced shadow
							},
						}),

						backgroundColor: theme.background.default,
					}}
				>
					{state.routes.map((route: any, index: number) => {
						const { options } = descriptors[route.key];
						const label = options.title || route.name;
						const isFocused = state.index === index;

						const onPress = () => {
							const event = navigation.emit({
								type: "tabPress",
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}
						};

						return (
							<View key={route.key} style={styles.tabButton}>
								<View
									onTouchEnd={onPress} // Use onTouchEnd for better touch handling
									style={{
										alignItems: "center",
										justifyContent: "center",
										flex: 1,
									}}
								>
									{options.tabBarIcon?.({
										color: isFocused
											? theme.palette.primary.main
											: theme.text.secondary,
										focused: isFocused,
										size: 24,
									})}
									<Text
										style={{
											fontSize: 12,
											color: isFocused
												? theme.palette.primary.main
												: theme.text.secondary,
										}}
									>
										{label}
									</Text>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		);
	};

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.palette.primary.main,
				tabBarLabelStyle: { fontSize: 12 },
				headerShown: false, // Critical: Ensures no headers on tab screens
				tabBarHideOnKeyboard: true,
			}}
			tabBar={CustomTabBar} // Use custom tab bar
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Overview",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={24} name="analytics" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="enquiries"
				options={{
					title: "Enquiries",
					href: "/my-business-details/enquiries",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={24} name="message" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="reviews"
				options={{
					title: "Reviews",
					href: "/my-business-details/reviews",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={24} name="rate-review" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="leads"
				options={{
					title: "My Leads",
					href: "/my-business-details/leads",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={24} name="people" color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({
	tabButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default BusinessLayout;
