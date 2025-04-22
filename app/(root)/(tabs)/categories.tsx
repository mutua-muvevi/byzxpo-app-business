import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "../../../theme/palette";
import CategoriesSection from "@/sections/categories/categories";

const createCategoriesStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 10,
			paddingVertical: 10,
			backgroundColor: theme.theme.background.paper,
		},
		loadingContainer: {
			height: "100%",
			justifyContent: "center",
			alignItems: "center",
		},
	});

//--------------------------------------------------------------------------------

const LoadingIndicatorView = () => {
	const theme = useTheme();
	const styles = createCategoriesStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
			</View>
		</View>
	);
};
//--------------------------------------------------------------------------------

const Categories = () => {
	const { allCategories: categories, loading, error } = useCategory();
	const theme = useTheme();
	const styles = createCategoriesStyles(theme);

	return (
		<SafeAreaView style={styles.container}>
			<Text
				style={{
					fontSize: 18,
					marginBottom: 10,
					color: theme.theme.text.primary,
					fontWeight: "bold",
				}}
			>
				Categories
			</Text>

			{loading ? (
				<LoadingIndicatorView />
			) : (
				<CategoriesSection categories={categories} loading={loading} />
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Categories;
