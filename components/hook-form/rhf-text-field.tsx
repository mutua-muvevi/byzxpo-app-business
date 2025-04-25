// components/hook-form/rhf-text-field.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { useTheme } from "@/theme/provider";

interface RHFTextFieldProps {
	name: string;
	placeholder?: string | undefined;
	type?: "text" | "number" | "password";
	helperText?: string | undefined;
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
			render={({ field, fieldState: { error } }) => {
				return (
					<View>
						<TextInput
							{...field}
							placeholder={placeholder}
							secureTextEntry={type === "password"}
							keyboardType={type === "number" ? "numeric" : "default"}
							value={
								type === "number" && field.value === 0 ? "" : String(field.value)
							}
							onChangeText={(value) =>
								field.onChange(type === "number" ? Number(value) || 0 : value)
							}
							placeholderTextColor={theme.grey[500]}
							style={{
								backgroundColor: theme.grey[200],
								borderColor: error
									? theme.error.main
									: theme.grey[900],
								borderRadius: 5,
								padding:20
							}}
							{...other}
						/>
						{(error || helperText) && (
							<Text
								style={{
									color: error
										? theme.error.main
										: theme.text.secondary,
									fontSize: 12,
									padding:1,
									marginBottom:5
								}}
							>
								{error?.message || helperText}
							</Text>
						)}
					</View>
				);
			}}
		/>
	);
};

export default RHFTextField;
