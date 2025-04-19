// components/hook-form/rhf-text-field.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { useTheme } from "@/theme";

interface RHFTextFieldProps {
	name: string;
	placeholder?: string;
	type?: "text" | "number" | "password";
	helperText?: string;
	[key: string]: any;
}

const RHFTextField = ({
	name,
	placeholder,
	type = "text",
	helperText,
	...other
}: RHFTextFieldProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View>
					<TextInput
						{...field}
						placeholder={placeholder}
						secureTextEntry={type === "password"}
						keyboardType={type === "number" ? "numeric" : "default"}
						value={
							type === "number" && field.value === 0
								? ""
								: String(field.value)
						}
						onChangeText={(value) =>
							field.onChange(
								type === "number" ? Number(value) || 0 : value,
							)
						}
						placeholderTextColor={theme.palette.grey[500]}
						style={{
							backgroundColor: theme.palette.grey[0],
							borderColor: error
								? theme.palette.error.main
								: theme.palette.grey[300],
						}}
						{...other}
					/>
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

export default RHFTextField;
