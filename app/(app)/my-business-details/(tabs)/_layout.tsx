import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/theme";

const BusinessLayout = () => {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.theme.palette.primary.main,
				tabBarLabelStyle: { fontSize: 12 },
				tabBarStyle: {
					backgroundColor: theme.theme.background.default,
					borderTopWidth: 0,
					height: 60,
					elevation: 50,
				},
				headerShown: false, // Critical: Ensures no headers on tab screens
				tabBarHideOnKeyboard: true,
			}}
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
				name="messages"
				options={{
					title: "Messages",
					href: "/my-business-details/messages",
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
				name="customers"
				options={{
					title: "My Customers",
					href: "/my-business-details/customers",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={24} name="people" color={color} /> 
					),
				}}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({});

export default BusinessLayout;
