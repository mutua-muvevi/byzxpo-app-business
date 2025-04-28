import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFRadioGroupProps {
	name: string;
	label?: string | undefined;
	options: { value: string; label: string }[];
	row?: boolean;
	helperText?: string;
	customComponent?: React.ComponentType<{
		value: string;
		isSelected: boolean;
		label?: string;
	}>;
	style?: object;
	componentStyle?: object;
	[key: string]: any;
}

const RHFRadioGroup = ({
	name,
	label,
	options,
	row,
	helperText,
	style,
	customComponent: CustomComponent,
	componentStyle,
	...other
}: RHFRadioGroupProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View style={{ marginBottom: 16 }}>
					{label && (
						<Text
							style={{
								color: theme.grey[900],
								fontSize: 16,
								marginBottom: 8,
							}}
						>
							{label}
						</Text>
					)}
					<View
						style={{
							flexDirection: row ? "row" : "column",
							gap: 8,
							flexWrap: row ? "wrap" : "nowrap",
						}}
					>
						{options.map((option) => (
							<TouchableOpacity
								key={option.value}
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: row ? "space-evenly" : "flex-start",
									padding: 4,
									gap:8
								}}
								onPress={() => field.onChange(option.value)}
							>
								{CustomComponent ? (
									<CustomComponent
										value={option.value}
										isSelected={field.value === option.value}
										label={option.label}
										
									/>
								) : (
									<Text
										style={{
											color: theme.grey[900],
											fontSize: 20,
											marginRight: 8,
										}}
									>
										{field.value === option.value ? "◉" : "○"}
									</Text>
								)}
								<Text
									style={{
										color: theme.grey[900],
										fontSize: 16,
									}}
								>
									{option.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					{(error || helperText) && (
						<Text
							style={{
								color: error ? theme.error.main : theme.grey[600],
								fontSize: 12,
								marginTop: 4,
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
