import axios, { AxiosError } from "axios";

const API_URL = "https://byzxpo-server.onrender.com/api";

export const deleteReviewAPI = async (reviewId: string, token: string | undefined) => {
	try {
		const response = await axios.delete(`${API_URL}/reviews/delete/${reviewId}`, {
			headers: { Authorization: token },
		});
		return response.data;
	} catch (error) {
		throw new Error(
			(error as AxiosError<{ error?: string }>).response?.data?.error ||
				"Delete lead failed",
		);
	}
};