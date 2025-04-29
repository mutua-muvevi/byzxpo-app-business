import Avatar from "@/components/ui/Avatar";
import { useTheme } from "@/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const conversations = [
	{
		title: "Blogger Clone Monetization",
		message:
			"Alice is looking for guidance on monetizing a blogging platform similar to blogger.com.",
		name: "Alice",
		date: "2024-07-03",
	},
	{
		title: "Logger Output Issue",
		message:
			"Bob resolved an issue where logger wasn't showing output in the app.listen callback due to the port already being in use.",
		name: "Bob",
		date: "2024-07-11",
	},
	{
		title: "Contact Us Page - Kenix Waste Solutions",
		message:
			"Charlie is working on a 'Contact Us' page for Kenix Waste Solutions, focusing on the title and subtitle for the support section.",
		name: "Charlie",
		date: "2024-08-10",
	},
	{
		title: "Status Object with Empty Fields",
		message:
			"David is working with a status object where empty title and description fields should not be displayed.",
		name: "David",
		date: "2024-08-13",
	},
	{
		title: "TypeScript Next.js Error",
		message:
			"Eva encountered a TypeScript error related to a non-existent property 'darker' on type 'PaletteColor'.",
		name: "Eva",
		date: "2024-08-15",
	},
	{
		title: "Next.js Root Directory Issue",
		message: "Frank is using `src/` as the root of their Next.js project.",
		name: "Frank",
		date: "2024-08-16",
	},
	{
		title: "Building First Next.js Project",
		message: "Grace is building their first project using Next.js 14.2, TypeScript, and MUI.",
		name: "Grace",
		date: "2024-08-16",
	},
	{
		title: "MUI Checkbox Override",
		message:
			"Hannah is overriding a MUI checkbox and wants to make the container size `xl` a bit larger.",
		name: "Hannah",
		date: "2024-09-23",
	},
	{
		title: "Routing Issue in Next.js",
		message:
			"Ian is looking for a better alternative for handling routing in a Next.js app, as the current approach is causing an error.",
		name: "Ian",
		date: "2024-08-16",
	},
	{
		title: "Generic Types in TypeScript",
		message:
			"Jack is learning TypeScript and is interested in adding different generics inside an `IPost` interface.",
		name: "Jack",
		date: "2024-08-17",
	},
	{
		title: "Sign-In Page in React Native",
		message:
			"Karen is working on a Sign-In page and encountered an issue with the keyboard not appearing when the input field is pressed.",
		name: "Karen",
		date: "2024-08-19",
	},
	{
		title: "Appwrite Session Issue in React Native",
		message:
			"Leo encountered an issue where the `account.createEmailSession` function is not recognized as a function in React Native.",
		name: "Leo",
		date: "2024-08-20",
	},
	{
		title: "Logistics Web App Project",
		message:
			"Maya is building a logistics web and mobile application for transporting goods, and wants to explore valuable solutions.",
		name: "Maya",
		date: "2024-09-03",
	},
	{
		title: "Appwrite Authentication and Database Integration",
		message:
			"Nate is working on integrating Appwrite authentication and database operations in a Next.js application after a successful login.",
		name: "Nate",
		date: "2024-09-28",
	},
	{
		title: "AuthGuard Component for Layouts",
		message:
			"Olivia wants to separate authentication logic into a reusable `AuthGuard` component for multiple layouts.",
		name: "Olivia",
		date: "2024-09-25",
	},
	{
		title: "Handling Error Responses in Next.js",
		message:
			"Paul is working on handling error responses from the backend, specifically fixing a 400 error turning into a 200 status on the frontend.",
		name: "Paul",
		date: "2024-10-02",
	},
	{
		title: "Server-Side Appwrite Integration in Next.js",
		message:
			"Quinn is considering a server-side approach to Appwrite using Next.js for handling sessions and admin clients.",
		name: "Quinn",
		date: "2024-09-29",
	},
	{
		title: "Truck/Fleet Management Application",
		message:
			"Rita is leaning towards building a truck/fleet management application and wants to explore solutions to justify a monthly fee of $18.",
		name: "Rita",
		date: "2024-09-03",
	},
	{
		title: "Market Research vs Track Management Tool",
		message:
			"Sam is deciding between building a market research tool or a track management tool, considering various factors like customer base and demand.",
		name: "Sam",
		date: "2024-09-03",
	},
	{
		title: "Role-Based Access in Next.js",
		message:
			"Tina is working on role-based access in a Next.js project using Appwrite for authentication and user management.",
		name: "Tina",
		date: "2024-09-25",
	},
];

const MessagesHeader = () => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				padding: 20,
				backgroundColor: theme.palette.primary.main,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 5,
			}}
		>
			<View>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: theme.palette.primary.contrastText,
					}}
				>
					My Messages
				</Text>

				<Text
					style={{
						color: theme.palette.primary.contrastText,
						fontSize: 14,
					}}
				>
					{conversations.length} Messages in total
				</Text>
			</View>

			<TouchableOpacity
				style={{
					padding: 10,
					backgroundColor: theme.success.main,
					borderRadius: 5,
					flexDirection: "row",
					gap: 5,
				}}
			>
				<Text
					style={{
						color: theme.success.contrastText,
						fontSize: 16,
						fontWeight: "bold",
					}}
				>
					Filter
				</Text>

				<FontAwesome5 name="filter" size={16} color={theme.palette.primary.contrastText} />
			</TouchableOpacity>
		</View>
	);
};

const MessagesCards = ({ item }: { item: (typeof conversations)[0] }) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				padding: 20,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				borderRadius: 10,
				marginBottom: 10,
				backgroundColor: theme.background.paper,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
				<View style={{ gap: 5 }}>
					<Avatar
						text={item.name}
						width={40}
						backgroundColor={theme.palette.primary.main}
						color={theme.palette.primary.contrastText}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text.primary }}>
						{item.name}
					</Text>
					<Text style={{ color: theme.text.secondary }}>{item.title}</Text>
				</View>
			</View>

			<View style={{ marginTop: 10, gap: 5 }}>
				<Text style={{ fontWeight: "bold", color: theme.text.primary }}>{item.title}</Text>

				<Text style={{ color: theme.text.secondary }}>{item.message}</Text>

				<View style={{ flexDirection: "row", alignItems: "flex-start", gap: 5 }}>
					<FontAwesome5 name="clock" size={16} color={theme.text.primary} />
					<Text style={{ color: theme.text.secondary }}>Last updated: {item.date}</Text>
				</View>
			</View>
		</View>
	);
};

const Messages = () => {
	const { theme } = useTheme();
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<FlatList
				data={conversations}
				keyExtractor={(item) => item.title}
				renderItem={({ item }) => <MessagesCards item={item} />}
				ListHeaderComponent={<MessagesHeader />}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</SafeAreaView>
	);
};

export default Messages;
