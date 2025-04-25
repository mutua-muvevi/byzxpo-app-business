// auth/context.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
	AuthContextType,
	AuthState,
	LoginCredentials,
	RegisterCredentials,
	ForgotPasswordCredentials,
	ResetPasswordCredentials,
} from "./types";
import {
	loginAPI,
	registerAPI,
	forgotPasswordAPI,
	resetPasswordAPI,
	refreshTokenAPI,
	logoutAPI,
	fetchMeAPI,
} from "./api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<AuthState>({
		user: null,
		accessToken: null,
		refreshToken: null,
		isAuthenticated: false,
		loading: true,
		error: null,
	});

	const initializeAuth = async () => {
		try {
			const accessToken = await AsyncStorage.getItem("accessToken");
			const refreshToken = await AsyncStorage.getItem("refreshToken");
			const userString = await AsyncStorage.getItem("user");
			const user = userString ? JSON.parse(userString) : null;

			if (accessToken && user) {
				setState({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					loading: false,
					error: null,
				});
			} else {
				setState((prev) => ({ ...prev, loading: false }));
			}
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: "Failed to initialize auth" }));
		}
	};

	const login = async (credentials: LoginCredentials) => {
		console.log("running")
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			const response = await loginAPI(credentials);
			if (!response || !response.accessTkn || !response.refreshTkn || !response.user) {
				throw new Error("Invalid response from loginAPI");
			}
			const { accessTkn: accessToken, refreshTkn: refreshToken, user } = response;
			console.log("GOTIT >>>>>>>>>>>", response)
			setState({
				user,
				accessToken,
				refreshToken,
				isAuthenticated: true,
				loading: false,
				error: null,
			});
			Toast.show({ type: "success", text1: "Success", text2: "Logged in successfully" });
			return {accessToken, refreshToken, user};

		} catch (error : any) {
			console.log("THE ERROR IS", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error instanceof Error ? error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error instanceof Error ? error : "An unknown error occurred",
			});
			throw error;
		}
	};

	const register = async (credentials: RegisterCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			const { accessToken, refreshToken, user } = await registerAPI(credentials);
			setState({
				user,
				accessToken,
				refreshToken,
				isAuthenticated: true,
				loading: false,
				error: null,
			});
			Toast.show({ type: "success", text1: "Success", text2: "Registered successfully" });
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: error.message }));
			Toast.show({ type: "error", text1: "Error", text2: error.message });
		}
	};

	const forgotPassword = async (credentials: ForgotPasswordCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			await forgotPasswordAPI(credentials);
			setState((prev) => ({ ...prev, loading: false }));
			Toast.show({ type: "success", text1: "Success", text2: "Reset email sent" });
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: error.message }));
			Toast.show({ type: "error", text1: "Error", text2: error.message });
		}
	};

	const resetPassword = async (credentials: ResetPasswordCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			await resetPasswordAPI(credentials);
			setState((prev) => ({ ...prev, loading: false }));
			Toast.show({ type: "success", text1: "Success", text2: "Password reset successful" });
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: error.message }));
			Toast.show({ type: "error", text1: "Error", text2: error.message });
		}
	};

	const logout = async () => {
		setState((prev) => ({ ...prev, loading: true }));
		try {
			await logoutAPI();

			setState({
				user: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
				loading: false,
				error: null,
			});
			Toast.show({ type: "success", text1: "Success", text2: "Logged out successfully" });
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: "Logout failed" }));
			Toast.show({ type: "error", text1: "Error", text2: "Logout failed" });
		}
	};

	const fetchMe = async () => {
		setState((prev) => ({ ...prev, loading: true }));
		try {
			const user = await fetchMeAPI(state.accessToken!);
			setState((prev) => ({ ...prev, user, loading: false }));
		} catch (error) {
			setState((prev) => ({ ...prev, loading: false, error: "Failed to fetch user data" }));
		}
	};

	const refreshAccessToken = async () => {
		if (!state.refreshToken) return;
		setState((prev) => ({ ...prev, loading: true }));
		try {
			const { accessToken, refreshToken } = await refreshTokenAPI(state.refreshToken);
			setState((prev) => ({
				...prev,
				accessToken,
				refreshToken,
				loading: false,
			}));
		} catch (error) {
			await logout();
		}
	};

	useEffect(() => {
		initializeAuth();
	}, []);

	const checkAuthenticated =
		state.accessToken !== null && state.refreshToken !== null
			? "authenticated"
			: "unauthenticated";

	const status = state.loading ? "loading" : checkAuthenticated;

	const contextValue = useMemo(() => ({
		...state,
		login,
		register,
		forgotPassword,
		resetPassword,
		logout,
		refreshAccessToken,
		fetchMe,
		authenticated: status === "authenticated",
		unauthenticated: status === "unauthenticated",
		user: state.user ? { ...state.user, token: state.accessToken ?? undefined } : null,
	}), [state, login, register, forgotPassword, resetPassword, logout, refreshAccessToken, fetchMe, status]);

	return (
		<AuthContext.Provider
			value={contextValue}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
