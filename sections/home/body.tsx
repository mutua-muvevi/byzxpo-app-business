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
	View,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

//---------------------------------------------------------------------------------------
const ALT_THUMBNAIL_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";
const ALT_LOGO_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business%20logo%20here.jpg";

//---------------------------------------------------------------------------------------
const createBusinessCardStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.theme.background.default,
			borderRadius: theme.theme.shape.borderRadius,
			marginRight: 10,
			padding: 5,
			height: 150,
			width: 120,
			shadowColor: theme.theme.common.black,
			shadowOffset: { width: 0, height: 20 },
		},
	});

const BusinessCategoryCards = ({ business }: { business: BusinessInterface }) => {
	const theme = useTheme();
	const styles = createBusinessCardStyle(theme);

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: business.logo || business.thumbnail || ALT_THUMBNAIL_IMAGE }}
				style={{
					width: "100%",
					height: 80,
					borderTopLeftRadius: theme.theme.shape.borderRadius,
					borderTopRightRadius: theme.theme.shape.borderRadius,
				}}
			/>
		</View>
	);
};

//---------------------------------------------------------------------------------------

const createCategorySectionStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			gap: 5,
			marginBottom: 7.5,
		},
		header: {
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-between",
		},
		text: {
			color: theme.theme.text.secondary,
			fontWeight: "bold",
		},
	});
const CategoriesSection = ({ category }: { category: CategoryInterface }) => {
	console.log("CATEGORY", category.businesses);
	const theme = useTheme();
	const styles = createCategorySectionStyle(theme);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text}>{category.name}</Text>

				<Pressable>
					<IconSymbol name="chevron.right" size={20} color={theme.theme.primary.main} />
				</Pressable>
			</View>

			<FlatList
				data={category.businesses}
				renderItem={({ item }) => <BusinessCategoryCards business={item} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={<Text>No Businesses</Text>}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

//---------------------------------------------------------------------------------------

interface HomeBodyProps {
	categories: CategoryInterface[];
	loading: boolean;
}

const createhomebodyStyle = (theme: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			gap: 10,
			paddingBottom: 100,
		},
	});
const HomeBody = ({ categories, loading }: HomeBodyProps) => {
	const theme = useTheme();
	const style = createhomebodyStyle(theme);

	return (
		<View style={style.container}>
			{/* <Text>Categories</Text> */}
			<FlatList
				data={categories}
				renderItem={({ item }) => <CategoriesSection category={item} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
					) : (
						<Text>No Businesses</Text>
					)
				}
			/>
		</View>
	);
};

export default HomeBody;
