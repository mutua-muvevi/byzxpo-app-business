import React, { useState, useEffect } from "react";
import {
	Image,
	ImageBackground,
	Modal,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBusiness } from "@/contexts/business/fetch";
import { useAnalytics } from "@/contexts/analytics/provider";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import EditBusinessForm from "@/sections/business/form/edit";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import { logger } from "react-native-logs";
import NavHeader from "@/components/ui/NavHeader";

const MyBusinessDetails = () => {
	const {
		myBusiness,
		setBusinessToEditFunction,
		loading: businessLoading,
		fetchAllBusinesses,
		setMySingleBusinessFunction,
	} = useBusiness();
	const {
		analytics,
		loading: analyticsLoading,
		error: analyticsError,
		fetchAnalytics,
	} = useAnalytics();

	const { theme } = useTheme();
	const { primary, red, success, warning, brown } = theme || {};
	const colors = [primary, red, success, warning, brown].filter(Boolean); // Filter out undefined
	const [openEditBusinessForm, setOpenEditBusinessForm] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const log = logger.createLogger();

	// Log initial state for debugging
	useEffect(() => {
		log.info("Initial state:", {
			myBusiness: myBusiness ? { _id: myBusiness._id, name: myBusiness.businessName } : null,
			analytics: analytics
				? { dailyCounts: analytics.dailyCounts, totals: analytics.totals }
				: null,
			theme: theme ? { primaryMain: primary?.main, successMain: success?.main } : null,
		});
	}, [myBusiness, analytics, theme]);

	const handleSetOpenModal = () => {
		if (myBusiness) {
			setBusinessToEditFunction(myBusiness);
			setOpenEditBusinessForm(true);
		} else {
			log.warn("No business data to edit");
		}
	};

	// Handle pull-to-refresh
	const onRefresh = async () => {
		setRefreshing(true);
		try {
			const allBusinesses = await fetchAllBusinesses();
			const currentBusiness = allBusinesses?.find(
				(business) => business?._id === myBusiness?._id,
			);
			if (currentBusiness) {
				setMySingleBusinessFunction(currentBusiness);
			} else {
				log.warn("Current business not found in refreshed data");
			}
		} catch (error: any) {
			log.error("Error refreshing business data:", { error: error.message });
		} finally {
			setRefreshing(false);
		}
	};
	console.log("biizzzzzzzzzz", myBusiness);

	// Fetch analytics for current year
	useEffect(() => {
		if (!myBusiness?._id) {
			log.warn("No business ID for analytics fetch");
			return;
		}

		try {
			const now = new Date();
			const startDate = new Date(now.getFullYear(), 0, 1); // Jan 1, 2025
			const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999); // Dec 31, 2025
			log.info("Fetching analytics:", {
				businessId: myBusiness._id,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
			fetchAnalytics(myBusiness._id, startDate.toISOString(), endDate.toISOString()).catch(
				(err) => {
					log.error("Analytics fetch failed:", {
						error: err.message,
						response: err.response?.data,
					});
				},
			);
		} catch (error: any) {
			log.error("Error in analytics fetch:", { error: error.message });
		}
	}, [myBusiness?._id, fetchAnalytics]);

	// Prepare card data
	const todaysCounts = [
		{
			name: "Today's Clicks",
			value: analytics?.dailyCounts?.find((d) => d.eventType === "click")?.count || 0,
		},
		{
			name: "Today's Impressions",
			value: analytics?.dailyCounts?.find((d) => d.eventType === "impression")?.count || 0,
		},
	];

	const totals = [
		{
			name: "Total Clicks",
			value: analytics?.totals?.find((t) => t.eventType === "click")?.count || 0,
		},
		{
			name: "Total Impressions",
			value: analytics?.totals?.find((t) => t.eventType === "impression")?.count || 0,
		},
	];

	const otherImportantCounts = [
		{
			name: "Total Enquiries",
			value: myBusiness?.enquiries?.length || 0,
		},
		{
			name: "Total Leads",
			value: myBusiness?.leads?.length || 0,
		},
		{
			name: "Total Reviews",
			value: myBusiness?.reviews?.length || 0,
		},
	];

	// Validate card data
	if (analytics?.dailyCounts && analytics.dailyCounts.some((d) => typeof d.count !== "number")) {
		log.warn("Invalid dailyCounts data:", { dailyCounts: analytics.dailyCounts });
	}
	if (analytics?.totals && analytics.totals.some((t) => typeof t.count !== "number")) {
		log.warn("Invalid totals data:", { totals: analytics.totals });
	}

	// Fallback for invalid theme
	if (!theme || !primary || !success) {
		log.error("Invalid theme data", { theme });
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 16, color: "#f00" }}>Error: Theme data is missing</Text>
			</SafeAreaView>
		);
	}

	if (businessLoading || analyticsLoading) {
		return <LoadingStateIndicator text="Loading, please wait..." />;
	}

	if (!myBusiness) {
		log.warn("No business data available");
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 16, color: theme.text.primary }}>
					No business data available
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.background.default }}
			edges={["top", "left", "right"]}
		>
			<NavHeader headerTitle="Overview" backUrl="/profile"  />
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={primary.main}
					/>
				}
				style={{ backgroundColor: theme.background.default, marginBottom: 60 }}
			>
				<ImageBackground
					source={{
						uri:
							myBusiness?.thumbnail ||
							myBusiness?.logo ||
							"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg",
					}}
					style={{
						width: "100%",
						height: 150,
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "flex-start",
						marginBottom: 25,
					}}
					onError={(e) =>
						log.warn("ImageBackground error:", { error: e.nativeEvent.error })
					}
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
								source={{ uri: myBusiness.logo }}
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
								alt={`${myBusiness.businessName} logo`}
								onError={(e) =>
									log.warn("Logo image error:", { error: e.nativeEvent.error })
								}
							/>
						) : null}
					</View>
				</ImageBackground>

				<View style={{ padding: 5, gap: 10 }}>
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
								{myBusiness.businessName || "Unnamed Business"}
							</Text>
							<Text style={{ color: theme.text.secondary }}>
								{myBusiness.basicInfo?.email || "Email Not Available"}
							</Text>
						</View>
						<TouchableOpacity
							style={{
								backgroundColor: primary.main,
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
									color: primary.contrastText,
									fontWeight: "bold",
								}}
							>
								Edit Business
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							borderWidth: 0.9,
							borderColor: "#ccc",
							marginVertical: 5,
							borderStyle: "dashed",
						}}
					/>

					{/* Other importand info */}
					<View>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								color: theme.text.secondary,
								marginBottom: 10,
							}}
						>
							Primary info
						</Text>
						{otherImportantCounts.map((item, index) => (
							<View
								key={`total-${index}`}
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

					<View
						style={{
							borderWidth: 0.9,
							borderColor: "#ccc",
							marginVertical: 5,
							borderStyle: "dashed",
						}}
					/>

					{/* Today's Counts Section */}
					<View>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								color: theme.text.secondary,
								marginBottom: 10,
							}}
						>
							Today's Counts
						</Text>
						{todaysCounts.map((item, index) => (
							<View
								key={`today-${index}`}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									paddingVertical: 5,
									paddingHorizontal: 10,
									backgroundColor: colors[index + 3 % colors.length].main,
									borderRadius: 5,
									marginVertical: 5,
									height: 50,
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: colors[index + 3 % colors.length].contrastText,
									}}
								>
									{item.name}
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										color: colors[index + 3 % colors.length].contrastText,
									}}
								>
									{item.value}
								</Text>
							</View>
						))}
					</View>

					<View
						style={{
							borderWidth: 0.9,
							borderColor: "#ccc",
							marginVertical: 5,
							borderStyle: "dashed",
						}}
					/>

					{/* Totals Section */}
					<View>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								color: theme.text.secondary,
								marginBottom: 10,
							}}
						>
							Total Counts
						</Text>
						{totals.map((item, index) => (
							<View
								key={`total-${index}`}
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
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					}}
				>
					<View
						style={{
							width: "90%",
							height: "90%",
							backgroundColor: theme.background.paper,
							borderRadius: 5,
							padding: 10,
							position: "relative",
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								top: 10,
								right: 10,
								padding: 5,
								zIndex: 1,
							}}
							onPress={() => setOpenEditBusinessForm(false)}
						>
							<Ionicons name="close" size={24} color={theme.error.main} />
						</TouchableOpacity>
						<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
							<EditBusinessForm onClose={() => setOpenEditBusinessForm(false)} />
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default MyBusinessDetails;
