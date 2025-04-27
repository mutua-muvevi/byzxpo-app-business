import { useAuth } from "@/auth";
import UnavailableContentPage from "@/components/ui/UnavailablePage";
import { useBusiness } from "@/contexts/business/fetch";
import { useTheme } from "@/theme";
import { truncateStr } from "@/utils/format-strings";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "../../theme/palette";

const imageHolderUri =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";

const HeaderComponent = () => {
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
					My Businesses
				</Text>

				<Text style={{ fontSize: 14, color: theme.palette.primary.contrastText }}>
					Manage your businesses here
				</Text>
			</View>
		</View>
	);
};

const BusinessCard = ({ business }: { business: any }) => {
	const { theme } = useTheme();
	const { setMySingleBusinessFunction } = useBusiness();

	const ALT_THUMBNAIL_IMAGE = imageHolderUri;
	const router = useRouter();

	const handleOpenBusiness = () => {
		setMySingleBusinessFunction(business);

		router.push("/(app)/my-business-details/(tabs)");
	};

	return (
		<TouchableOpacity onPress={handleOpenBusiness}>
			<View
				style={{
					flexDirection: "row",
					gap: 10,
					height: 80,
					width: "100%",
					backgroundColor: theme.background.paper,
				}}
			>
				<Image
					source={
						business?.thumbnail
							? { uri: business?.thumbnail }
							: { uri: ALT_THUMBNAIL_IMAGE }
					}
					style={{
						width: 80,
						height: 80,
						backgroundColor: theme.palette.primary.main,
					}}
				/>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text
						style={{
							color: theme.text.primary,
							fontWeight: "bold",
						}}
					>
						{truncateStr(business?.businessName, 20)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const BusinessFooterButton = () => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={{
				padding: 20,
				backgroundColor: theme.palette.primary.main,
				marginVertical: 10,
				alignItems: "center",
			}}
		>
			<Text
				style={{
					color: theme.palette.primary.contrastText,
					fontSize: 16,
					fontWeight: "bold",
				}}
			>
				Add New Business
			</Text>
		</TouchableOpacity>
	);
};

const MyBusinesses = () => {
	const { theme } = useTheme();
	const { myBusinesses } = useBusiness();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<StatusBar backgroundColor={theme.palette.primary.main} style="light" />
			<FlatList
				data={myBusinesses}
				keyExtractor={(item) => item._id.toString()}
				renderItem={({ item }) => <BusinessCard business={item} />}
				ListEmptyComponent={<UnavailableContentPage text="No Businesses" />}
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: theme.background.default }}
				ListHeaderComponent={HeaderComponent}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: 10,
							backgroundColor: theme.background.default,
						}}
					/>
				)}
				ListFooterComponent={<BusinessFooterButton />}
			/>
		</SafeAreaView>
	);
};

export default MyBusinesses;
