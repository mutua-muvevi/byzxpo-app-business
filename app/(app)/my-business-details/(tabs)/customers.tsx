import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../../theme/provider";

const CustomerHeader = () => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				padding: 20,
				backgroundColor: theme.palette.primary.main,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
					color: theme.palette.primary.contrastText,
				}}
			>
				My Customers
			</Text>
		</View>
	);
};

const CustomerCards = ({ item }: { item: string }) => {
	return (
		<View
			style={{
				padding: 20,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				backgroundColor: "#fff",
				borderRadius: 10,
				marginBottom: 10,
			}}
		>
			<Text style={{ fontSize: 16 }}>{item}</Text>

			<Text style={{ color: "#888" }}>Customer details go here</Text>
			<View style={{ marginTop: 10 }}>
				<Text style={{ color: "#888" }}>Contact: 123-456-7890</Text>
				<Text style={{ color: "#888" }}>
					Email: {item.toLowerCase().replace(" ", ".")}@example.com
				</Text>
			</View>
		</View>
	);
};

const Customers = () => {
	const myMadeUpCostomers = Array.from({ length: 100 }, (_, i) => `Customer ${i + 1}`);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				data={myMadeUpCostomers}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <CustomerCards item={item} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListHeaderComponent={<CustomerHeader />}
			/>
		</SafeAreaView>
	);
};

export default Customers;
