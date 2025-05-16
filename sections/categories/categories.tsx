import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import { CategoryInterface } from "@/types/category";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";

//------------------------------------------------------------------------------

const CategoryHeaderComponent = () => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				backgroundColor: theme.palette.primary.main,
				padding: 10,
				marginBottom: 10,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					color: theme.palette.primary.contrastText,
					fontWeight: "bold",
				}}
			>
				Categories
			</Text>
		</View>
	)
}

//------------------------------------------------------------------------------
const CategorySection = ({
	category,
	backgroundColor,
}: {
	category: CategoryInterface;
	backgroundColor: any;
}) => {
	const { setSingleCategoryFunction } = useCategory();
	const { main } = backgroundColor;

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
			<View style={{ borderRadius: 5, height: 120, backgroundColor: main }}>
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

					<Text style={{ fontSize: 16, color: "white" }}>
						{category.businesses?.length ?? 0} Businesses
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
	const {fetchAllCategories} = useCategory();

	const { primary, orange, success, error, brown } = theme;

	const colors = [primary, orange, success, error, brown];

	return loading ? <LoadingStateIndicator text={"Loading categories..."} /> : (
		<FlatList
			data={categories}
			renderItem={({ item, index }) => (
				<View style={{padding:10}}>

					<CategorySection category={item} backgroundColor={colors[index % colors.length]} />
				</View>
			)}
			keyExtractor={(item) => item._id}
			ListEmptyComponent={
				<LoadingStateIndicator text={"Loading categories..."} /> 
			}
			ItemSeparatorComponent={() => (
				<View
					style={{
						borderWidth: 1,
						borderColor: theme.palette.primary.main,
						marginVertical: 20,
						borderStyle: "dashed",
					}}
				/>
			)}
			refreshControl={
				<RefreshControl
					colors={[theme.palette.primary.main]}
					tintColor={theme.palette.primary.main}
					refreshing={loading}
					onRefresh={() => {
						fetchAllCategories();
					}}
				/>
			}
			// ListHeaderComponent={
			// 	<CategoryHeaderComponent />
			// }
		/>
	);
};

export default CategoriesSection;
