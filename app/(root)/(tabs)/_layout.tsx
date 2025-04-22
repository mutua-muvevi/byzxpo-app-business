import { useTheme } from "@/theme";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "../../../theme/palette";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

const TabLayout = () => {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.theme.palette.primary.main,
				tabBarLabelStyle: { fontSize: 12 },
				tabBarStyle: {
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					elevation: 50,
					backgroundColor: theme.theme.background.default ,
					borderTopWidth: 0,
					height: 60,
					borderTopColor: theme.theme.palette.divider,
				},
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarHideOnKeyboard: true,
			}}
			initialRouteName="index"
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={25} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: "Categories",
					tabBarIcon: ({ color }) => (
						// @ts-ignore
						<IconSymbol size={25} name="category.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={25} name="message.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						// @ts-ignore
						<IconSymbol size={25} name="account.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({});

export default TabLayout;
