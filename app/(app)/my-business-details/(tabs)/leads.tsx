import Avatar from "@/components/ui/Avatar";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import NavHeader from "@/components/ui/NavHeader";
import UnavailableContentPage from "@/components/ui/UnavailablePage";
import { useBusiness } from "@/contexts/business/fetch";
import { useLeads } from "@/contexts/leads/provider";
import { useTheme } from "@/theme";
import { fDate } from "@/utils/format-time";
import { FontAwesome5, Foundation, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LeadHeader = ({ list }: { list: any }) => {
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
					My Leads
				</Text>

				<Text
					style={{
						color: theme.palette.primary.contrastText,
						fontSize: 14,
					}}
				>
					{list.length} Leads in total
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

const LeadCards = ({ item }: { item: any }) => {
	const { theme } = useTheme();

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
				<View style={{ flexDirection: "row", alignItems: "flex-start", gap: 5 }}>
					<MaterialIcons name="email" size={16} color={theme.text.primary} />
					<Text style={{ color: theme.text.secondary }}> {item.email}</Text>
				</View>
				{item?.phone ? (
					<View style={{ flexDirection: "row", alignItems: "flex-start", gap: 5 }}>
						<Foundation name="telephone" size={16} color={theme.text.primary} />
						<Text style={{ color: theme.text.secondary }}> {item.phone}</Text>
					</View>
				) : null}
			</View>
		</View>
	);
};

const Leads = () => {
	const { theme } = useTheme();
	const { fetchBusinessLeads, allBusinessLeadsLoading, businessLeads } = useLeads();
	const { myBusiness } = useBusiness();

	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(100);

	useEffect(() => {
		if (myBusiness) {
			fetchBusinessLeads(myBusiness._id, pageNumber, pageLimit);
		}
	}, []);
	console.log("Business Leads", myBusiness);

	return allBusinessLeadsLoading ? (
		<LoadingStateIndicator text="Loading Leads" />
	) : (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<NavHeader headerTitle="Leads" backUrl="/my-business-details"  />
			<FlatList
				data={businessLeads}
				renderItem={({ item }) => {
					return <LeadCards item={item} />;
				}}
				keyExtractor={(item) => item._id.toString()}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListEmptyComponent={<UnavailableContentPage text="No Leads Present" />}
				refreshControl={
					<RefreshControl
						refreshing={allBusinessLeadsLoading}
						onRefresh={() => {
							if (myBusiness) {
								fetchBusinessLeads(myBusiness._id, pageNumber, pageLimit);
							}
						}}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Leads;
