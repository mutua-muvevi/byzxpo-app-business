import { useAuth } from "@/auth";
import React from "react";
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/provider";
import { palette, orange } from '../../theme/palette';
import { useRouter } from "expo-router";
import NavHeader from "@/components/ui/NavHeader";

const HeaderComponent = () => {
	const { theme } = useTheme();
	const { user } = useAuth();
	const router = useRouter();

	const handlePressEditProfileButton = () => {
		router.push("/edit");
	};

	return (
		<View style={{ padding: 16, backgroundColor: theme.palette.primary.main }}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					color: theme.palette.primary.contrastText,
				}}
			>
				{user?.name || "User Profile"}
			</Text>
			<Text style={{ fontSize: 16, color: theme.palette.primary.contrastText }}>
				{user?.email || "User Email"}
			</Text>
			<TouchableOpacity
				onPress={handlePressEditProfileButton}
				style={{
					marginTop: 16,
					padding: 8,
					backgroundColor: theme.error.main,
					borderRadius: 4,
				}}
			>
				<Text style={{ textAlign: "center", color: theme.error.contrastText, fontWeight: "bold" }}>Edit Profile</Text>
			</TouchableOpacity>
		</View>
	);
};

const ProfileAccount = () => {
	const { user } = useAuth();
	const { theme } = useTheme();

	const userDetailsArray = [
		{
			label: "Name",
			value: user?.name || "N/A",
		},
		{
			label: "Email",
			value: user?.email || "N/A",
		},
		{
			label: "Verified Email",
			value: user?.emailVerified ? "Yes" : "No",
		},
		{
			label: "Country",
			value: user?.country || "N/A",
		},
		{
			label: "Membership Type",
			value: user?.memberType || "N/A",
		},
	].filter((item) => item.value !== "N/A");

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<NavHeader headerTitle="My Profile" backUrl="/profile"  />

			<ScrollView style={{ flex: 1, gap: 10 }}>
				{/* <Text>ProfileAccount</Text> */}
				<HeaderComponent />

				<View style={{}}>
					{userDetailsArray.map((item, index) => (
						<View
							key={index}
							style={{
								marginBottom: 16,
								backgroundColor: theme.background.default,
								padding: 16,
								borderRadius: 8,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>{item.label}:</Text>
							<Text>{item.value}</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default ProfileAccount;
