import { useTheme } from "@/theme";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Review } from "../../../../types/business";
import { FontAwesome5 } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";

const reviews = [
	{
		id: 1,
		name: "Olivia Brown",
		title: "Excellent service!",
		description:
			"I'm extremely happy with the experience. Everything went smoothly, and the team was very professional. Highly recommend!",
		rating: 5,
	},
	{
		id: 2,
		name: "Liam Johnson",
		title: "Good, but room for improvement",
		description:
			"The service was decent overall, but there were a few delays that could have been avoided.",
		rating: 4,
	},
	{
		id: 3,
		name: "Emma Wilson",
		title: "Not satisfied",
		description:
			"Unfortunately, my expectations were not met. Communication was slow, and I faced multiple issues.",
		rating: 2,
	},
	{
		id: 4,
		name: "Noah Smith",
		title: "Outstanding quality!",
		description:
			"From start to finish, the experience was perfect. Great attention to detail and amazing support.",
		rating: 5,
	},
	{
		id: 5,
		name: "Ava Martinez",
		title: "Very professional",
		description:
			"The team was knowledgeable and efficient. I felt taken care of throughout the whole process.",
		rating: 5,
	},
	{
		id: 6,
		name: "Elijah Davis",
		title: "Average experience",
		description:
			"It was okay. Nothing exceptional, but nothing major to complain about either.",
		rating: 3,
	},
	{
		id: 7,
		name: "Sophia Anderson",
		title: "Would not recommend",
		description:
			"Unfortunately, the service fell short of what was promised. I had a lot of trouble getting updates.",
		rating: 1,
	},
	{
		id: 8,
		name: "James Taylor",
		title: "Great support team",
		description:
			"Had some minor issues, but the support team was quick to fix them. Very responsive!",
		rating: 4,
	},
	{
		id: 9,
		name: "Isabella Thomas",
		title: "Amazing results!",
		description:
			"I was skeptical at first, but the results blew me away. Definitely worth the investment.",
		rating: 5,
	},
	{
		id: 10,
		name: "William Garcia",
		title: "Decent, but slow delivery",
		description:
			"Happy with the final result, but it took longer than expected to complete the project.",
		rating: 3,
	},
	{
		id: 11,
		name: "Mia Rodriguez",
		title: "Super easy to work with",
		description:
			"The process was straightforward and stress-free. Clear communication at every step.",
		rating: 5,
	},
	{
		id: 12,
		name: "Benjamin Martinez",
		title: "Not worth the price",
		description: "The service was fine, but not great considering how much I paid.",
		rating: 2,
	},
	{
		id: 13,
		name: "Charlotte Hernandez",
		title: "Exceeded expectations",
		description:
			"I couldn't be happier with the results. Everything was even better than I imagined.",
		rating: 5,
	},
	{
		id: 14,
		name: "Lucas Lopez",
		title: "Friendly team",
		description:
			"Everyone was kind and helpful. It's rare to find such good customer service these days.",
		rating: 4,
	},
	{
		id: 15,
		name: "Amelia Gonzalez",
		title: "Terrible experience",
		description:
			"Nothing went as planned. It was frustrating and disappointing from the beginning.",
		rating: 1,
	},
	{
		id: 16,
		name: "Henry Perez",
		title: "Good value for money",
		description: "Service quality matched the price. A solid choice if you're on a budget.",
		rating: 4,
	},
	{
		id: 17,
		name: "Evelyn Hall",
		title: "Very impressed",
		description: "Super professional team that kept me updated regularly. Highly trustworthy!",
		rating: 5,
	},
	{
		id: 18,
		name: "Alexander Young",
		title: "Just okay",
		description: "The service was acceptable but didn't stand out in any way.",
		rating: 3,
	},
	{
		id: 19,
		name: "Harper King",
		title: "Would definitely use again",
		description:
			"It was a pleasure working with this team. Will definitely come back for future needs.",
		rating: 5,
	},
	{
		id: 20,
		name: "Daniel Wright",
		title: "Lacking communication",
		description: "Good product at the end, but I had to constantly follow up to get updates.",
		rating: 3,
	},
];

const ReviewsHeader = () => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				padding: 20,
				backgroundColor: theme.palette.primary.main,
				borderBottomWidth: 1,
				borderBottomColor: "#ccc",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 5,
			}}
		>
			<View>

				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: theme.palette.primary.contrastText,
					}}
				>
					My Customers
				</Text>

				<Text
					style={{
						color: theme.palette.primary.contrastText,
						fontSize: 14,
					}}
				>
					{reviews.length} Reviews in total
				</Text>
			</View>

			<TouchableOpacity
				style={{
					padding: 10,
					backgroundColor: theme.success.main,
					borderRadius: 5,
					flexDirection: "row",
					gap:5
				}}
			>
				<Text
					style={{
						color: theme.success.contrastText,
						fontSize: 16,
						fontWeight: "bold",
					}}
				>
					Filter
				</Text>

				<FontAwesome5
					name="filter"
					size={16}
					color={theme.palette.primary.contrastText}
				/>
			</TouchableOpacity>
		</View>
	);
};

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
			
			<Text style={{ fontSize: 16, color: theme.text.primary, fontWeight: "bold", paddingBottom :5 }} >{item.name}</Text>
			<Text style={{ color: theme.text.secondary, fontWeight: "bold", }}>{item.title}</Text>
			<Text style={{ color: theme.text.secondary }}>{item.description}</Text>

				
			<View style={{ flexDirection: "row", alignItems: "flex-start"}}>
				<Rating
					type="star"
					ratingCount={5}
					imageSize={20}
					readonly
					startingValue={item.rating}
					style={{ justifyContent: "flex-start", marginLeft: 0 }}
					ratingColor={theme.palette.primary.main}
				/>
			</View>
		</View>
	);
};

const BusinessReviews = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				data={reviews}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ReviewItems item={item} />}
				ListHeaderComponent={<ReviewsHeader />}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</SafeAreaView>
	);
};

export default BusinessReviews;
