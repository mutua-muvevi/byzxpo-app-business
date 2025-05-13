import axios, { AxiosError } from "axios";

const API_URL = "https://byzxpo-server.onrender.com/api";

export const fetchLeadsAPI = async (pageNo: number = 1, pageLimit: number = 50, token: string) => {
	try {
		const response = await axios.get(`${API_URL}/leads/fetch/all`, {
			params: {
				page: pageNo,
				limit: pageLimit,
			},
			headers: { Authorization: token },
		});

		const { leads, success, meta, pagination } = response.data;

		return { leads, success, meta, pagination };
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch leads failed",
		);
	}
};

export const fetchLeadAPI = async (enquiryId: string, token: string | undefined) => {
	try {
		const response = await axios.get(`${API_URL}/leads/fetch/single/${enquiryId}`, {
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

export const fetchLeadAsPerBusinessAPI = async (
	pageNo: number = 1,
	pageLimit: number = 50,
	businessId: string,
	token: string,
) => {
	try {
		const response = await axios.get(`${API_URL}/leads/fetch/business/all/${businessId}`, {
			headers: { Authorization: token },
			params: {
				page: pageNo,
				limit: pageLimit,
			}
		});
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch leads as p[er business failed",
		);
	}
};
