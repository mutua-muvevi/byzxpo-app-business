import { useTheme } from "@/theme";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Review } from "../../../../types/business";
import { FontAwesome5 } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useReviews } from "@/contexts/reviews/provider";
import { useBusiness } from "@/contexts/business/fetch";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";
import UnavailableContentPage from "@/components/ui/UnavailablePage";
import NavHeader from "@/components/ui/NavHeader";

const ReviewItems = ({ item }: { item: any }) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				padding: 20,
				backgroundColor: theme.background.default,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
			}}
		>
			<Text
				style={{
					fontSize: 16,
					color: theme.text.primary,
					fontWeight: "bold",
					paddingBottom: 5,
				}}
			>
				{item?.createdBy?.name}
			</Text>
			<Text style={{ color: theme.text.secondary, fontWeight: "bold" }}>{item.title}</Text>
			<Text style={{ color: theme.text.secondary }}>{item.description}</Text>

			<View style={{ flexDirection: "row", alignItems: "flex-start" }}>
				<Rating
					type="star"
					ratingCount={5}
					imageSize={20}
					readonly
					startingValue={item.rating}
					style={{
						justifyContent: "flex-start",
						marginLeft: 0,
						backgroundColor: theme.background.default,
					}}
					ratingColor={theme.palette.primary.main}
				/>
			</View>
		</View>
	);
};

const BusinessReviews = () => {
	const { theme } = useTheme();
	const {
		businessReviews: reviews,
		fetchBusinessReviews,
		allBusinessReviewsLoading,
	} = useReviews();
	const { myBusiness } = useBusiness();

	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(100);

	useEffect(() => {
		if (myBusiness) {
			fetchBusinessReviews(myBusiness._id, pageNumber, pageLimit);
		}
	}, []);
	
	return allBusinessReviewsLoading ? (
		<LoadingStateIndicator text="Loading Reviews" />
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<NavHeader headerTitle="Reviews" backUrl="/my-business-details"  />
			<FlatList
				data={reviews}
				keyExtractor={(item) => item._id.toString()}
				renderItem={({ item }) => <ReviewItems item={item} />}
				contentContainerStyle={{ paddingBottom: 20 }}
				ListEmptyComponent={<UnavailableContentPage text="No Reviews Present for this Business" />}
				refreshControl={
					<RefreshControl
						refreshing={allBusinessReviewsLoading}
						onRefresh={() => {
							if (myBusiness) {
								fetchBusinessReviews(myBusiness._id, pageNumber, pageLimit);
							}
						}}
					/>
				}
			/>

		</SafeAreaView>
	);
};

export default BusinessReviews;
