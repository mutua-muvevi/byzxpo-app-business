// components/hook-form/rhf-slider.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@/theme";

interface RHFSliderProps {
	name: string;
	helperText?: string;
	[key: string]: any;
}

 const RHFSlider = ({
	name,
	helperText,
	...other
}: RHFSliderProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<Slider
						value={field.value}
						onValueChange={field.onChange}
						minimumTrackTintColor={theme.palette.primary.main}
						maximumTrackTintColor={theme.palette.grey[300]}
						thumbTintColor={theme.palette.primary.main}
						{...other}
					/>
					{(error || helperText) && (
						<Text
							className="text-caption mt-1"
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


export default RHFSlider;