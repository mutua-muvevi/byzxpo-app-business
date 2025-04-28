import { useAuth } from "@/auth";
import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
	const {
		//@ts-ignore
		user,
		logout,
	} = useAuth();

	const { theme, mode } = useTheme();
	const router = useRouter();

	const navigationHandler = (link: any) => {
		router.push(link);
	};

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};

	const profileList = [
		{
			name: "My Businesses",
			route: "/my-businesses",
			icon: <FontAwesome name="th-list" size={15} color={theme.text.secondary} />,
		},
		{
			name: "My Account Details",
			route: "/account",
			icon: <MaterialIcons name="account-box" size={15} color={theme.text.secondary} />,
		},
		{
			name: "Edit Profile",
			route: "/edit",
			icon: <FontAwesome5 name="user-edit" size={15} color={theme.text.secondary} />,
		},
		{
			name: "Settings",
			route: "/settings",
			icon: <Ionicons name="settings" size={15} color={theme.text.secondary} />,
		},
	];

	return (
		<SafeAreaView
			style={{
				gap: 10,
				paddingTop: 10,
				flex: 1,
				paddingBottom: 10,
				paddingLeft: 5,
				paddingRight: 5,
				justifyContent: "center",
				backgroundColor: theme.background.default,
			}}
		>
			<StatusBar
				backgroundColor={
					mode === "light" ? theme.palette.primary.main : theme.background.default
				}
			/>
			<View
				style={{
					justifyContent: "center",
					width: "100%",
					alignItems: "center",
					gap: 10,
				}}
			>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						height: 70,
						width: 70,
						borderRadius: 35,
						borderWidth: 5,
						borderColor: theme.background.default,
						backgroundColor: theme.palette.primary.main,
					}}
				>
					<Text
						style={{
							color: theme.palette.primary.contrastText,
							fontSize: 35,
							fontWeight: "900",
						}}
					>
						{user?.name[0]}
					</Text>
				</View>

				<View style={{ alignItems: "center", paddingBottom: 20 }}>
					<Text
						style={{
							fontSize: 18,
							color: theme.palette.primary.main,
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						{user?.name}
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: theme.palette.primary.main,
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						{user?.email}
					</Text>
				</View>
			</View>

			<View style={{ gap: 20 }}>
				{profileList.map((item, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							navigationHandler(item.route);
						}}
					>
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
								{item.icon}
								<Text style={{ color: theme.text.primary }}>{item.name}</Text>
							</View>

							<Entypo name="chevron-right" size={24} color={theme.text.primary} />
						</View>
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity
				onPress={() => handleLogout()}
				style={{
					width: "100%",
					borderWidth: 1,
					borderColor: theme.text.disabled,
					padding: 10,
					borderRadius: 5,
					alignItems: "center",
				}}
			>
				<Text style={{ color: theme.text.secondary, fontWeight: "bold" }}>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Profile;
