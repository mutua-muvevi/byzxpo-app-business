// components/hook-form/rhf-radio-group.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFRadioGroupProps {
	name: string;
	label?: string;
	options: { value: string; label: string }[];
	row?: boolean;
	helperText?: string;
	[key: string]: any;
}

//-----------------------------------------------------------------
const RHFRadioGroup = ({
	name,
	label,
	options,
	row,
	helperText,
	...other
}: RHFRadioGroupProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
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
								onPress={() => field.onChange(option.value)}
							>
								<Text
									style={{ color: theme.palette.grey[900] }}
								>
									{field.value === option.value ? "◉" : "○"}
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
};

export default RHFRadioGroup;
