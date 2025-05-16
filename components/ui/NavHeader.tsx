import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

interface NavHeaderProps {
	backUrl?: string;
	headerTitle: string;
	isTransparent?: boolean;
	rightElement?: React.ReactNode;
}

const NavHeader = ({
	backUrl,
	headerTitle,
	isTransparent = false,
	rightElement,
}: NavHeaderProps) => {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	// Handle back navigation
	const handleBack = () => {
		if (backUrl) {
			router.push(backUrl as any);
		} else if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<View
			style={{
				width: "100%",
				borderBottomWidth: 1,
				borderBottomColor: isTransparent ? "transparent" : "inherit",
				backgroundColor: isTransparent ? "transparent" : theme.palette.primary.main,
				// Remove paddingTop: insets.top to avoid double safe area padding
			}}
		>
			<StatusBar
				barStyle={isTransparent ? "dark-content" : "light-content"}
				backgroundColor={isTransparent ? "transparent" : theme.palette.primary.main}
				translucent={isTransparent}
			/>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: 10,
				}}
			>
				{/* Back Button */}
				<TouchableOpacity onPress={handleBack} style={{ padding: 8 }}>
					<Ionicons
						name="arrow-back"
						size={24}
						color={theme.primary.contrastText}
					/>
				</TouchableOpacity>

				{/* Header Title */}
				<Text
					style={{
						flex: 1,
						fontSize: 18,
						fontWeight: "600",
						textAlign: "center",
						marginHorizontal: 8,
						color: isTransparent ? "#fff" : theme.primary.contrastText,
					}}
					numberOfLines={1}
				>
					{headerTitle}
				</Text>

				{/* Right Element */}
				<View
					style={{
						padding: 8,
						minWidth: 40,
						alignItems: "flex-end",
					}}
				>
					{rightElement || <View style={{ width: 24 }} />}
				</View>
			</View>
		</View>
	);
};

export default NavHeader;
