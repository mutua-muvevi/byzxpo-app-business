// sections/home/search/Search.tsx
import React, { useState, useCallback, useMemo } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import FilterModal from "./filter-modal";
import SearchResultCard from "./search-result-card";
import debounce from "lodash/debounce";
import axios from "axios";
import { useRouter } from "expo-router";
import { useBusiness } from "@/contexts/business/fetch";
import { BusinessInterface } from "@/types/business";

const createStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			marginBottom: 20,
			zIndex: 20, // Ensure search bar is above modal
		},
		searchContainer: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.background.default,
			borderTopStartRadius: theme.shape.borderRadius,
			borderBottomStartRadius: theme.shape.borderRadius,
			paddingHorizontal: 12,
			paddingVertical: 5,
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2,
			height: 50,
		},
		searchIcon: {
			marginRight: 8,
		},
		searchInput: {
			flex: 1,
			fontSize: 16,
			color: theme.text.primary,
			fontFamily: theme.typography.fontFamily,
		},
		filterButton: {
			backgroundColor: theme.palette.primary.main,
			borderTopEndRadius: theme.shape.borderRadius,
			borderBottomEndRadius: theme.shape.borderRadius,
			padding: 5,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 3,
			height: 50,
			width: 45,
		},
		modalContainer: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
			justifyContent: "flex-start",
			paddingTop: 70, // Space for search bar
		},
		resultsContainer: {
			marginHorizontal: 10,
			backgroundColor: theme.background.default,
			borderRadius: theme.shape.borderRadius,
			maxHeight: "80%", // Limit height to avoid covering entire screen
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 5,
			zIndex: 15, // Ensure results are above parent content
		},
		loadingContainer: {
			padding: 10,
			alignItems: "center",
		},
	});

const Search = () => {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState({
		name: "",
		city: "",
		state: "",
		country: "",
		category: "",
		isOpen: false,
		isVerified: false,
		email: "",
	});
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const { setSingleBusinessFunction } = useBusiness();

	// Debounced search function
	const fetchSearchResults = useCallback(async (query: string, filterParams: typeof filters) => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				"https://byzxpo-server.onrender.com/api/business/search-filter",
				{
					params: {
						name: query || filterParams.name,
						city: filterParams.city,
						state: filterParams.state,
						country: filterParams.country,
						category: filterParams.category,
						isOpen: filterParams.isOpen ? "true" : undefined,
						isVerified: filterParams.isVerified ? "true" : undefined,
						email: filterParams.email,
						pageNo: 1,
						pageLimit: 10,
					},
				},
			);
			setResults(response.data.businesses);
			setIsResultsVisible(response.data.businesses.length > 0);
		} catch (error) {
			console.error("Search error:", error);
			setResults([]);
			setIsResultsVisible(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string, filterParams: typeof filters) => {
				fetchSearchResults(query, filterParams);
			}, 500),
		[fetchSearchResults],
	);

	// Handle search input change
	const handleSearchChange = (text: string) => {
		setSearchQuery(text);
		debouncedSearch(text, filters);
	};

	// Handle filter submission
	const handleFilterSubmit = (newFilters: typeof filters) => {
		setFilters(newFilters);
		setIsModalVisible(false);
		fetchSearchResults(searchQuery, newFilters);
	};

	// Handle result click
	const handleResultClick = (business: BusinessInterface) => {
			setSingleBusinessFunction(business);
			router.push(`/business-details/${business._id}`);
			setSearchQuery("");
			setResults([]);
			setIsResultsVisible(false);
		};

	// Close results modal when clicking outside
	const handleCloseResults = () => {
		setIsResultsVisible(false);
		setSearchQuery("");
		setResults([]);
	};

	return (
		<View style={{ zIndex: 20 }}>
			<View style={styles.container}>
				<View style={styles.searchContainer}>
					<Ionicons
						name="search"
						size={24}
						style={styles.searchIcon}
						color={theme.palette.primary.main}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder="Search businesses..."
						placeholderTextColor={theme.text.secondary}
						value={searchQuery}
						onChangeText={handleSearchChange}
					/>
				</View>
				<TouchableOpacity
					style={styles.filterButton}
					onPress={() => setIsModalVisible(true)}
				>
					<Ionicons name="filter" size={24} color={theme.palette.primary.contrastText} />
				</TouchableOpacity>
			</View>

			{/* Search Results Modal */}
			<Modal
				visible={isResultsVisible}
				transparent
				animationType="fade"
				onRequestClose={handleCloseResults}
			>
				<TouchableWithoutFeedback onPress={handleCloseResults}>
					<View style={styles.modalContainer}>
						<TouchableWithoutFeedback>
							<View style={styles.resultsContainer}>
								<FlatList
									data={results}
									keyExtractor={(item: any) => item._id}
									renderItem={({ item }: any) => (
										<SearchResultCard
											business={item}
											onPress={() => handleResultClick(item)}
										/>
									)}
									ListFooterComponent={
										isLoading ? (
											<View style={styles.loadingContainer}>
												<ActivityIndicator
													size="small"
													color={theme.palette.primary.main}
												/>
											</View>
										) : null
									}
									showsVerticalScrollIndicator={false}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			{/* Filter Modal */}
			<FilterModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSubmit={handleFilterSubmit}
				initialFilters={filters}
			/>
		</View>
	);
};

export default Search;
