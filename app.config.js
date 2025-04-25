export default () => ({
	expo: {
		name: "byzxpo-business",
		slug: "byzxpo-business",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "byzxpo-business",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		ios: {
			supportsTablet: true,
			config: {
				googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
				usesNonExemptEncryption: false,
			},
			infoPlist: {
				NSLocationWhenInUseUsageDescription:
					"Allow location access to show nearby businesses.",
			},
			bundleIdentifier: "com.byzxpo",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			config: {
				googleMaps: {
					apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
				},
			},
			permissions: [
				"android.permission.ACCESS_FINE_LOCATION",
				"android.permission.ACCESS_COARSE_LOCATION",
			],
			package: "com.byzxpo",
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			"expo-router",
			[
				"expo-splash-screen",
				{
					image: "./assets/images/splash-icon.png",
					imageWidth: 200,
					resizeMode: "contain",
					backgroundColor: "#ffffff",
				},
			],
			[
				"expo-secure-store",
				{
					configureAndroidBackup: true,
					faceIDPermission:
						"Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
				},
			],
		],
		experiments: {
			typedRoutes: true,
		},
	},
});
