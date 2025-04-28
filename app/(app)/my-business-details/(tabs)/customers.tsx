import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../../theme/provider";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Avatar from "@/components/ui/Avatar";

const customers = [
	{
		name: "John Doe",
		description: "Frequent buyer of electronic gadgets for personal use.",
		email: "john.doe@example.com",
		phone_number: "+1234567890",
		address: "123 Elm Street, Springfield, IL, 62701",
		date: "2025-04-01",
	},
	{
		name: "Sarah Lee",
		description: "Small business owner purchasing office supplies.",
		email: "sarah.lee@example.com",
		phone_number: "+0987654321",
		address: "456 Oak Avenue, Chicago, IL, 60601",
		date: "2025-04-02",
	},
	{
		name: "Michael Green",
		description: "Looking for eco-friendly products and sustainability solutions.",
		email: "michael.green@example.com",
		phone_number: "+1122334455",
		address: "789 Maple Road, Austin, TX, 73301",
		date: "2025-04-03",
	},
	{
		name: "Emily Clark",
		description: "Occasional shopper, interested in home improvement items.",
		email: "emily.clark@example.com",
		phone_number: "+2233445566",
		address: "101 Pine Street, San Francisco, CA, 94105",
		date: "2025-04-04",
	},
	{
		name: "David Johnson",
		description: "Purchases tech gadgets and accessories regularly.",
		email: "david.johnson@example.com",
		phone_number: "+3344556677",
		address: "202 Birch Lane, Miami, FL, 33101",
		date: "2025-04-05",
	},
	{
		name: "Laura Adams",
		description: "Interested in health and fitness products.",
		email: "laura.adams@example.com",
		phone_number: "+4455667788",
		address: "303 Cedar Avenue, New York, NY, 10001",
		date: "2025-04-06",
	},
	{
		name: "Chris Walker",
		description: "Looking for home appliances and kitchen gadgets.",
		email: "chris.walker@example.com",
		phone_number: "+5566778899",
		address: "404 Willow Street, Los Angeles, CA, 90001",
		date: "2025-04-07",
	},
	{
		name: "Olivia Brown",
		description: "A regular shopper for books and educational materials.",
		email: "olivia.brown@example.com",
		phone_number: "+6677889900",
		address: "505 Maple Road, Boston, MA, 02108",
		date: "2025-04-08",
	},
	{
		name: "James Miller",
		description: "Interested in gaming consoles and accessories.",
		email: "james.miller@example.com",
		phone_number: "+7788990011",
		address: "606 Pine Street, Seattle, WA, 98101",
		date: "2025-04-09",
	},
	{
		name: "Sophia Davis",
		description: "Purchasing items for home renovation projects.",
		email: "sophia.davis@example.com",
		phone_number: "+8899001122",
		address: "707 Oak Drive, Denver, CO, 80202",
		date: "2025-04-10",
	},
];

const CustomerHeader = () => {
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
					My Customers
				</Text>

				<Text
					style={{
						color: theme.palette.primary.contrastText,
						fontSize: 14,
					}}
				>
					{customers.length} Reviews in total
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

const CustomerCards = ({ item }: any) => {
	const { theme } = useTheme();

	return (
		<View
			style={{
				padding: 20,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				backgroundColor: theme.background.paper,
				shadowColor: theme.common.black,
				shadowOffset: { width: 0, height: 2 },
				borderRadius: 5,
				marginBottom: 10,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
				<View style={{ gap: 5 }}>
					<Avatar
						text={item.name}
						width={40}
						backgroundColor={theme.palette.primary.main}
						color={theme.palette.primary.contrastText}
						fontSize={20}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text.primary }}>{item.name}</Text>
					<Text style={{ color: "#888" }}>{item.email}</Text>
				</View>
			</View>
			<View style={{ marginTop: 10, gap: 5 }}>
				<Text style={{ color: theme.text.secondary }}>{item.description}</Text>

				<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
					<FontAwesome name="calendar" color={theme.text.main} />
					<Text style={{ color: theme.text.secondary }}> {item.date}</Text>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
					<Entypo name="old-phone" color={theme.text.main} />
					<Text style={{ color: theme.text.secondary }}> {item.date}</Text>
				</View>
			</View>
		</View>
	);
};

const CustomerFooterButton = () => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={{
				padding: 20,
				backgroundColor: theme.palette.primary.main,
				marginBottom: 20,
				alignItems: "center",
			}}
		>
			<Text
				style={{
					color: theme.palette.primary.contrastText,
					fontSize: 16,
					fontWeight: "bold",
				}}
			>
				Add New Customer
			</Text>
		</TouchableOpacity>
	);
};

const Customers = () => {
	const { theme } = useTheme();
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<FlatList
				data={customers}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <CustomerCards item={item} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListHeaderComponent={<CustomerHeader />}
				ListFooterComponent={<CustomerFooterButton />}
				
			/>
		</SafeAreaView>
	);
};

export default Customers;
