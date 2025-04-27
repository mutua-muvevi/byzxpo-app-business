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
import { palette } from "../../../theme/palette";
import { useBusiness } from "@/contexts/business/fetch";
import { useRouter } from "expo-router";
import UnavailableContentPage from "@/components/ui/UnavailablePage";

const businessImagePlaceHolder =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business-concept-with-copy-space-office-desk-table-with-pen-focus-analysis-chart-computer-notebook-cup-coffee-desk-vintage-tone-retro-filter-selective-focus.jpg";

//-----------------------------------------------------------------------------

const FlatListHeaderComponent = () => {
	const { singleCategory: category } = useCategory();
	const theme = useTheme();
	console.log(theme);

	return (
		<View
			style={{
				padding: 5,
				backgroundColor: theme.theme.primary.main,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					color: theme.theme.primary.contrastText,
					fontWeight: "bold",
				}}
			>
				{category?.name}
			</Text>
		</View>
	);
};

//-----------------------------------------------------------------------------

const FlatListComponent = ({ business }: { business: BusinessInterface }) => {
	const theme = useTheme();
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
		<View
			style={{
				flexDirection: "row",
				gap: 5,
				backgroundColor: theme.theme.background.default,
				height: 80,
				padding: 0,
			}}
		>
			<Image
				source={{
					uri: businessImagePlaceHolder,
				}}
				style={{
					width: 80,
					height: "100%",
					borderWidth: 2.5,
					borderColor: theme.theme.background.default,
				}}
			/>

			<TouchableOpacity onPress={handleOpenBusiness}>
				<View
					style={{
						flexDirection: "column",
						overflowY: "scroll",
					}}
				>
					<Text style={{ fontSize: 15, color: theme.theme.text.primary }}>
						{business?.businessName}
					</Text>

					{business?.location?.city && business?.location?.country && (
						<Text style={{ fontSize: 13, color: theme.theme.text.secondary }}>
							{business?.location?.city}, {business?.location?.country}
						</Text>
					)}

					{business?.basicInfo?.email && (
						<Text style={{ fontSize: 13, color: theme.theme.text.secondary }}>
							{business?.basicInfo?.email}
						</Text>
					)}

					{business?.basicInfo?.phone && (
						<Text style={{ fontSize: 13, color: theme.theme.text.secondary }}>
							{business?.basicInfo?.phone}
						</Text>
					)}
				</View>
			</TouchableOpacity>
		</View>
	);
};

//-----------------------------------------------------------------------------

const Category = () => {
	const { singleCategory: category, loading } = useCategory();
	const theme = useTheme();
	return (
		<SafeAreaView style={{ gap: 5, backgroundColor: theme.theme.background.default }}>
			<StatusBar backgroundColor={theme.theme.primary.main} />

			<FlatList
				data={category?.businesses}
				renderItem={({ item }) => <FlatListComponent business={item} />}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={<FlatListHeaderComponent />}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator size="large" color={theme.theme.palette.primary.main} />
					) : (
						<UnavailableContentPage text="No Businesses" />
					)
				}
				ItemSeparatorComponent={() => (
					<View
						style={{
							borderWidth: 1,
							borderColor: "#ccc",
							marginVertical: 10,
							borderStyle: "dashed",
						}}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Category;
