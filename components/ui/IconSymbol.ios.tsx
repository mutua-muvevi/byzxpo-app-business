import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

interface IconSymbolProps {
	name: SymbolViewProps["name"];
	size?: number;
	color: string;
	style?: StyleProp<ViewStyle>;
	weight?: SymbolWeight;
}

export const IconSymbol = ({
	name,
	size = 24,
	color,
	style,
	weight = "regular",
}: IconSymbolProps) => {
	return (
		<SymbolView
			weight={weight}
			tintColor={color}
			resizeMode="scaleAspectFit"
			name={name}
			style={[
				{
					width: size,
					height: size,
				},
				style,
			]}
		/>
	);
};
