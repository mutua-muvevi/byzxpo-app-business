// components/hook-form/rhf-autocomplete.tsx
import { Controller, useFormContext } from "react-hook-form";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useTheme } from "@/theme";
import { useState } from "react";

interface RHFAutocompleteProps {
	name: string;
	options: { label: string; value: string; code: string; phone: string }[];
	placeholder?: string;
	helperText?: string;
	type?: string;
	[key: string]: any;
}

const RHFAutocomplete = ({
	name,
	options = [],
	placeholder,
	helperText,
	type,
	...other
}: RHFAutocompleteProps) => {
	const { control, setValue } = useFormContext();
	const { theme } = useTheme();
	const [query, setQuery] = useState("");
	const [showOptions, setShowOptions] = useState(false);

	const filteredOptions = query
		? options.filter((opt) =>
				opt.label.toLowerCase().includes(query.toLowerCase()),
		  )
		: options;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<TextInput
						placeholder={placeholder}
						value={query}
						onChangeText={(text) => {
							setQuery(text);
							setShowOptions(true);
						}}
						onFocus={() => setShowOptions(true)}
						style={{
							backgroundColor: theme.palette.grey[0],
							borderColor: error
								? theme.palette.error.main
								: theme.palette.grey[300],
						}}
						{...other}
					/>
					{showOptions && filteredOptions.length > 0 && (
						<View
							style={{ backgroundColor: theme.palette.grey[0] }}
						>
							<FlatList
								data={filteredOptions}
								keyExtractor={(item) => item.value}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											setValue(name, item.value, {
												shouldValidate: true,
											});
											setQuery(item.label);
											setShowOptions(false);
										}}
									>
										<Text
											style={{
												color: theme.palette.grey[900],
											}}
										>
											{type === "country"
												? `${item.label} (${item.code}) ${item.phone}`
												: item.label}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					)}
					{(error || helperText) && (
						<Text
							style={{
								color: error
									? theme.palette.error.main
									: theme.palette.grey[600],
							}}
						>
							{error?.message || helperText}
						</Text>
					)}
				</View>
			)}
		/>
	);
};

export default RHFAutocomplete;
