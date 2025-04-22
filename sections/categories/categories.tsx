import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import { CategoryInterface } from "@/types/category";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";

//---------------------------------------------------------------------------
const placeHolderImage =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business-concept-with-copy-space-office-desk-table-with-pen-focus-analysis-chart-computer-notebook-cup-coffee-desk-vintage-tone-retro-filter-selective-focus.jpg";

//------------------------------------------------------------------------------
const CategorySection = ({ category }: { category: CategoryInterface }) => {
	const { setSingleCategoryFunction } = useCategory();

	const theme = useTheme();
	const router = useRouter();

	const handlePressCategory = () => {
		setSingleCategoryFunction(category);

		router.push({
			pathname: "/category/[id]",
			params: { id: category._id },
		});
	};

	return (
		<TouchableOpacity onPress={handlePressCategory}>
			<View style={{borderRadius: 10}}>

				<ImageBackground
					source={{
						uri: placeHolderImage,
					}}
					style={{
						width: "100%",
						height: 100,
					}}
					>
					<View
						style={{
							width: "100%",
							height: "100%",
							backgroundColor:
								"linear-gradient(to top,rgba(0, 0, 0, 0.57) 0%,rgba(0, 0, 0, 0.62) 100%)",

							justifyContent: "center",
							alignItems: "center",
							padding: 10,
						}}
					>
						<Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
							{category.name}
						</Text>
					</View>
				</ImageBackground>
			</View>
		</TouchableOpacity>
	);
};

//------------------------------------------------------------------------------

const CategoriesSection = ({
	categories,
	loading,
}: {
	categories: CategoryInterface[];
	loading: boolean;
}) => {
	const theme = useTheme();

	return (
		<View>
			<FlatList
				data={categories}
				renderItem={({ item }) => <CategorySection category={item} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
					) : (
						<Text>No Businesses</Text>
					)
				}
				ItemSeparatorComponent={() => (
					<View
						style={{
							borderWidth: 1,
							borderColor: "#ccc",
							marginVertical: 20,
							borderStyle: "dashed",
						}}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default CategoriesSection;
