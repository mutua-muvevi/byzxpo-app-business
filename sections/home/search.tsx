import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

const Search = () => {
	const { theme } = useTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginBottom: 20,
			}}
		>
			{/* Search Bar */}
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: theme.background.paper,
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
				}}
			>
				<Ionicons
					name="search"
					size={24}
					style={{
						marginRight: 8,
					}}
					color={theme.palette.primary.main} // #027cf5
				/>
				<TextInput
					style={{
						flex: 1,
						fontSize: 16,
						color: theme.text.primary,
						fontFamily: theme.typography.fontFamily,
					}}
					placeholder="Search..."
					placeholderTextColor={theme.text.secondary} // #637381
				/>
			</View>

			{/* Filter Button */}
			<TouchableOpacity
				style={{
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
				}}
			>
				<Ionicons
					name="filter"
					size={24}
					color={theme.palette.primary.contrastText} // #FFFFFF
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Search;
