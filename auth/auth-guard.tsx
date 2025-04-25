// auth/auth-guard.tsx
import React, { ReactNode, useEffect } from "react";
import { useRouter, Redirect } from "expo-router";
import { useAuth } from "./provider";
import { ActivityIndicator, View } from "react-native";

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isAuthenticated) {
		// Use Redirect to navigate to login
		return <Redirect href="/login" />;
	}

	return <>{children}</>;
};

export default AuthGuard;
