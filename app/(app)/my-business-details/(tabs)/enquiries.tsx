import Avatar from "@/components/ui/Avatar";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import UnavailableContentPage from "@/components/ui/UnavailablePage";
import { useBusiness } from "@/contexts/business/fetch";
import { useEnquiries } from "@/contexts/enquiries/provider";
import FooterSection from "@/sections/footer/footer";
import { useTheme } from "@/theme";
import { fDate } from "@/utils/format-time";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ConversationHeader = ({ list }: { list: any }) => {
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
					My Enquiries
				</Text>

				<Text
					style={{
						color: theme.palette.primary.contrastText,
						fontSize: 14,
					}}
				>
					{list.length} Enquiries in total
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

const ConversationCards = ({ item }: { item: any }) => {
	const { theme } = useTheme();
	console.log("Item, ", item);
	return (
		<View
			style={{
				padding: 20,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				backgroundColor: theme.background.paper,
				borderRadius: 10,
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
					/>
				</View>

				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text.primary }}>
						{item.name}
					</Text>
					{item?.createdAt ? (
						<Text style={{ color: theme.text.secondary }}>
							{fDate(item?.createdAt)}
						</Text>
					) : null}
				</View>
			</View>

			<View style={{ marginTop: 10, gap: 5 }}>
				<Text style={{ fontWeight: "bold", color: theme.text.primary }}>
					{item?.subject}
				</Text>

				<Text style={{ color: theme.text.secondary }}>{item.message}</Text>
			</View>
		</View>
	);
};

const Conversations = () => {
	const { theme } = useTheme();
	const { fetchBusinessEnquiries, allBusinessEnquiriesLoading, businessEnquiries } =
		useEnquiries();
	const { myBusiness } = useBusiness();

	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(100);

	useEffect(() => {
		if (myBusiness) {
			fetchBusinessEnquiries(myBusiness._id, pageNumber, pageLimit);
		}
	}, []);
	console.log("Business Enquiries", businessEnquiries);

	return allBusinessEnquiriesLoading ? (
		<LoadingStateIndicator text="Loading Enquiries" />
	) : (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<FlatList
				data={businessEnquiries}
				renderItem={({ item }) => {
					return <ConversationCards item={item} />;
				}}
				keyExtractor={(item) => item._id.toString()}
				ListHeaderComponent={<ConversationHeader list={businessEnquiries} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListEmptyComponent={
					<UnavailableContentPage text="No Enquiries Present for this Business" />
				}
				refreshControl={
					<RefreshControl
						refreshing={allBusinessEnquiriesLoading}
						onRefresh={() => {
							if (myBusiness) {
								fetchBusinessEnquiries(myBusiness._id, pageNumber, pageLimit);
							}
						}}
					/>
				}
				ListFooterComponent={
					<FooterSection
						pageNumber={pageNumber}
						setPageNumber={setPageNumber}
						pageLimit={pageLimit}
						setLimit={setPageLimit}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Conversations;
