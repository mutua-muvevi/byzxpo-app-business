import { useTheme } from "@/theme";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { palette, common } from '../../../theme/palette';
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
	const { theme } = useTheme();

	// Custom tab bar component to add shadow view
	const CustomTabBar = ({ state, descriptors, navigation } : any) => {
		return (
			<View style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
			}}>
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
					style={[
						{
							flexDirection: "row",
							height: 60,
							...Platform.select({
								ios: {
									shadowColor: theme.common.black,
									shadowOffset: { width: 0, height: -2 },
									shadowOpacity: 0.15,
									shadowRadius: 4,
								},
								android: {
									elevation: 8, // Adjusted for a balanced shadow
								},
							}),
							backgroundColor: theme.background.default,
						},
					]}
				>
					{state.routes.map((route : any, index : number) => {
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
							<HapticTab key={route.key} onPress={onPress} style={styles.tabButton}>
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
							</HapticTab>
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
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarHideOnKeyboard: true,
			}}
			tabBar={CustomTabBar} // Use custom tab bar
			initialRouteName="index"
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={24} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: "Categories",
					tabBarIcon: ({ color }) => (
						// @ts-ignore
						<IconSymbol size={24} name="category.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookmark"
				options={{
					title: "Bookmarks",
					tabBarIcon: ({ color }) => (
						// @ts-ignore
						<Ionicons size={20} name="bookmarks-sharp" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={24} name="message.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						// @ts-ignore
						<IconSymbol size={24} name="account.fill" color={color} />
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

export default TabLayout;
