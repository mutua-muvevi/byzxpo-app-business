// sections/home/search/FilterModal.tsx
import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "@/theme";

const createStyles = (theme: any) =>
	StyleSheet.create({
		modalContainer: {
			flex: 1,
			justifyContent: "center",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		modalContent: {
			backgroundColor: theme.background.default,
			marginHorizontal: 20,
			padding: 20,
			borderRadius: theme.shape.borderRadius,
		},
		title: {
			fontSize: 18,
			fontWeight: "bold",
			color: theme.text.primary,
			marginBottom: 20,
		},
		input: {
			borderWidth: 1,
			borderColor: theme.divider,
			borderRadius: 8,
			padding: 10,
			marginBottom: 10,
			color: theme.text.primary,
			fontSize: 16,
		},
		switchContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 10,
		},
		switchLabel: {
			fontSize: 16,
			color: theme.text.primary,
		},
		buttonContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 20,
		},
		button: {
			flex: 1,
			padding: 12,
			borderRadius: 8,
			alignItems: "center",
			marginHorizontal: 5,
		},
		applyButton: {
			backgroundColor: theme.palette.primary.main,
		},
		cancelButton: {
			backgroundColor: theme.divider,
		},
		buttonText: {
			color: theme.palette.primary.contrastText,
			fontWeight: "bold",
		},
	});

interface Filters {
	name: string;
	city: string;
	state: string;
	country: string;
	category: string;
	isOpen: boolean;
	isVerified: boolean;
	email: string;
}

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: (filters: Filters) => void;
	initialFilters: Filters;
}

const FilterModal = ({ visible, onClose, onSubmit, initialFilters }: Props) => {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const [filters, setFilters] = useState(initialFilters);

	const handleSubmit = () => {
		onSubmit(filters);
	};

	return (
		<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Filter Businesses</Text>

					<TextInput
						style={styles.input}
						placeholder="Business Name"
						placeholderTextColor={theme.text.secondary}
						value={filters.name}
						onChangeText={(text) => setFilters({ ...filters, name: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="City"
						placeholderTextColor={theme.text.secondary}
						value={filters.city}
						onChangeText={(text) => setFilters({ ...filters, city: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="State"
						placeholderTextColor={theme.text.secondary}
						value={filters.state}
						onChangeText={(text) => setFilters({ ...filters, state: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="Country"
						placeholderTextColor={theme.text.secondary}
						value={filters.country}
						onChangeText={(text) => setFilters({ ...filters, country: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="Category"
						placeholderTextColor={theme.text.secondary}
						value={filters.category}
						onChangeText={(text) => setFilters({ ...filters, category: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						placeholderTextColor={theme.text.secondary}
						value={filters.email}
						onChangeText={(text) => setFilters({ ...filters, email: text })}
					/>

					<View style={styles.switchContainer}>
						<Text style={styles.switchLabel}>Open Now</Text>
						<Switch
							value={filters.isOpen}
							onValueChange={(value) => setFilters({ ...filters, isOpen: value })}
							trackColor={{
								false: theme.divider,
								true: theme.palette.primary.main,
							}}
						/>
					</View>

					<View style={styles.switchContainer}>
						<Text style={styles.switchLabel}>Verified</Text>
						<Switch
							value={filters.isVerified}
							onValueChange={(value) => setFilters({ ...filters, isVerified: value })}
							trackColor={{
								false: theme.divider,
								true: theme.palette.primary.main,
							}}
						/>
					</View>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}
						>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.applyButton]}
							onPress={handleSubmit}
						>
							<Text style={styles.buttonText}>Apply Filters</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default FilterModal;
