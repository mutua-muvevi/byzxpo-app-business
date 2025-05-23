import { Stack } from "expo-router";

const PublicLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="register" options={{ headerShown: false }} />
			{/* Add other public screens as needed */}
		</Stack>
	);
};

export default PublicLayout;
