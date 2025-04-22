import UnavailableContentPage from "@/components/ui/UnavailablePage";
import { useBusiness } from "@/contexts/business/fetch";
import { useCategory } from "@/contexts/categories/fetch";
import HomeBody from "@/sections/home/body";
import Search from "@/sections/home/search";
import SponsoredSection from "@/sections/home/sponsored";
import { useTheme } from "@/theme";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.theme.background.paper,
			paddingBottom: 50,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		contentContainer: {
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
	});

const LoadingIndicatorView = () => {
	const theme = useTheme();
	const styles = createStyles(theme);

	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
		</View>
	);
};

const HomeScreen = () => {
	const {
		allBusinesses,
		sponsoredBusinesses,
		loading: sponsoredBusinessLoading,
		error: businessError,
	} = useBusiness();
	const {
		categoriesWithBusinesses,
		error: categoryError,
		loading: categoryLoading,
	} = useCategory();
	const theme = useTheme();
	const styles = createStyles(theme);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={theme.theme.primary.main} />
			<FlatList
				data={categoriesWithBusinesses}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<HomeBody
						categories={[item]} // Pass single category to HomeBody
						loading={categoryLoading}
					/>
				)}
				ListHeaderComponent={
					<>
						<Search />
						{sponsoredBusinessLoading ? (
							<LoadingIndicatorView />
						) : (
							<SponsoredSection
								sponsoredBusinesses={sponsoredBusinesses}
								loading={sponsoredBusinessLoading}
							/>
						)}
					</>
				}
				ListEmptyComponent={
					sponsoredBusinessLoading || categoryLoading ? (
						<LoadingIndicatorView />
					) : (
						<UnavailableContentPage text="No Businesses" />
					)
				}
				contentContainerStyle={styles.contentContainer}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;
