import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
	const profileList = [
		{
			name: "My Businesses",
			route: "/my-businesses",
			icon: "edit",
		},
		{
			name: "My Account Details",
			route: "/profile/account",
			icon: "edit",
		},
		{
			name: "Edit Profile",
			route: "/profile/edit",
			icon: "settings",
		},
		{
			name: "Settings",
			route: "/profile/settings",
			icon: "settings",
		},
	];
	return (
		<View>
			{
				profileList.map((item, index) => (
					<TouchableOpacity key={index} onPress={() => {}}>
						<Text>{item.name}</Text>
					</TouchableOpacity>
				))
			}
			
			<TouchableOpacity>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Profile;
