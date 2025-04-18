// components/hook-form/rhf-switch.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFSwitchProps {
	name: string;
	label: string;
	helperText?: string;
	[key: string]: any;
}

const RHFSwitch = ({ name, label, helperText, ...other }: RHFSwitchProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View>
					<View>
						<Switch
							value={field.value}
							onValueChange={field.onChange}
							trackColor={{
								false: theme.palette.grey[300],
								true: theme.palette.primary.main,
							}}
							thumbColor={theme.palette.grey[0]}
							{...other}
						/>
						<Text
							style={{ color: theme.palette.grey[900] }}
						>
							{label}
						</Text>
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

export default RHFSwitch;
