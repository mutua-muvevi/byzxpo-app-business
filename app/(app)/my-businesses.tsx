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
		<View style={{ backgroundColor: theme.palette.primary.lighter, padding: 10 }}>
			<Text style={{ fontSize: 20, fontWeight: "bold", color: theme.palette.primary.contrastText }}>My Businesses</Text>
			<Text style={{ fontSize: 14, color: theme.palette.primary.contrastText }}>
				Manage your businesses here
			</Text>
		</View>
	);
};

const createBusinessCardStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background.default,
			borderRadius: theme.shape.borderRadius,
			marginRight: 10,
			height: 150,
			width: "100%",
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 20 },
		},
		thumbnail: {
			width: "100%",
			height: 80,
			borderTopLeftRadius: theme.shape.borderRadius,
			borderTopRightRadius: theme.shape.borderRadius,
		},
		contentContainer: {
			padding: 5,
			gap: 2,
		},
		businessName: {
			fontSize: 12,
			color: theme.text.secondary,
			fontWeight: "bold",
		},
		otherText: {
			fontSize: 12,
			color: theme.text.secondary,
			fontFamily: theme.typography.fontFamily,
		},
		locationSection: {
			flexDirection: "row",
			gap: 2,
			alignItems: "center",
			justifyContent: "flex-start",
		},
		ratingSection: {
			flexDirection: "row",
			gap: 2,
			alignItems: "center",
			justifyContent: "flex-start",
		},
	});

const BusinessCard = ({ business }: { business: any }) => {
	const { theme } = useTheme();
	const { setMySingleBusinessFunction } = useBusiness();
	const styles = createBusinessCardStyle(theme);
	const ALT_THUMBNAIL_IMAGE = imageHolderUri;
	const router = useRouter();

	const handleOpenBusiness = () => {
		setMySingleBusinessFunction(business);

		router.push("/(app)/my-business-details/(tabs)");
	};

	return (
		<TouchableOpacity onPress={handleOpenBusiness}>
			<View style={styles.container}>
				<Image
					source={{ uri: business.logo || business.thumbnail || ALT_THUMBNAIL_IMAGE }}
					style={styles.thumbnail}
				/>
				<View style={styles.contentContainer}>
					<Text style={styles.businessName}>
						{business.businessName
							? truncateStr(business.businessName, 18)
							: "Business Name"}
					</Text>
					{business?.location && (
						<View style={styles.locationSection}>
							<Ionicons name="location" size={12} color={theme.text.secondary} />
							<Text style={styles.otherText}>
								{truncateStr(
									`${business.location.city}, ${business.location.country}`,
									18,
								)}
							</Text>
						</View>
					)}
					{business.basicInfo?.phone && (
						<View style={styles.locationSection}>
							<Entypo name="old-phone" size={12} color={theme.text.secondary} />
							<Text style={styles.otherText}>
								{truncateStr(business.basicInfo.phone, 18)}
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

const MyBusinesses = () => {
	const { theme } = useTheme();
	const { myBusinesses } = useBusiness();
	console.log("myBusinesses", myBusinesses);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.default }}>
			<StatusBar backgroundColor={theme.palette.primary.main} style="light" />
			<View>
				<FlatList
					data={myBusinesses}
					keyExtractor={(item) => item._id.toString()}
					renderItem={({ item }) => (
						<View
							style={{
								backgroundColor: theme.background.default,
								padding: 10,
								borderRadius: 5,
								marginBottom: 10,
								width: "50%",
								overflow: "hidden",
							}}
						>
							<BusinessCard business={item} />
						</View>
					)}
					ListEmptyComponent={<UnavailableContentPage text="No Businesses" />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 20 }}
					style={{ backgroundColor: theme.background.default }}
					ListHeaderComponent={HeaderComponent}
					numColumns={2}
				/>
			</View>
		</SafeAreaView>
	);
};

export default MyBusinesses;
