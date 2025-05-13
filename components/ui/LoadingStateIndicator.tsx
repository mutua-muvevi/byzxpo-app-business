import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "@/theme";

const LoadingStateIndicator = ({ text }: { text?: string }) => {
	const { theme } = useTheme();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.background.paper,
			}}
		>
			<ActivityIndicator
				size="large"
				color={theme.palette.primary.main}
				animating={true}
				style={{ marginBottom: 20 }}
			/>
			<Text style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
				{text || "Loading, please wait..."}
			</Text>
		</View>
	);
};

export default LoadingStateIndicator;
