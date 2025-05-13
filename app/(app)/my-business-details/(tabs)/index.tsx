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
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBusiness } from "@/contexts/business/fetch";
import { useAnalytics } from "@/contexts/analytics/provider";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import EditBusinessForm from "@/sections/business/form/edit";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import { LineChart } from "react-native-chart-kit";

const MyBusinessDetails = () => {
	const {
		myBusiness,
		setBusinessToEditFunction,
		loading,
		fetchAllBusinesses,
		setMySingleBusinessFunction,
	} = useBusiness();
	const { analytics, loading: analyticsLoading, error, fetchAnalytics } = useAnalytics();
	const { theme } = useTheme();
	const { primary, red, success, warning, brown } = theme;
	const [openEditBusinessForm, setOpenEditBusinessForm] = useState(false);
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
			const allBusinesses = await fetchAllBusinesses();
			const currentBusiness = allBusinesses?.find(
				(business) => business._id === myBusiness?._id,
			);
			if (currentBusiness) {
				setMySingleBusinessFunction(currentBusiness);
			}
		} catch (error) {
			console.error("Error refreshing business data:", error);
		} finally {
			setRefreshing(false);
		}
	};

	// Fetch analytics for current year
	useEffect(() => {
		if (myBusiness?._id) {
			const now = new Date();
			const startDate = new Date(now.getFullYear(), 0, 1); // Jan 1
			const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999); // Dec 31
			console.log("Fetching analytics:", { businessId: myBusiness._id, startDate, endDate });
			fetchAnalytics(myBusiness._id, startDate.toISOString(), endDate.toISOString());
		}
	}, [myBusiness?._id, fetchAnalytics]);

	// Prepare chart data (12 months)
	const prepareChartData = (eventType: "click" | "impression") => {
		const labels: string[] = [];
		const data: number[] = [];

		// Generate 12 months for current year
		const now = new Date();
		const currentYear = now.getFullYear();

		// If no data, generate zeroed-out data
		if (!analytics?.dailyCounts || analytics.dailyCounts.length === 0 || error) {
			for (let month = 1; month <= 12; month++) {
				labels.push(
					new Date(currentYear, month - 1, 1).toLocaleString("default", {
						month: "short",
					}),
				); // Jan, Feb, etc.
				data.push(0);
			}
			return { labels, data };
		}

		// Group data by month
		const groupedData = analytics.dailyCounts
			.filter((d) => d.eventType === eventType)
			.reduce((acc, curr) => {
				const date = new Date(curr.date);
				const key = `${date.getFullYear()}-${(date.getMonth() + 1)
					.toString()
					.padStart(2, "0")}`; // YYYY-MM
				acc[key] = (acc[key] || 0) + curr.count;
				return acc;
			}, {} as Record<string, number>);

		// Generate labels and data for 12 months
		for (let month = 1; month <= 12; month++) {
			const key = `${currentYear}-${month.toString().padStart(2, "0")}`;
			labels.push(
				new Date(currentYear, month - 1, 1).toLocaleString("default", { month: "short" }),
			); // Jan, Feb, etc.
			data.push(groupedData[key] || 0);
		}

		return { labels, data };
	};

	const clickChartData = {
		labels: prepareChartData("click").labels,
		datasets: [
			{
				data: prepareChartData("click").data,
				color: () => primary.main, // Blue for clicks
				strokeWidth: 2,
			},
		],
	};

	const impressionChartData = {
		labels: prepareChartData("impression").labels,
		datasets: [
			{
				data: prepareChartData("impression").data,
				color: () => success.main, // Green for impressions
				strokeWidth: 2,
			},
		],
	};

	const chartConfig = {
		backgroundColor: theme.background.default,
		backgroundGradientFrom: theme.background.default,
		backgroundGradientTo: theme.background.default,
		decimalPlaces: 0,
		color: () => theme.text.primary,
		labelColor: () => theme.text.primary,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "6",
			strokeWidth: "2",
			stroke: primary.main,
		},
	};

	if (loading) return <LoadingStateIndicator text="Loading, please wait..." />;

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
						tintColor={theme.palette.primary.main}
					/>
				}
				style={{ backgroundColor: theme.background.default, marginBottom: 50 }}
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

					{/* Analytics Graphs */}
					<View style={{ paddingHorizontal: 10, gap: 20 }}>
						{analyticsLoading ? (
							<ActivityIndicator size="large" color={theme.palette.primary.main} />
						) : (
							<>
								{/* Clicks Graph */}
								<View>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
											color: theme.text.primary,
											marginBottom: 10,
										}}
									>
										Clicks ({new Date().getFullYear()})
									</Text>
									<LineChart
										data={clickChartData}
										width={Dimensions.get("window").width - 40}
										height={200}
										chartConfig={chartConfig}
										bezier
										style={{ borderRadius: 16 }}
									/>
								</View>

								{/* Impressions Graph */}
								<View style={{flexDirection:'column', gap:2}}>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
											color: theme.text.primary,
											marginBottom: 10,
										}}
									>
										Impressions ({new Date().getFullYear()})
									</Text>
									<LineChart
										data={impressionChartData}
										width={Dimensions.get("window").width - 40}
										height={200}
										chartConfig={chartConfig}
										bezier
										style={{ borderRadius: 16, backgroundColor: red.primary }}
									/>
								</View>
							</>
						)}
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
