import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const createMapStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
		},
		map: {
			width: "100%",
			height: "100%",
		},
	});

const MapComponent = () => {
	const theme = useTheme();
	const styles = createMapStyles(theme);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider="google" showsUserLocation showsMyLocationButton />
		</View>
	);
};

export default MapComponent;
