import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import { CategoryInterface } from "@/types/category";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";

//------------------------------------------------------------------------------
const CategorySection = ({ category, backgroundColor }: { category: CategoryInterface, backgroundColor: any }) => {
	const { setSingleCategoryFunction } = useCategory();
	const { main, contrastText } = backgroundColor;
	console.log("backgroundColor", backgroundColor);

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
			<View style={{ borderRadius: 5, height: 120, backgroundColor: main  }}>
					<View
						style={{
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							padding: 10,
						}}
					>
						<Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
							{category.name}
						</Text>

						<Text style={{ fontSize: 16, color: "white",}}>
							{(category.businesses?.length ?? 0)} Businesses
						</Text>
					</View>
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
	const { theme } = useTheme();
	console.log("theme", theme);

	const { primary, orange, success, error, brown, } = theme
	
	const  colors = [primary, orange, success, error, brown]

	return (
		<View>
			<FlatList
				data={categories}
				renderItem={({ item, index }) => <CategorySection category={item} backgroundColor={colors[index % colors.length]} />}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.palette.primary.main} />
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
