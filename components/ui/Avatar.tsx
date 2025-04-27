import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AvatarProps {
	text: string;
	width?: number;
	style?: any;
	backgroundColor?: string;
	color?: string;
	fontSize?: number;
	[key: string]: any;
}

const Avatar = ({ text, width, backgroundColor, style, color, fontSize }: AvatarProps) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				...style,
				width: width ? width : 40,
				height: width ? width : 40,
				borderRadius: (width ? width : 40) / 2,
				backgroundColor: backgroundColor ? backgroundColor : theme.palette.primary.main,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					color: color ? color : theme.palette.primary.contrastText,
					fontSize: fontSize ?? 16,
					textAlign: "center",
					fontWeight: "bold",
				}}
			>
				{text[0].toUpperCase()}
			</Text>
		</View>
	);
};

export default Avatar;
