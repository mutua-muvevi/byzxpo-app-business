import { useBusiness } from "@/contexts/business/fetch";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";

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
			gap: 5,
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
	});

const BusinessDetails = () => {
	const { singleBusiness } = useBusiness();
	const params = useLocalSearchParams();

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

				<Text>
					MAP
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default BusinessDetails;
