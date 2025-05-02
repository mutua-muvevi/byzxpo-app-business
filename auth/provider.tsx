// auth/context.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { error } from '../theme/palette';
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
	saveBusiness,
	removeBusiness,
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
			let userString = await AsyncStorage.getItem("user");
			const user = userString ? JSON.parse(userString) : null;

			if (accessToken && user) {

				const userFetched = await fetchMeAPI(accessToken);
				console.log("USER FETCHED ||||||||", userFetched)

				if (!userFetched) {
					throw new Error("Invalid response from fetchMeAPI");
				}
				
				//@ts-ignore
				const { user: me } = userFetched


				if (me) {
					await AsyncStorage.setItem("user", JSON.stringify(me));
				}

				setState({
					user : me,
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
			setState((prev) => ({ ...prev, loading: false, error: `Failed to initialize auth, ${(JSON.stringify(error))}` }));
		}
	};

	const login = async (credentials: LoginCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			const response = await loginAPI(credentials);
			if (!response || !response.accessTkn || !response.refreshTkn || !response.user) {
				throw new Error("Invalid response from loginAPI");
			}
			const { accessTkn: accessToken, refreshTkn: refreshToken } = response;
			
			if(accessToken && refreshToken) {
				//@ts-ignore
				const { user } = await fetchMeAPI(accessToken);

				if (!user) {
					throw new Error("Invalid response from fetchMeAPI");
				}


				setState({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					loading: false,
					error: null,
				});
				Toast.show({ type: "success", text1: "Success", text2: "Logged in successfully" });
				return { accessToken, refreshToken, user } as { accessToken: any; refreshToken: any; user: any };

			}

			return null


		} catch (error : any) {
			console.log("THE ERROR IS", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error ?? new Error("An unknown error occurred");
		}
	};

	const register = async (credentials: RegisterCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			
			const response = await registerAPI(credentials);
			if (!response || !response.accessTkn || !response.refreshTkn || !response.user) {
				throw new Error("Invalid response from loginAPI");
			}
			const { accessTkn: accessToken, refreshTkn: refreshToken } = response;
			
			if(accessToken && refreshToken) {
				//@ts-ignore
				const { user } = await fetchMeAPI(accessToken);

				if (!user) {
					throw new Error("Invalid response from fetchMeAPI");
				}


				setState({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					loading: false,
					error: null,
				});
				Toast.show({ type: "success", text1: "Success", text2: "Registered successfully" });
				return { accessToken, refreshToken, user };
			}
		} catch (error: any) {
			console.log("The error is", error, error.message, error.error);
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error;
		}
	};

	const forgotPassword = async (credentials: ForgotPasswordCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			const response = await forgotPasswordAPI(credentials);
			
			if (!response || !response.accessTkn || !response.refreshTkn || !response.user) {
				throw new Error("Invalid response from loginAPI");
			}
			const { accessTkn: accessToken, refreshTkn: refreshToken } = response;

			if(accessToken && refreshToken) {
				//@ts-ignore
				const { user } = await fetchMeAPI(accessToken);

				if (!user) {
					throw new Error("Invalid response from fetchMeAPI");
				}


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

			}

		} catch (error : any) {
			console.log("THE ERROR IS", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error;
		}
	};

	const resetPassword = async (credentials: ResetPasswordCredentials) => {
		setState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			await resetPasswordAPI(credentials);
			setState((prev) => ({ ...prev, loading: false }));
			Toast.show({ type: "success", text1: "Success", text2: "Password reset successful" });
		} catch (error : any) {
			console.log("THE ERROR IS", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error;
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

	const saveABusiness = async (credentials: any) => {
		setState((prev) => ({ ...prev, loading: true }));
		
		try {
			console.log("Credentials", credentials)
			console.log("AccessToken", state.accessToken)
			const response = await saveBusiness(state.accessToken!, credentials);

			const { success, savedBusiness, message } = response

			return { success, savedBusiness, message }
		} catch (error : any) {
			console.log("ERRRRRRRRRRRRRROR", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error;
		} finally {
			setState((prev) => ({ ...prev, loading: false }));
		}
	}

	const removeABusiness = async (businessId: any) => {
		setState((prev) => ({ ...prev, loading: true }));
		
		try {
			console.log("Credentials", businessId)
			console.log("AccessToken", state.accessToken)
			const response = await removeBusiness(state.accessToken!, businessId);

			const { message } = response

			return { message }

		} catch (error : any) {
			console.log("ERRRRRRRRRRRRRROR", error)
			setState((prev) => ({
				...prev,
				loading: false,
				error: error ? error?.error : "An unknown error occurred",
			}));
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error ? error?.error : "An unknown error occurred",
			});
			throw error;
		} finally {
			setState((prev) => ({ ...prev, loading: false }));
		}
	}

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
		saveABusiness,
		removeABusiness,
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
