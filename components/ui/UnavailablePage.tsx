import { useTheme } from "@/theme";
import { Image, Text, View } from "react-native";

const UnavailableContentPage = ({text} : { text: string }) => {
	const theme = useTheme();
	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
				flex: 1,
				padding: 20,
				gap: 10,
				backgroundColor: theme.theme.background.paper,
				height: "100%",
			}}
		>
			<Image
				source={require("../../assets/images/unavailable.png")}
				alt="Business not available"
				style={{
					height: 500,
					width: "100%",
					resizeMode: "cover"
				}}
			/>
			<Text style={{ fontSize: 18, fontWeight: "bold", color: theme.theme.text.primary }}>
				{text}
			</Text>
		</View>
	);
};

export default UnavailableContentPage;