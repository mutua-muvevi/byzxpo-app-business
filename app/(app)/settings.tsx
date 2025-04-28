import { useTheme } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SettingsHeader = () => {
	const { theme } = useTheme();

	return (
		<View style={{ padding: 16, backgroundColor: theme.palette.primary.main }}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					color: theme.palette.primary.contrastText,
				}}
			>
				My Settings
			</Text>
		</View>
	);
};

const Settings = () => {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<SettingsHeader />
			
			<Text>Settings</Text>
		</SafeAreaView>
	);
};

export default Settings;
