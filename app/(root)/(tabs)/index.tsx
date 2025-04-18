import Search from "@/sections/home/search";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
	return (
		<View style={styles.container}>
			<Search/>
			<Text>HorizontalScroll Sponsored Businesses</Text>

			<View>
				<Text> Categories </Text>
				<Text> Businesses in that categories</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
	},
});

export default Index;
