import axios, { AxiosError } from "axios";

const API_URL = "https://byzxpo-server.onrender.com/api";

export const fetchReviewsAPI = async ( page: number = 1, pageLimit: number = 50, token: string | undefined) => {
	try {
		const response = await axios.get(`${API_URL}/reviews/fetch/all`, {
			headers: { Authorization: token },
			params: {
				page: page,
				limit: pageLimit,
			}
		});
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch single failed",
		);
	}
};

export const fetchReviewsAsPerBusinessAPI = async (businessId: string, page: number = 1, pageLimit: number = 50, ) => {
	try {
		const response = await axios.get(`${API_URL}/reviews/fetch/business/${businessId}`, {
			params: {
				page: page,
				limit: pageLimit,
			}
		});
		
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch single failed",
		);
	}
};

export const fetchSingleReviewAPI = async (reviewId: string, token: string | undefined) => {
	try {
		const response = await axios.get(`${API_URL}/reviews/fetch/single/${reviewId}`, {
			headers: { Authorization: token },
		});
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch single failed",
		);
	}
};