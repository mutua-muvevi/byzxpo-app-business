import UnavailableContentPage from "@/components/ui/UnavailablePage";
import { useBusiness } from "@/contexts/business/fetch";
import { useTheme } from "@/theme";
import { truncateStr } from "@/utils/format-strings";
import { useRouter } from "expo-router";
import React from "react";
import {
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/auth";

const ALT_IMAGE =
	"https://storage.googleapis.com/byzxpo-bucket/assets/a-white-text-on-a-blue-background-that-s_o6eumMMYQwic5GGGDhZ3ow_qdCWpEhDShKoXRu01jruXg.jpeg";

const BookmarkHeader = () => {
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
				My saved businesses
			</Text>
		</View>
	);
};

const BookmarkCardComponents = ({ business }: any) => {
	const { theme } = useTheme();
	const router = useRouter();

	const handleNavigateToBusinessDetails = () => {
		router.push({
			pathname: "/business-details/[id]",
			params: { id: business._id },
		});
	};

	return (
		<TouchableOpacity
			style={{ padding: 10, gap: 10, width: "50%" }}
			onPress={handleNavigateToBusinessDetails}
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

					{business?.overalRating ? (
						<Rating
							ratingCount={5}
							readonly={true}
							imageSize={15}
							ratingColor={theme.primary.main}
							jumpValue={0.5}
							ratingTextColor={theme.text.primary}
							startingValue={business.overalRating}
							ratingBackgroundColor={theme.text.disabled}
							style={{ width: "100%", height: 20 }}
						/>
					) : null}
				</View>
			</View>
		</TouchableOpacity>
	);
};

const Bookmark = () => {
	const { allBusinesses } = useBusiness();
	//@ts-ignore
	const { user : { mySavedBusinesses }, fetchMe} = useAuth()
	const { theme, mode } = useTheme();

	return (
		<SafeAreaView>
			<StatusBar backgroundColor={theme.palette.primary.main} />
			<FlatList
				data={mySavedBusinesses}
				keyExtractor={(item) => item._id.toString()}
				renderItem={({ item }) => <BookmarkCardComponents business={item} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListEmptyComponent={<UnavailableContentPage text="No Businesses Present" />}
				ListHeaderComponent={<BookmarkHeader />}
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
							fetchMe();
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

export default Bookmark;
