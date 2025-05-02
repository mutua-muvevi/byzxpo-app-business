// auth/api.ts
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	LoginCredentials,
	RegisterCredentials,
	ForgotPasswordCredentials,
	ResetPasswordCredentials,
	User,
} from "./types";

const API_URL = "https://byzxpo-server.onrender.com/api"; // Adjust to your server URL

// Set default headers
axios.defaults.headers.common["Content-Type"] = "application/json";

// Helper to set auth token
const setAuthToken = (token: string | null) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const loginAPI = async (credentials: LoginCredentials) => {
	try {
		const response = await axios.post(`${API_URL}/user/login`, credentials);
		console.log("RESPONSE", response.data);
		const { accessToken, refreshToken, user, message } = response.data;

		if (accessToken && refreshToken && user) {
			const { expiresIn: accessTokenexpiresIn, token: accessTkn } = accessToken;
			const { expiresIn: refreshTokenexpiresIn, token: refreshTkn } = refreshToken;

			await AsyncStorage.setItem("accessToken", accessTkn);
			await AsyncStorage.setItem("refreshToken", refreshTkn);
			await AsyncStorage.setItem("user", JSON.stringify(user));
			setAuthToken(accessTkn);

			return { accessTkn, refreshTkn, user, message };
		}
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error || "Login failed",
		);
	}
};

export const registerAPI = async (credentials: RegisterCredentials) => {
	try {
		const response = await axios.post(`${API_URL}/user/register`, credentials);
		const { accessToken, refreshToken, user, message } = response.data;

		if (accessToken && refreshToken && user) {
			const { expiresIn: accessTokenexpiresIn, token: accessTkn } = accessToken;
			const { expiresIn: refreshTokenexpiresIn, token: refreshTkn } = refreshToken;

			await AsyncStorage.setItem("accessToken", accessTkn);
			await AsyncStorage.setItem("refreshToken", refreshTkn);
			await AsyncStorage.setItem("user", JSON.stringify(user));
			setAuthToken(accessTkn);

			return { accessTkn, refreshTkn, user, message };
		}

		return null;
	} catch (error) {
		console.log("Error", error);
		throw new Error(
			// @ts-ignore
			(error as AxiosError<{ message?: string }>).response?.data?.error ||
				"Registration failed",
		);
	}
};

export const forgotPasswordAPI = async (credentials: ForgotPasswordCredentials) => {
	try {
		const response = await axios.post(`${API_URL}/user/forgot-password`, credentials);
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ message?: string }>).response?.data?.message ||
				"Failed to send reset email",
		);
	}
};

export const resetPasswordAPI = async (credentials: ResetPasswordCredentials) => {
	try {
		const response = await axios.post(`${API_URL}/user/reset-password`, credentials);
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ message?: string }>).response?.data?.message ||
				"Failed to reset password",
		);
	}
};

export const refreshTokenAPI = async (refreshToken: string) => {
	try {
		const response = await axios.post(`${API_URL}/user/refresh-token`, { refreshToken });
		const { accessToken, refreshToken: newRefreshToken } = response.data;

		await AsyncStorage.setItem("accessToken", accessToken);
		await AsyncStorage.setItem("refreshToken", newRefreshToken);
		setAuthToken(accessToken);

		return { accessToken, refreshToken: newRefreshToken };
	} catch (error) {
		const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message;
		throw new Error(errorMessage || "Failed to refresh token");
	}
};

export const fetchMeAPI = async (token: string): Promise<User> => {
	try {
		const response = await axios.get(`${API_URL}/user/fetch/me`, {
			headers: { Authorization: token },
		});
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch user data");
	}
};

export const logoutAPI = async () => {
	await AsyncStorage.removeItem("accessToken");
	await AsyncStorage.removeItem("refreshToken");
	await AsyncStorage.removeItem("user");
	setAuthToken(null);
};

export const saveBusiness = async (token : string, credentials : object) => {
	try {
		const response = await axios.post(
			`${API_URL}/saved-business/new`,
			credentials,
			{ headers: { Authorization: token } },
		)

		return response.data
	} catch (error) {
		console.log("Error", error);
		throw new Error(
			// @ts-ignore
			(error as AxiosError<{ message?: string }>).response?.data?.error ||
				"Registration failed",
		);
	}
};

export const removeBusiness = async (token : string, businessId: string) => {
	try {
		const response = await axios.delete(
			`${API_URL}/saved-business/delete/business/${businessId}`,
			{ headers: { Authorization: token } },
		)

		return response.data
	} catch (error) {
		console.log("Error", error);
		throw new Error(
			// @ts-ignore
			(error as AxiosError<{ message?: string }>).response?.data?.error ||
				"Registration failed",
		);
	}
};
