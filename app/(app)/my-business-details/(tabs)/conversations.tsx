import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<Text>Messages</Text>
			</View>
		</SafeAreaView>
	);
}

export default Messages;
