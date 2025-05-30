import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesSection from "@/sections/categories/categories";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import { StatusBar } from "expo-status-bar";
import { palette } from "../../../theme/palette";
import NavHeader from "@/components/ui/NavHeader";
import { Ionicons } from "@expo/vector-icons";

const createCategoriesStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background.default,
		},
		loadingContainer: {
			height: "100%",
			justifyContent: "center",
			alignItems: "center",
		},
	});

//--------------------------------------------------------------------------------

const Categories = () => {
	const { allCategories: categories, loading, error } = useCategory();
	const { theme } = useTheme();
	const styles = createCategoriesStyles(theme);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={theme.palette.primary.main} />
			<NavHeader
				headerTitle="Categories"
				backUrl="/"
				isTransparent={false}
			/>
			<CategoriesSection categories={categories} loading={loading} />
		</SafeAreaView>
	);
};

export default Categories;
