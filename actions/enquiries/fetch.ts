import axios, { AxiosError } from "axios";

const API_URL = "https://byzxpo-server.onrender.com/api";

export const fetchEnquiriesAPI = async (pageNo: number = 1, pageLimit: number = 50, token: string) => {
	try {
		const response = await axios.get(`${API_URL}/enquiries/fetch/all`, {
			params: {
				page: pageNo,
				limit: pageLimit,
			},
			headers: { Authorization: token },
		});

		const { enquiries, success, meta, pagination } = response.data;

		return { enquiries, success, meta, pagination };
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Fetch enquiries failed",
		);
	}
};

export const fetchEnquiryAPI = async (enquiryId: string, token: string | undefined) => {
	try {
		const response = await axios.get(`${API_URL}/enquiries/fetch/single/${enquiryId}`, {
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

export const fetchEnquiryAsPerBusinessAPI = async (
	pageNo: number = 1,
	pageLimit: number = 50,
	businessId: string,
	token: string,
) => {
	try {
		const response = await axios.get(`${API_URL}/enquiries/fetch/business/all/${businessId}`, {
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
				"Fetch enquiries as p[er business failed",
		);
	}
};
