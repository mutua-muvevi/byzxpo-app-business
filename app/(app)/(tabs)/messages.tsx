import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<Text>Message</Text>
			<Text>Reply</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({})

export default Messages;
