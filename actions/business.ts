import axios from "axios";

const API_URL = "https://byzxpo-server.onrender.com/api";

export const createNewBusiness = async (
	data: any,
	setAlertMessage: (message: string) => void,
	setAlertSeverity: (severity: "info" | "success" | "error") => void,
	token: string,
) => {
	try {
		console.log("Data coming from the form to api", data);
		const formData = new FormData();

		// Append basic info
		formData.append("businessName", data?.businessName);
		if (data?.basicInfo.email) formData.append("email", data?.basicInfo.email);
		if (data?.basicInfo.phone) formData.append("phone", data?.basicInfo.phone);
		if (data?.basicInfo.website) formData.append("website", data?.basicInfo.website);
		if (data?.basicInfo.tags) formData.append("tags", data?.basicInfo.tags);

	
	
		// Append location
		if (data.location.city) formData.append("city", data.location.city);
		if (data.location.country) formData.append("country", data.location.country);
		if (data.location.street) formData.append("street", data.location.street);
		if (data.location.state) formData.append("state", data.location.state);
		

		// Append images
		if (data?.thumbnail) {
			formData.append("thumbnail", {
			  uri: data.thumbnail.uri,
			  name: data.thumbnail.fileName || `thumbnail.${data.thumbnail.mimeType.split("/")[1]}`,
			  type: data.thumbnail.mimeType,
			} as any); // Cast to any to satisfy FormData type
		  }
	  
		  if (data?.logo) {
			formData.append("logo", {
			  uri: data.logo.uri,
			  name: data.logo.fileName || `logo.${data.logo.mimeType.split("/")[1]}`,
			  type: data.logo.mimeType,
			} as any);
		  }

		// Posting the data
		const response = await axios.post(
			`${API_URL}/business/create`,
			formData, // Use formData instead of data
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: token, // Ensure token format matches server expectation
				},
			},
		);

		console.log("response >>>>>>>>>", response);

		const { message, success } = response.data;

		setAlertMessage(message);
		setAlertSeverity(success ? "success" : "info");

		return response.data;
	} catch (error: any) {
		console.error("EEEEEEEEEEEEEERRRRRRRRRRRRRRRRROOOOOOOOOOOOOORRRRRRRRRR",JSON.stringify(error));
		throw error?.response?.data?.error || error;
	}
};
