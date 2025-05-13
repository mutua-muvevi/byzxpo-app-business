import React, { useState, useEffect, Component } from "react";
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
import { useAnalytics } from "@/contexts/analytics/provider"; // Updated import
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import EditBusinessForm from "@/sections/business/form/edit";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import { LineChart } from "react-native-chart-kit";
import { logger } from "react-native-logs"; // For production logging

// Error Boundary Component
class ErrorBoundary extends Component<
	{ children: React.ReactNode },
	{ hasError: boolean; error?: string }
> {
	state = { hasError: false, error: undefined };

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error: error.message };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught:", error, errorInfo);
		logger.createLogger().error("ErrorBoundary:", { error: error.message, stack: error.stack });
	}

	render() {
		if (this.state.hasError) {
			return (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
				>
					<Text style={{ fontSize: 16, color: "#f00", textAlign: "center" }}>
						Something went wrong: {this.state.error || "Unknown error"}
					</Text>
					<TouchableOpacity
						style={{
							marginTop: 20,
							padding: 10,
							backgroundColor: "#007AFF",
							borderRadius: 5,
						}}
						onPress={() => this.setState({ hasError: false, error: undefined })}
					>
						<Text style={{ color: "#fff", fontWeight: "bold" }}>Retry</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return this.props.children;
	}
}

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
	const [openEditBusinessForm, setOpenEditBusinessForm] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const log = logger.createLogger(); // Production logging

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

	// Fetch analytics for current year
	useEffect(() => {
		if (!myBusiness?._id) {
			log.warn("No business ID for analytics fetch");
			return;
		}

		try {
			const now = new Date();
			const startDate = new Date(now.getFullYear(), 0, 1); // Jan 1
			const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999); // Dec 31
			log.info("Fetching analytics:", {
				businessId: myBusiness._id,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
			fetchAnalytics(myBusiness._id, startDate.toISOString(), endDate.toISOString()).catch(
				(err: any) => {
					log.error("Analytics fetch failed:", { error: err.message });
				},
			);
		} catch (error: any) {
			log.error("Error in analytics useEffect:", { error: error.message });
		}
	}, [myBusiness?._id, fetchAnalytics]);

	// Prepare chart data (12 months)
	const prepareChartData = (eventType: "click" | "impression") => {
		const labels: string[] = [];
		const data: number[] = [];

		// Generate 12 months for current year
		const now = new Date();
		const currentYear = now.getFullYear();

		try {
			// If no valid data, generate zeroed-out data
			if (!analytics?.dailyCounts || analytics.dailyCounts.length === 0 || analyticsError) {
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
				.filter((d : any) => d && d.eventType === eventType && d.date)
				.reduce((acc : any, curr : any) => {
					try {
						const date = new Date(curr.date);
						if (isNaN(date.getTime())) throw new Error(`Invalid date: ${curr.date}`);
						const key = `${date.getFullYear()}-${(date.getMonth() + 1)
							.toString()
							.padStart(2, "0")}`; // YYYY-MM
						acc[key] = (acc[key] || 0) + (curr.count || 0);
						return acc;
					} catch (err : any) {
						log.warn("Error processing analytics entry:", {
							entry: curr,
							error: err.message,
						});
						return acc;
					}
				}, {} as Record<string, number>);

			// Generate labels and data for 12 months
			for (let month = 1; month <= 12; month++) {
				const key = `${currentYear}-${month.toString().padStart(2, "0")}`;
				labels.push(
					new Date(currentYear, month - 1, 1).toLocaleString("default", {
						month: "short",
					}),
				);
				data.push(groupedData[key] || 0);
			}

			// Validate data
			if (!labels.length || !data.length || data.some((d) => isNaN(d))) {
				log.warn("Invalid chart data generated:", { labels, data });
				return prepareChartData(eventType); // Fallback to zeroed-out data
			}

			return { labels, data };
		} catch (error: any) {
			log.error("Error preparing chart data:", { eventType, error: error.message });
			// Return zeroed-out data as fallback
			for (let month = 1; month <= 12; month++) {
				labels.push(
					new Date(currentYear, month - 1, 1).toLocaleString("default", {
						month: "short",
					}),
				);
				data.push(0);
			}
			return { labels, data };
		}
	};

	const clickChartData = {
		labels: prepareChartData("click").labels,
		datasets: [
			{
				data: prepareChartData("click").data,
				color: () => primary?.main || "#0000FF", // Fallback blue
				strokeWidth: 2,
			},
		],
	};

	const impressionChartData = {
		labels: prepareChartData("impression").labels,
		datasets: [
			{
				data: prepareChartData("impression").data,
				color: () => success?.main || "#00FF00", // Fallback green
				strokeWidth: 2,
			},
		],
	};

	const chartConfig = {
		backgroundColor: theme?.background?.default || "#FFFFFF",
		backgroundGradientFrom: theme?.background?.default || "#FFFFFF",
		backgroundGradientTo: theme?.background?.default || "#FFFFFF",
		decimalPlaces: 0,
		color: () => theme?.text?.primary || "#000000",
		labelColor: () => theme?.text?.primary || "#000000",
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "6",
			strokeWidth: "2",
			stroke: primary?.main || "#0000FF",
		},
	};

	// Fallback UI for invalid state
	if (!theme || !primary || !success) {
		log.error("Invalid theme data", { theme });
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 16, color: "#f00" }}>Error: Theme data is missing</Text>
			</SafeAreaView>
		);
	}

	if (businessLoading) {
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
		<ErrorBoundary>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: theme.background.default }}
				edges={["top", "left", "right"]}
			>
				<StatusBar backgroundColor={primary.main} style="light" />
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={primary.main}
						/>
					}
					style={{ backgroundColor: theme.background.default }}
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
										log.warn("Logo image error:", {
											error: e.nativeEvent.error,
										})
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
								borderWidth: 1,
								borderColor: "#ccc",
								marginVertical: 5,
								borderStyle: "dashed",
							}}
						/>

						{/* Analytics Graphs */}
						<View style={{ paddingHorizontal: 10, gap: 20 }}>
							{analyticsLoading ? (
								<ActivityIndicator size="large" color={primary.main} />
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
											onDataPointClick={() => {}}
										/>
									</View>

									{/* Impressions Graph */}
									<View>
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
											style={{ borderRadius: 16, backgroundColor: red.main }} // Fixed red.primary to red.main
											onDataPointClick={() => {}}
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
							<View
								style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
							>
								<EditBusinessForm onClose={() => setOpenEditBusinessForm(false)} />
							</View>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</ErrorBoundary>
	);
};

export default MyBusinessDetails;
