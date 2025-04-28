import React from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	Touchable,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBusiness } from "@/contexts/business/fetch";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/theme";
import { TouchableOpacity } from "react-native";

const randomData = [
	{
		name: "impressions",
		value: 1000,
	},
	{
		name: "clicks",
		value: 500,
	},
	{
		name: "conversions",
		value: 50,
	},
	{
		name: "customers",
		value: 20,
	},
	{
		name: "enquiries",
		value: 10,
	},
	{
		name: "leads",
		value: 5,
	},
	{
		name: "sales",
		value: 2,
	},
	{
		name: "revenue",
		value: 1000,
	},
];

const MyBusinessDetails = () => {
	const { myBusiness } = useBusiness();
	const { theme } = useTheme();
	const { primary, red, success, warning, brown } = theme;
	const colors = [primary, red, success, warning, brown];

	console.log("useTHEME", theme);
	console.log("Mybusibness", myBusiness);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }} edges={["top", "left", "right"]}>
			<StatusBar backgroundColor={theme.palette.primary.main} style="light" />

			<ScrollView>
				<ImageBackground
					source={{
						uri: (myBusiness?.thumbnail ||
							myBusiness?.logo ||
							"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg") as string,
					}}
					style={{
						width: "100%",
						height: 150,
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "flex-start",
						marginBottom: 25,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "flex-start",
						}}
					>
						{myBusiness?.logo ? (
							<Image
								source={{ uri: myBusiness?.logo }}
								style={{
									width: 100,
									height: 100,
									borderRadius: 50,
									borderWidth: 2.5,
									borderColor: theme.background.default,
									marginLeft: 5,
									position: "relative",
									top: 25,
								}}
								alt={`${myBusiness?.businessName} logo`}
							/>
						) : null}
					</View>
				</ImageBackground>

				<View
					style={{
						padding: 5,
						gap: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: 10,
							justifyContent: "space-between",
							alignItems: "flex-end",
						}}
					>
						<View>
							<Text
								style={{
									fontSize: 20,
									color: theme.text.primary,
									fontWeight: "bold",
								}}
							>
								{myBusiness?.businessName}
							</Text>
							<Text style={{ color: theme.text.secondary }}>{myBusiness?.basicInfo?.email || "Email Not Available"}</Text>
						</View>

						<TouchableOpacity
							style={{
								backgroundColor: theme.palette.primary.main,
								padding: 10,
								borderRadius: 5,
								justifyContent: "center",
								alignItems: "center",
								height: 40,
							}}
							onPress={() => {
								// Handle button press
							}}
						>
							<Text
								style={{
									color: theme.palette.primary.contrastText,
									fontWeight: "bold",
								}}
							>
								Edit Business
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							borderWidth: 1,
							borderColor: "#ccc",
							marginVertical: 5,
							borderStyle: "dashed",
						}}
					/>

					{randomData.map((item, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingVertical: 5,
								paddingHorizontal: 10,
								backgroundColor: colors[index % colors.length].main,
								borderRadius: 5,
								marginVertical: 5,
								height: 50,
							}}
						>
							<Text
								style={{
									fontWeight: "bold",
									color: colors[index % colors.length].contrastText,
								}}
							>
								{item.name}
							</Text>
							<Text
								style={{
									fontWeight: "bold",
									color: colors[index % colors.length].contrastText,
								}}
							>
								{item.value}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyBusinessDetails;
