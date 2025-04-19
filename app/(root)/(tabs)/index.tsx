import { useBusiness } from "@/contexts/business/fetch";
import { useCategory } from "@/contexts/categories/fetch";
import HomeBody from "@/sections/home/body";
import Search from "@/sections/home/search";
import SponsoredSection from "@/sections/home/sponsored";
import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from "react-native";

const createStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 10,
			paddingVertical: 10,
			backgroundColor: theme.theme.background.paper
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
	const styles = createStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		</View>
	);
};

//--------------------------------------------------------------------------------
const HomeScreen = () => {
	const {
		allBusinesses,
		sponsoredBusinesses,
		loading: sponsoredBusinessLoading,
		error,
	} = useBusiness();
	const {
		categoriesWithBusinesses,
		error: categoryError,
		loading: categoryLoading,
	} = useCategory();
	const theme = useTheme();
	const styles = createStyles(theme);

	return (
		<ScrollView style={styles.container}>
			<Search />

			{sponsoredBusinessLoading ? (
				<LoadingIndicatorView />
			) : (
				<SponsoredSection sponsoredBusinesses={sponsoredBusinesses} loading={sponsoredBusinessLoading} />
			)}

			{categoryLoading ? (
				<LoadingIndicatorView />
			) : (
				<HomeBody categories={categoriesWithBusinesses} loading={categoryLoading} />
			)}
		</ScrollView>
	);
};

export default HomeScreen;
