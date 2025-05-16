import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { presetOptions } from "@/theme/presets";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NavHeader from "@/components/ui/NavHeader";


const Settings = () => {
	const { theme, setModeFunction, mode, preset: currentPreset, setPresetFunction } = useTheme();

	const [pushNotifications, setPushNotifications] = React.useState(false);
	const [preset, setPreset] = React.useState({});
	const [themeMode, setThemeMode] = React.useState(mode === "dark" ? "dark" : "light");

	const parenttheme = useTheme();

	const handleSetMode = () => {
		setModeFunction(mode === "dark" ? "light" : "dark");
	};

	const presets = ["default", "cyan", "purple", "blue", "orange", "red", "brown", "green"];

	const handleSetPresets = (props: any) => {
		setPresetFunction(props);

	};

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.background.default }}
			edges={["top", "left", "right"]}
		>
			<NavHeader headerTitle="My Settings" backUrl="/profile"  />

			<ScrollView>
				<View style={styles.container}>
					{/* Theme Mode Section */}

					<View style={styles.section}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								marginBottom: 12,
								color: theme.text.primary,
							}}
						>
							Theme Mode
						</Text>

						<View
							style={{
								flexDirection: "column",
								alignItems: "flex-start",
								justifyContent: "flex-start",
							}}
						>
							<Text
								style={{
									color: theme.text.secondary,
								}}
							>
								{mode === "dark" ? "Dark Mode" : "Light Mode"}
							</Text>

							<Switch
								value={mode === "dark"}
								onValueChange={() => {
									handleSetMode();
								}}
								trackColor={{
									false: theme.grey[300],
									true: theme.palette.primary.main,
								}}
								thumbColor={theme.grey[0]}
							/>
							<Text
								style={{
									color: theme.text.disabled,
								}}
							>
								Toggle between light and dark mode
							</Text>
						</View>
					</View>

					{/* Color Presets Section */}

					<View style={styles.section}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								marginBottom: 12,
								color: theme.text.primary,
							}}
						>
							Color Presets
						</Text>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 8,
								justifyContent: "space-between",
							}}
						>
							{Object.entries(presetOptions).map(([key, value], index) => {
								return (
									<TouchableOpacity
										key={key}
										onPress={() => {
											handleSetPresets(value.name);
											console.log("Color Preset changed:", key);
											console.log("Color Preset changed:", value);
										}}
									>
										<View
											style={{
												position: "relative",
												width: 24,
												height: 24,
												marginBottom: 4,
											}}
										>
											<View
												style={{
													width: 30,
													height: 30,
													borderRadius: 15,
													borderWidth: 1,
													backgroundColor: value.value,
													borderColor:
														currentPreset === key
															? theme.palette.primary.main
															: "#0000001A",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												{currentPreset === value.name && (
													<MaterialIcons
														name="check"
														size={14}
														color={theme.palette.primary.contrastText}
														style={{
															fontWeight: "bold",
														}}
													/>
												)}
											</View>
										</View>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	section: {
		marginBottom: 24,
	},

	colorIndicator: {
		position: "relative",
		width: 24,
		height: 24,
		marginBottom: 4, // Adjusted for vertical layout
	},
});

export default Settings;
