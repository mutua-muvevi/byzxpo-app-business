import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import Toast from "react-native-toast-message";
import { EnquiryInterface, FetchEnquiriesResponse } from "@/types/enquiry";
import {
	fetchEnquiriesAPI,
	fetchEnquiryAPI,
	fetchEnquiryAsPerBusinessAPI,
} from "@/actions/enquiries/fetch";
import { useAuth } from "@/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteEnquiryAPI } from "@/actions/enquiries/delete";

interface EnquiriesContextInterface {
	allEnquiries: EnquiryInterface[];
	allEnquiriesLoading: boolean;
	fetchEnquiries: (pageNo?: number, pageLimit?: number) => Promise<void>;

	businessEnquiries: EnquiryInterface[];
	allBusinessEnquiriesLoading: boolean;
	fetchBusinessEnquiries: (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => Promise<void>;

	singleEnquiry: EnquiryInterface | null;
	singleEnquiryLoading: boolean;
	fetchSingleEnquiry: (enquiryId: string) => Promise<void>;
	setSingleEnquiryFunction: (enquiry: EnquiryInterface) => void;

	deleteEnquiryLoading: boolean;
	deleteEnquiry: (enquiryId: string) => Promise<void>;
	setSingleDeleteEnquiryFunction: (enquiry: EnquiryInterface) => void;
}

const defaultEnquiriesContext = undefined;

const EnquiriesContext = createContext<EnquiriesContextInterface | undefined>(
	defaultEnquiriesContext,
);

const EnquiriesContextProvider = ({ children }: { children: ReactNode }) => {
	const [allEnquiries, setAllEnquiries] = useState<EnquiryInterface[]>([]);
	const [allEnquiriesLoading, setAllEnquiriesLoading] = useState<boolean>(false);

	const [businessEnquiries, setBusinessEnquiries] = useState<EnquiryInterface[]>([]);
	const [allBusinessEnquiriesLoading, setAllBusinessEnquiriesLoading] = useState<boolean>(false);

	const [singleEnquiry, setSingleEnquiry] = useState<EnquiryInterface | null>(null);

	const [singleEnquiryLoading, setSingleEnquiryLoading] = useState<boolean>(false);

	const [deleteEnquiryLoading, setDeleteEnquiryLoading] = useState<boolean>(false);

	const { user, accessToken } = useAuth();

	const token = accessToken || user?.token || "";

	const fetchEnquiries = async (pageNo?: number, pageLimit?: number) => {
		setAllEnquiriesLoading(true);
		try {
			const response: FetchEnquiriesResponse = await fetchEnquiriesAPI(
				pageNo,
				pageLimit,
				token,
			);
			setAllEnquiries(response.enquiries);
			setAllEnquiriesLoading(false);
		} catch (error) {
			setAllEnquiriesLoading(false);
		}
	};

	const fetchBusinessEnquiries = async (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => {
		setAllBusinessEnquiriesLoading(true);
		try {
			const response: FetchEnquiriesResponse = await fetchEnquiryAsPerBusinessAPI(
				pageNo,
				pageLimit,
				businessId,
				token,
			);
			setBusinessEnquiries(response.enquiries);
			setAllBusinessEnquiriesLoading(false);
		} catch (error) {
			setAllBusinessEnquiriesLoading(false);

		}
	};

	const fetchSingleEnquiry = async (enquiryId: string) => {
		setSingleEnquiryLoading(true);
		try {
			const response = await fetchEnquiryAPI(enquiryId, token);
			setSingleEnquiry(response.enquiry);
			setSingleEnquiryLoading(false);
		} catch (error) {
			setSingleEnquiryLoading(false);
		}
	};

	const deleteEnquiry = async (enquiryId: string) => {
		setDeleteEnquiryLoading(true);
		try {
			await deleteEnquiryAPI(enquiryId, token);
			setDeleteEnquiryLoading(false);
		} catch (error) {
			setDeleteEnquiryLoading(false);
		}
	};

	

	const memoizedData = useMemo(() => ({
		allEnquiries,
		allEnquiriesLoading,
		fetchEnquiries,

		businessEnquiries,
		allBusinessEnquiriesLoading,
		fetchBusinessEnquiries,

		singleEnquiry,
		singleEnquiryLoading,
		fetchSingleEnquiry,
		setSingleEnquiryFunction: setSingleEnquiry,

		deleteEnquiryLoading,
		deleteEnquiry,
		setSingleDeleteEnquiryFunction: setSingleEnquiry,
	}), [
		allEnquiries,
		allEnquiriesLoading,
		fetchEnquiries,

		businessEnquiries,
		allBusinessEnquiriesLoading,
		fetchBusinessEnquiries,

		singleEnquiry,
		singleEnquiryLoading,
		fetchSingleEnquiry,

		deleteEnquiryLoading,
		deleteEnquiry,
	]);

	return (
		<EnquiriesContext.Provider value={memoizedData}>
			{children}
		</EnquiriesContext.Provider>
	);
};

const useEnquiries = () => {
	const context = useContext(EnquiriesContext);
	if (!context) {
		throw new Error("useEnquiries must be used within a EnquiriesProvider");
	}
	return context;
};

export {
	EnquiriesContext,
	EnquiriesContextProvider,
	useEnquiries,
}