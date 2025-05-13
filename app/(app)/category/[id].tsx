import { useCategory } from "@/contexts/categories/fetch";
import { useTheme } from "@/theme";
import { BusinessInterface } from "@/types/business";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	RefreshControl,
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
import { truncateStr } from "@/utils/format-strings";

const ALT_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/business-concept-with-copy-space-office-desk-table-with-pen-focus-analysis-chart-computer-notebook-cup-coffee-desk-vintage-tone-retro-filter-selective-focus.jpg";

//-----------------------------------------------------------------------------

const FlatListHeaderComponent = () => {
	const { singleCategory: category } = useCategory();
	const { theme } = useTheme();

	return (
		<View
			style={{
				padding: 10,
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
						textAlign: "justify",
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
		<TouchableOpacity
			onPress={handleOpenBusiness}
			style={{
				padding: 10,
				gap: 10,
				width: "50%",
			}}
		>
			<View style={{ backgroundColor: theme.background.paper, borderRadius: 5 }}>
				<Image
					source={{ uri: business.thumbnail || ALT_IMAGE }}
					style={{
						width: "100%",
						height: 100,
						marginBottom: 5,
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
					}}
					resizeMethod="resize"
					resizeMode="cover"
					blurRadius={1}
					loadingIndicatorSource={{ uri: ALT_IMAGE }}
				/>
				<View
					style={{
						paddingVertical: 12,
						paddingHorizontal: 10,
						gap: 5,
						backgroundColor: theme.background.paper,
						borderBottomLeftRadius: 5,
						borderBottomRightRadius: 5,
					}}
				>
					<Text style={{ fontWeight: "bold", color: theme.text.primary }}>
						{business.businessName}
					</Text>

					{business?.basicInfo?.email ? (
						<Text style={{ color: theme.text.secondary }}>
							{truncateStr(business?.basicInfo?.email, 20)}{" "}
						</Text>
					) : null}
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
				ListHeaderComponentStyle={{
					paddingBottom: 10,
				}}
				ListFooterComponentStyle={{
					paddingBottom: 500,
				}}
				numColumns={2}
				columnWrapperStyle={{
					width: "100%",
				}}
				ItemSeparatorComponent={() => (
					<View
						style={{
							padding: 5,
						}}
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							/* Add refresh logic here */
							//fetch bookmark businesses for this user here
						}}
					/>
				}
				style={{
					backgroundColor: theme.background.default,
					paddingBottom: 10,
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Category;
