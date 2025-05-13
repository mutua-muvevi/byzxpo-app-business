import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	Modal,
	RefreshControl,
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
import { Ionicons } from "@expo/vector-icons";
import EditBusinessForm from "@/sections/business/form/edit";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";

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
	const {
		myBusiness,
		setBusinessToEditFunction,
		loading,
		fetchAllBusinesses,
		setMySingleBusinessFunction,
	} = useBusiness();
	const { theme } = useTheme();
	const { primary, red, success, warning, brown } = theme;
	const colors = [primary, red, success, warning, brown];
	const [openEditBusinessForm, setOpenEditBusinessForm] = React.useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const handleSetOpenModal = () => {
		if (myBusiness) {
			setBusinessToEditFunction(myBusiness);
		}
		setOpenEditBusinessForm(true);
	};

	// Handle pull-to-refresh
	const onRefresh = async () => {
		setRefreshing(true);
		try {
			// Assuming fetchBusiness is provided by useBusiness context
			const allBusinesses = await fetchAllBusinesses();

			const currentBusiness = allBusinesses?.find(
				(business) => business._id === myBusiness?._id,
			);

			if (currentBusiness) {
				setMySingleBusinessFunction(currentBusiness);
			}
		} catch (error) {
			console.error("Error refreshing business data:", error);
			// Optionally show an alert or toast for user feedback
		} finally {
			setRefreshing(false);
		}
	};

	if (loading) return <LoadingStateIndicator text="Loading, please wait..."/>;

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.background.default }}
			edges={["top", "left", "right"]}
		>
			<StatusBar backgroundColor={theme.palette.primary.main} style="light" />

			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={theme.palette.primary.main} // Customize refresh indicator color
					/>
				}
			>
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
							flexWrap: "wrap",
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
							<Text style={{ color: theme.text.secondary }}>
								{myBusiness?.basicInfo?.email || "Email Not Available"}
							</Text>
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
							onPress={handleSetOpenModal}
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

			<Modal
				visible={openEditBusinessForm}
				onRequestClose={() => setOpenEditBusinessForm(false)}
				animationType="fade"
				transparent={true}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
					}}
				>
					<View
						style={{
							width: "90%", // Fixed width
							height: "90%", // Fixed height
							backgroundColor: theme.background.paper,
							borderRadius: 5,
							padding: 10,
							position: "relative", // Allow absolute positioning of children
						}}
					>
						{/* Close Icon Button */}
						<TouchableOpacity
							style={{
								position: "absolute",
								top: 10,
								right: 10,
								padding: 5, // Smaller padding for icon button
								zIndex: 1, // Ensure it’s above other content
							}}
							onPress={() => setOpenEditBusinessForm(false)}
						>
							<Ionicons
								name="close"
								size={24} // Adjust size as needed
								color={theme.error.main} // Match your theme
							/>
						</TouchableOpacity>

						{/* Modal Content */}
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<EditBusinessForm onClose={() => setOpenEditBusinessForm(false)} />
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default MyBusinessDetails;
