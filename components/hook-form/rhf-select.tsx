// components/hook-form/rhf-select.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";

interface Option {
	value: string | number;
	label: string;
}

interface RHFSelectProps {
	name: string;
	options: Option[];
	placeholder?: string;
	helperText?: string;
	[key: string]: any;
}

//------------------------------------------------------------------------------------------

export const RHFSelect = ({
	name,
	options,
	placeholder,
	helperText,
	...other
}: RHFSelectProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<View
						className="border border-grey-300 rounded-lg"
						style={{
							borderColor: error
								? theme.error.main
								: theme.grey[300],
							backgroundColor: theme.grey[0],
							borderRadius: 5,
						}}
					>
						<Picker
							selectedValue={field.value}
							onValueChange={field.onChange}
							style={{
								backgroundColor: theme.grey[200],
								borderColor: error
									? theme.error.main
									: theme.grey[900],
								borderRadius: 5,
							}}
							{...other}
						>
							{placeholder && (
								<Picker.Item
									label={placeholder}
									value=""
									enabled={false}
									style={{ color: theme.grey[500] }}
								/>
							)}
							{options.map((option) => (
								<Picker.Item
									key={option.value}
									label={option.label}
									value={option.value}
								/>
							))}
						</Picker>
					</View>
					{(error || helperText) && (
						<Text
							className="text-caption mt-1"
							style={{
								color: error
									? theme.error.main
									: theme.grey[600],
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

//------------------------------------------------------------------------------------------

interface RHFMultiSelectProps {
	name: string;
	options: Option[];
	placeholder?: string;
	helperText?: string;
	[key: string]: any;
}

//------------------------------------------------------------------------------------------


export const RHFMultiSelect = ({
	name,
	options,
	placeholder,
	helperText,
	...other
}: RHFMultiSelectProps) =>  {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View>
					<View
						style={{
							borderColor: error
								? theme.error.main
								: theme.grey[300],
							backgroundColor: theme.grey[0],
						}}
					>
						<Text
							style={{
								color: field.value?.length
									? theme.grey[900]
									: theme.grey[500],
							}}
						>
							{field.value?.length
								? options
										.filter((opt) =>
											field.value.includes(opt.value),
										)
										.map((opt) => opt.label)
										.join(", ")
								: placeholder || "Select options"}
						</Text>
						{/* Simulate multi-select with checkboxes */}
						{options.map((option) => (
							<View
								key={option.value}
							>
								<Text>
									{option.label}
								</Text>
								<Text
									onPress={() => {
										const newValue = field.value?.includes(
											option.value,
										)
											? field.value.filter(
													(v: any) =>
														v !== option.value,
											  )
											: [
													...(field.value || []),
													option.value,
											  ];
										field.onChange(newValue);
									}}
								>
									{field.value?.includes(option.value)
										? "☑"
										: "⬜"}
								</Text>
							</View>
						))}
					</View>
					{(error || helperText) && (
						<Text
							style={{
								color: error
									? theme.error.main
									: theme.grey[600],
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
