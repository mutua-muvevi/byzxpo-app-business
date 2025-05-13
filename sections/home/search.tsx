// sections/home/search/Search.tsx
import React, { useState, useCallback, useMemo } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
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
		resultsContainer: {
			position: "absolute",
			top: 60,
			left: 0,
			right: 0,
			backgroundColor: theme.background.default,
			borderRadius: theme.shape.borderRadius,
			maxHeight: 300,
			zIndex: 10,
			shadowColor: theme.common.black,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 5,
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
	const { setSingleBusinessFunction } = useBusiness();
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
		} catch (error) {
			console.error("Search error:", error);
			setResults([]);
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
			console.log("business of mine >>>>>>>>>>>>>>>>>>>>>>", business);

			if(business) {
				setSingleBusinessFunction(business);
				router.push(`/business-details/${business._id}`);
				setSearchQuery("");
				setResults([]);
			}
		};

	return (
		<View>
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

			{/* Search Results */}
			{results.length > 0 && (
				<View style={styles.resultsContainer}>
					<FlatList
						data={results}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
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
					/>
				</View>
			)}

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
