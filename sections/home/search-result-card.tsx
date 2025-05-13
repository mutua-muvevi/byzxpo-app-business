// sections/home/search/SearchResultCard.tsx
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@/theme";

const createStyles = (theme: any) =>
	StyleSheet.create({
		card: {
			flexDirection: "row",
			padding: 10,
			borderBottomWidth: 1,
			borderBottomColor: theme.divider,
			backgroundColor: theme.background.default,
		},
		logo: {
			width: 50,
			height: 50,
			borderRadius: 8,
			marginRight: 10,
		},
		textContainer: {
			flex: 1,
		},
		businessName: {
			fontSize: 16,
			fontWeight: "bold",
			color: theme.text.primary,
		},
		location: {
			fontSize: 14,
			color: theme.text.secondary,
		},
		category: {
			fontSize: 12,
			color: theme.text.secondary,
			marginTop: 2,
		},
	});

interface Business {
	_id: string;
	businessName: string;
	location?: { city?: string; state?: string; country?: string };
	categories?: { name: string };
	logo?: string;
}

interface Props {
	business: Business;
	onPress: () => void;
}

const SearchResultCard = ({ business, onPress }: Props) => {
	const { theme } = useTheme();
	const styles = createStyles(theme);

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			{business.logo && <Image source={{ uri: business.logo }} style={styles.logo} />}
			<View style={styles.textContainer}>
				<Text style={styles.businessName}>{business.businessName}</Text>
				{business.location && (
					<Text style={styles.location}>
						{[
							business.location.city,
							business.location.state,
							business.location.country,
						]
							.filter(Boolean)
							.join(", ")}
					</Text>
				)}
				{business.categories && (
					<Text style={styles.category}>{business.categories.name}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default SearchResultCard;
