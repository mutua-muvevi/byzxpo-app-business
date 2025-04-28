import { Controller, useFormContext } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFSwitchProps {
	name: string;
	label: string;
	helperText?: string;
	customComponent?: React.ComponentType<{
		value: boolean;
		onChange: (value: boolean) => void;
	}>;
	[key: string]: any;
}

const RHFSwitch = ({
	name,
	label,
	helperText,
	customComponent: CustomComponent,
	...other
}: RHFSwitchProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View style={{ marginBottom: 16 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
						}}
					>
						{CustomComponent ? (
							<CustomComponent value={field.value} onChange={field.onChange} />
						) : (
							<Switch
								value={field.value}
								onValueChange={field.onChange}
								trackColor={{
									false: theme.grey[300],
									true: theme.primary.main,
								}}
								thumbColor={theme.grey[0]}
								{...other}
							/>
						)}
						<Text
							style={{
								color: theme.grey[900],
								fontSize: 16,
							}}
						>
							{label}
						</Text>
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

export default RHFSwitch;
