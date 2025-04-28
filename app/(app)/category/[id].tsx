import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import { BusinessInterface } from "@/types/business";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from '../../../theme/palette';
import { useBusiness } from "@/contexts/business/fetch";
import { useRouter } from "expo-router";
import UnavailableContentPage from "@/components/ui/UnavailablePage";

const businessImagePlaceHolder =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business-concept-with-copy-space-office-desk-table-with-pen-focus-analysis-chart-computer-notebook-cup-coffee-desk-vintage-tone-retro-filter-selective-focus.jpg";

//-----------------------------------------------------------------------------

const FlatListHeaderComponent = () => {
	const { singleCategory: category } = useCategory();
	const { theme } = useTheme();
	console.log("Single Category", category);

	return (
		<View
			style={{
				paddingHorizontal: 5,
				paddingVertical: 10,
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					color: theme.palette.primary.contrastText,
					fontWeight: "bold",
				}}
			>
				{category?.name}
			</Text>
			{category?.description && (
				<Text
					style={{
						color: theme.palette.primary.contrastText,
						marginTop: 5,
					}}
				>
					{category?.description}
				</Text>
			)}
		</View>
	);
};

//-----------------------------------------------------------------------------

const FlatListComponent = ({ business }: { business: BusinessInterface }) => {
	const { theme } = useTheme();
	const { setSingleBusinessFunction } = useBusiness();
	const router = useRouter();

	const handleOpenBusiness = () => {
		setSingleBusinessFunction(business);

		router.push({
			pathname: "/business-details/[id]",
			params: { id: business._id },
		});
	};

	return (
		<TouchableOpacity onPress={handleOpenBusiness} style={{
			
			borderRadius: 5,
		}}>
			<View
				style={{
					flexDirection: "row",
					gap: 5,
					backgroundColor: theme.background.paper,
					height: 80,
					padding: 0,
				}}
			>
				<Image
					resizeMode="cover"
					source={{
						uri: businessImagePlaceHolder,
					}}
					style={{
						width: 80,
						height: "100%",
					}}
				/>
				<View
					style={{
						flexDirection: "column",
						overflowY: "scroll",
						padding:5,
						justifyContent: "center"
					}}
				>
					<Text style={{ color: theme.text.primary, fontWeight: "bold" }}>
						{business?.businessName}
					</Text>

					{business?.location?.city && business?.location?.country && (
						<Text style={{color: theme.text.secondary }}>
							{business?.location?.city}, {business?.location?.country}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

//-----------------------------------------------------------------------------

const Category = () => {
	const { singleCategory: category, loading } = useCategory();
	const { theme } = useTheme();
	return (
		<SafeAreaView style={{ gap: 5, backgroundColor: theme.background.default }}>
			<StatusBar backgroundColor={theme.primary.main} />

			<FlatList
				data={category?.businesses}
				renderItem={({ item }) => <FlatListComponent business={item} />}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={<FlatListHeaderComponent />}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.palette.primary.main} />
					) : (
						<UnavailableContentPage text="No Businesses" />
					)
				}
				ItemSeparatorComponent={() => (
					<View
						style={{
							marginVertical: 5,
						}}
					/>
				)}
				style={{
					backgroundColor: theme.background.default,
					marginBottom: 10,
					height: "100%",
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Category;
