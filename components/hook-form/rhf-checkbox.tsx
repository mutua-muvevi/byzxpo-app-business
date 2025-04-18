// components/hook-form/rhf-checkbox.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFCheckboxProps {
	name: string;
	label: string;
	helperText?: string;
	[key: string]: any;
}

//-------------------------------------------------------------------------

export const RHFCheckbox = ({
	name,
	label,
	helperText,
	...other
}: RHFCheckboxProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View>
					<TouchableOpacity
						onPress={() => field.onChange(!field.value)}
					>
						<Text
							style={{ color: theme.palette.grey[900] }}
						>
							{field.value ? "☑" : "⬜"}
						</Text>
						<Text
							style={{ color: theme.palette.grey[900] }}
						>
							{label}
						</Text>
					</TouchableOpacity>
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
}

//---------------------------------------------------------------------------

interface RHFMultiCheckboxProps {
	name: string;
	label?: string;
	options: { value: string; label: string }[];
	row?: boolean;
	helperText?: string;
	[key: string]: any;
}

export const RHFMultiCheckbox = ({
	name,
	label,
	options,
	row,
	helperText,
	...other
}: RHFMultiCheckboxProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View>
					{label && (
						<Text
							style={{ color: theme.palette.grey[900] }}
						>
							{label}
						</Text>
					)}
					<View >
						{options.map((option) => (
							<TouchableOpacity
								key={option.value}
								onPress={() => {
									const newValue = field.value?.includes(
										option.value,
									)
										? field.value.filter(
												(v: string) =>
													v !== option.value,
										  )
										: [
												...(field.value || []),
												option.value,
										  ];
									field.onChange(newValue);
								}}
							>
								<Text
									style={{ color: theme.palette.grey[900] }}
								>
									{field.value?.includes(option.value)
										? "☑"
										: "⬜"}
								</Text>
								<Text
									style={{ color: theme.palette.grey[900] }}
								>
									{option.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
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
}
