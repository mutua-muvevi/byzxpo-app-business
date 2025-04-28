import { useTheme } from "@/theme";
import { BusinessInterface } from "@/types/business";
import { CategoryInterface } from "@/types/category";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { truncateStr } from "@/utils/format-strings";
import { useBusiness } from "@/contexts/business/fetch";
import { useRouter } from "expo-router";
import UnavailableContentPage from "@/components/ui/UnavailablePage";

const ALT_THUMBNAIL_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";
const ALT_LOGO_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business%20logo%20here.jpg";

const createBusinessCardStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background.default,
			borderRadius: theme.shape.borderRadius,
			marginRight: 10,
			height: 150,
			width: 120,
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

const BusinessCategoryCards = ({ business }: { business: BusinessInterface }) => {
	const { theme } = useTheme();
	const styles = createBusinessCardStyle(theme);
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

const createCategorySectionStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			gap: 5,
			marginBottom: 5,
		},
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			paddingHorizontal: 5,
		},
		text: {
			color: theme.text.primary,
			fontWeight: "bold",
			fontSize: 16,
		},
	});

const CategoriesSection = ({ category }: { category: CategoryInterface }) => {
	const { theme } = useTheme();
	const styles = createCategorySectionStyle(theme);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text}>{category.name}</Text>
				<Pressable>
					<IconSymbol name="chevron.right" size={20} color={theme.primary.main} />
				</Pressable>
			</View>
			<FlatList
				data={category.businesses}
				renderItem={({ item }) => <BusinessCategoryCards business={item} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={<UnavailableContentPage text="No Businesses" />}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 5 }}
			/>
		</View>
	);
};

interface HomeBodyProps {
	categories: CategoryInterface[];
	loading: boolean;
}

const createHomeBodyStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			gap: 5,
		},
	});

const HomeBody = ({ categories, loading }: HomeBodyProps) => {
	const { theme } = useTheme();
	const style = createHomeBodyStyle(theme);

	return (
		<View style={style.container}>
			<FlatList
				data={categories}
				renderItem={({ item }) => <CategoriesSection category={item} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.palette.primary.main} />
					) : (
						<Text style={{ textAlign: "center", color: theme.text.secondary }}>
							No Categories
						</Text>
					)
				}
				contentContainerStyle={{ paddingBottom: 5 }}
			/>
		</View>
	);
};

export default HomeBody;
