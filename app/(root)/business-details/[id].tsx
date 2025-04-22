import { useBusiness } from "@/contexts/business/fetch";
import React from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import MapComponent from "@/components/map/map";
import { palette } from "../../../theme/palette";
import { StatusBar } from "expo-status-bar";
import { Rating } from "react-native-ratings";

const CLAIM_BUSINESS_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business-concept-with-copy-space-office-desk-table-with-pen-focus-analysis-chart-computer-notebook-cup-coffee-desk-vintage-tone-retro-filter-selective-focus.jpg";

const createBusinessDetailsStyles = (theme: any) =>
	StyleSheet.create({
		container: {},
		imageBackgroundStyles: {
			width: "100%",
			height: 150,
			flexDirection: "column",
			justifyContent: "flex-end",
			alignItems: "flex-start",
			marginBottom: 25,
		},
		nestedImageView: {
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "flex-start",
		},
		imageStyle: {
			width: 100,
			height: 100,
			borderRadius: 50,
			borderWidth: 2.5,
			borderColor: theme.theme.background.default,
			marginLeft: 5,
			position: "relative",
			top: 25,
		},
		contentView: {
			padding: 5,
			gap: 10,
		},
		businessName: {
			fontSize: 20,
			color: theme.theme.text.primary,
			fontWeight: "bold",
		},
		descriptionView: {
			gap: 2.5,
		},
		descriptionTitle: {
			fontSize: 15,
			color: theme.theme.text.secondary,
			fontWeight: "bold",
		},
		descriptionParagraphs: {
			fontSize: 14,
			color: theme.theme.text.secondary,
			fontWeight: "normal",
			textAlign: "justify",
		},
		basicInfoSection: {
			flexDirection: "row",
			gap: 5,
		},
		mapContainer: {
			width: "100%",
			height: 200,
		},
	});

const BusinessDetails = () => {
	const { singleBusiness } = useBusiness();

	const theme = useTheme();
	const styles = createBusinessDetailsStyles(theme);

	const businessBasicInfo = [
		{
			name: singleBusiness?.basicInfo?.email,
			icon: <MaterialIcons name="email" size={14} color={theme.theme.text.secondary} />,
		},
		{
			name: singleBusiness?.basicInfo?.emailTwo,
			icon: <MaterialIcons name="email" size={14} color={theme.theme.text.secondary} />,
		},
		{
			name: singleBusiness?.basicInfo?.phone,
			icon: <FontAwesome name="phone-square" size={14} color={theme.theme.text.secondary} />,
		},
		{
			name: singleBusiness?.basicInfo?.phoneTwo,
			icon: <FontAwesome name="phone-square" size={14} color={theme.theme.text.secondary} />,
		},
		{
			name: singleBusiness?.basicInfo?.website,
			icon: <Foundation name="web" size={14} color={theme.theme.text.secondary} />,
		},
	].filter((item) => item.name);

	return (
		<ScrollView>
			<StatusBar backgroundColor="transparent" />
			<ImageBackground
				source={{
					uri: (singleBusiness?.thumbnail ||
						singleBusiness?.logo ||
						"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg") as string,
				}}
				style={styles.imageBackgroundStyles}
			>
				<View style={styles.nestedImageView}>
					{singleBusiness?.logo ? (
						<Image
							source={{ uri: singleBusiness?.logo }}
							style={styles.imageStyle}
							alt={`${singleBusiness?.businessName} logo`}
						/>
					) : null}
				</View>
			</ImageBackground>

			<View style={styles.contentView}>
				<Text style={styles.businessName}>{singleBusiness?.businessName}</Text>

				{singleBusiness?.description
					? singleBusiness?.description.map((description) => (
							<View key={description._id} style={styles.descriptionView}>
								<Text style={styles.descriptionTitle}>{description.title}</Text>
								{description.paragraphs.map((paragraph, index) => (
									<Text key={index} style={styles.descriptionParagraphs}>
										{paragraph}
									</Text>
								))}
							</View>
					  ))
					: null}

				{businessBasicInfo.length > 0 && (
					<View style={styles.descriptionView}>
						<Text style={styles.descriptionTitle}>Contact</Text>
						{businessBasicInfo.map((item, index) => (
							<View style={styles.basicInfoSection} key={index}>
								{item.icon}
								<Text style={styles.descriptionParagraphs}>{item.name}</Text>
							</View>
						))}
					</View>
				)}

				{singleBusiness?.location ? (
					<View style={styles.descriptionView}>
						<Text style={styles.descriptionTitle}>Location</Text>

						<View style={styles.mapContainer}>
							<MapComponent />
						</View>
					</View>
				) : null}

				{singleBusiness?.overalRating ? (
					<View
						style={{
							...styles.descriptionView,
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						<Text style={styles.descriptionTitle}>Ratings and Reviews</Text>

						<Rating
							type="custom"
							ratingCount={5}
							readonly={true}
							imageSize={15}
							ratingColor={theme.theme.primary.main}
							jumpValue={0.5}
							ratingTextColor={theme.theme.text.primary}
							startingValue={singleBusiness.overalRating}
							ratingBackgroundColor={theme.theme.text.disabled}
							style={{ width: "100%", height: 20 }}
						/>
					</View>
				) : null}

				{singleBusiness?.otherImages ? (
					<View style={{ ...styles.descriptionView, gap: 10 }}>
						<Text style={styles.descriptionTitle}>Business Photos</Text>

						{singleBusiness?.otherImages.map((images, index) => (
							<View key={images}>
								<Image
									source={{ uri: images }}
									alt={singleBusiness.businessName + index}
									style={{
										height: 200,
										borderRadius: 5,
									}}
								/>
							</View>
						))}
					</View>
				) : null}

				{/* {
					singleBusiness?.socialMedia ? (
						<View style={styles.descriptionView}>
							<Text style={styles.descriptionTitle}>Social Media</Text>

							<Text>
							{JSON.stringify(singleBusiness.socialMedia)}
							{JSON.stringify(singleBusiness.socialMedia)}

							</Text>
						</View>
					) : null
				} */}

				<TouchableOpacity>
					<ImageBackground
						source={{
							uri: CLAIM_BUSINESS_IMAGE,
						}}
						style={{
							height: 150,
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "linear",
						}}
					>
						<View
							style={{
								padding: 20,
								borderWidth: 5,
								borderColor: theme.theme.palette.primary.main,
							}}
						>
							<Text
								style={{
									textTransform: "uppercase",
									color: theme.theme.palette.primary.main,
									fontSize: 30,
									fontWeight: "bold",
								}}
							>
								Claim Business
							</Text>
						</View>
					</ImageBackground>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 5,
						backgroundColor: theme.theme.palette.primary.main,
						height: 50
					}}
				>
					<Text
						style={{
							color: theme.theme.palette.primary.contrastText,
							fontSize: 20,
							fontWeight: "bold",
						}}
					>
						Message This Business
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default BusinessDetails;
