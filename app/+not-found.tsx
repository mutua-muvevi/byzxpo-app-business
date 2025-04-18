import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NotFound = () => {
	return (
		<View>
			<Text>Not Found</Text>
			<Text>Make sure that the path is correct</Text>
			<Text>and that you have added this route to your app.</Text>
			<Text>Check the console for more details.</Text>
			<Text>Or try to go back to the previous page.</Text>
			<Text>Or go to the home page.</Text>
		</View>
	);
}

const styles = StyleSheet.create({})

export default NotFound;
