import { useBusiness } from "@/contexts/business/fetch";
import { useTheme } from "@/theme";
import { BusinessInterface } from "@/types/business";
import { truncateStr } from "@/utils/format-strings";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { palette } from '../../theme/palette';
import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const ALT_THUMBNAIL_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";
const ALT_LOGO_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business%20logo%20here.jpg";

interface SlideCardProps {
	business: BusinessInterface;
}

const createSlideCardTheme = (theme: any) =>
	StyleSheet.create({
		
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
			color: theme.text.primary,
			fontFamily: theme.typography.fontFamily,
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
	});

const SlideCard = ({ business }: SlideCardProps) => {
	const { theme } = useTheme();
	const styles = createSlideCardTheme(theme);
	const router = useRouter();
	const { setSingleBusinessFunction } = useBusiness();

	const handleOpenBusiness = () => {
		setSingleBusinessFunction(business);

		router.push({
			pathname: "/business-details/[id]",
			params: { id: business._id },
		});
	};

	return (
		<TouchableOpacity onPress={handleOpenBusiness}>
			<View style={{backgroundColor: theme.background.paper,
			borderRadius: theme.shape.borderRadius,
			marginRight: 10,
			height: 150,
			width: 120,
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 20 },}}>
				{business.thumbnail ||
				business.logo ||
				//@ts-ignore
				business.otherImages[0] ? (
					<Image
						source={{
							uri:
								business.thumbnail ||
								business.logo ||
								//@ts-ignore
								business?.otherImages[0],
						}}
						style={{
							width: "100%",
							height: 80,
							borderTopLeftRadius: theme.shape.borderRadius,
							borderTopRightRadius: theme.shape.borderRadius,
						}}
						resizeMode="cover"
					/>
				) : (
					<Image
						source={{ uri: ALT_THUMBNAIL_IMAGE }}
						style={{
							width: "100%",
							height: 80,
							borderTopLeftRadius: theme.shape.borderRadius,
							borderTopRightRadius: theme.shape.borderRadius,
							
						}}
						resizeMode="cover"
					/>
				)}

				<View style={styles.contentContainer}>
					<Text style={styles.businessName}>
						{business.businessName
							? truncateStr(business.businessName, 18)
							: "Business Name"}
					</Text>

					{business?.location ? (
						<View style={styles.locationSection}>
							<Text style={styles.otherText}>
								{business.location
									? truncateStr(
											business.location.city +
												", " +
												business.location.country,
											18,
									  )
									: ""}
							</Text>
						</View>
					) : null}

					{business.basicInfo?.phone ? (
						<View style={styles.locationSection}>
							<Text style={styles.otherText}>
								{business.basicInfo
									? truncateStr(business.basicInfo.phone, 18)
									: ""}
							</Text>
						</View>
					) : null}
				</View>
			</View>
		</TouchableOpacity>
	);
};

//-------------------------------------------------------------------

interface SponsoredSectionProps {
	sponsoredBusinesses: BusinessInterface[];
	loading: boolean;
}

const createSponsoredSectionTheme = (theme: any) =>
	StyleSheet.create({
		container: {},

		flatListContainer: {
			height: 170,
		},
	});

const SponsoredSection = ({ sponsoredBusinesses, loading }: SponsoredSectionProps) => {
	const { theme } = useTheme();
	const styles = createSponsoredSectionTheme(theme);

	return (
		<View
			style={{
				flex: 1,
				gap: 5,
				marginBottom: 7.5,
				backgroundColor: theme.palette.primary.main,
				padding: 5,
				marginTop: 10,
			}}
		>
			<Text
				style={{
					fontSize: 16,
					color: theme.common.white,
					fontFamily: theme.typography.fontFamily,
					fontWeight: "bold",
					marginTop: 10,
				}}
			>
				Sponsored Businesses
			</Text>

			{sponsoredBusinesses && (
				<View style={styles.flatListContainer}>
					<FlatList
						data={sponsoredBusinesses}
						renderItem={({ item }) => <SlideCard business={item} />}
						keyExtractor={(item) => item._id}
						horizontal={true}
						ListEmptyComponent={
							loading ? (
								<ActivityIndicator
									size="large"
									color={theme.palette.primary.main}
								/>
							) : (
								<Text>No Businesses</Text>
							)
						}
					/>
				</View>
			)}
		</View>
	);
};

export default SponsoredSection;
