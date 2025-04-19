import { useTheme } from "@/theme";
import { BusinessInterface } from "@/types/business";
import React from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

const ALT_THUMBNAIL_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";
const ALT_LOGO_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business%20logo%20here.jpg";

interface SlideCardProps {
	business: BusinessInterface;
}

const createSlideCardTheme = (theme: any) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.theme.background.default,
			borderRadius: theme.theme.shape.borderRadius,
			marginRight: 10,
			height: 150,
			width: 120,
			shadowColor: theme.theme.common.black,
			shadowOffset: { width: 0, height: 20 },
		},
		thumbnail: {
			width: "100%",
			height: 80,
			borderTopLeftRadius: theme.theme.shape.borderRadius,
			borderTopRightRadius: theme.theme.shape.borderRadius,
		},
		contentContainer: {
			padding: 5,
		},
		businessName: {
			fontSize: 14,
			color: theme.theme.text.primary,
			fontFamily: theme.theme.typography.fontFamily,
		},
	});

const SlideCard = ({ business }: SlideCardProps) => {
	const theme = useTheme();
	const styles = createSlideCardTheme(theme);
	return (
		<View style={styles.container}>
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
					style={styles.thumbnail}
					resizeMode="cover"
				/>
			) : (
				<Image
					source={{ uri: ALT_THUMBNAIL_IMAGE }}
					style={styles.thumbnail}
					resizeMode="cover"
				/>
			)}

			<View style={styles.contentContainer}>
				<Text style={styles.businessName}>{business.businessName}</Text>
			</View>
		</View>
	);
};

//-------------------------------------------------------------------

interface SponsoredSectionProps {
	sponsoredBusinesses: BusinessInterface[];
	loading: boolean;
}

const createSponsoredSectionTheme = (theme: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			gap: 5,
			marginBottom: 7.5,
		},
		flatListContainer: {
			height: 160,
		},
	});

const SponsoredSection = ({ sponsoredBusinesses, loading }: SponsoredSectionProps) => {
	const theme = useTheme();
	const styles = createSponsoredSectionTheme(theme);

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 16,
					color: theme.theme.text.primary,
					fontFamily: theme.theme.typography.fontFamily,
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
						showsHorizontalScrollIndicator={true}
						ListEmptyComponent={
							loading ? (
								<ActivityIndicator
									size="large"
									color={theme.theme.palette.primary.main}
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
