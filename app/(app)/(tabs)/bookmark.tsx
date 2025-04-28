import { useTheme } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookmarkHeader = () => {
	const { theme } = useTheme();

	return (
<View
			style={{
				paddingHorizontal: 5,
				paddingVertical: 10,
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					color: theme.palette.primary.contrastText,
					fontWeight: "bold",
				}}
			>
				My saved businesses
			</Text>
			
		</View>
	)
}

const Bookmark = () => {
	return (
		<SafeAreaView>
			<BookmarkHeader />
			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({})

export default Bookmark;
