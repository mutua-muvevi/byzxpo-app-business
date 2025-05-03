import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { BusinessInterface, BusinessResponse } from "@/types/business";
import { useAuth } from "@/auth";
import { createNewBusiness } from "@/actions/business/new";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BusinessContextType {
	allBusinesses: BusinessInterface[];
	sponsoredBusinesses: BusinessInterface[];
	meta: any;
	loading: boolean;
	error: string | null;
	fetchAllBusinesses: (pageNo?: number, pageLimit?: number) => Promise<void>;
	pagination: any;

	singleBusiness: BusinessInterface | null;
	setSingleBusinessFunction: (business: BusinessInterface) => void;

	myBusinesses: BusinessInterface[];

	myBusiness: BusinessInterface | null;
	setMySingleBusinessFunction: (business: BusinessInterface) => void;

	businessToEdit: BusinessInterface | null;
	setBusinessToEditFunction: (business: BusinessInterface) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const BusinessProvider = ({ children }: { children: ReactNode }) => {
	const [allBusinesses, setAllBusinesses] = useState<BusinessInterface[]>([]);
	const [sponsoredBusinesses, setSponsoredBusinesses] = useState<BusinessInterface[]>([]);
	const [meta, setMeta] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<any>(null);
	const [singleBusiness, setSingleBusiness] = useState<BusinessInterface | null>(null);
	const [myBusinesses, setMyBusinesses] = useState<BusinessInterface[]>([]);
	const [myBusiness, setMyBusiness] = useState<BusinessInterface | null>(null);
	const { user, accessToken } = useAuth(); // Updated line without destructuring
	const [businessToEdit, setBusinessToEdit] = useState<BusinessInterface | null>(null);

	const fetchAllBusinesses = async (pageNo: number = 1, pageLimit: number = 50) => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<BusinessResponse>(
				"https://byzxpo-server.onrender.com/api/business/fetch/all",
				// 'http://192.168.1.100:7979/api/business/fetch/all',
				// `${process.env.EXPO_PUBLIC_API_URL}/api/business/fetch/all`,
				{
					params: {
						page: pageNo,
						limit: pageLimit,
					},
				},
			);

			const {
				businesses,
				success,
				meta: responseMeta,
				pagination: paginationResponse,
			} = response.data;

			if (!success) {
				throw new Error("Failed to fetch businesses");
			}

			setAllBusinesses(businesses);
			setSponsoredBusinesses(businesses.filter((b: any) => b.isSponsored === true));
			setMeta({
				pageNum: responseMeta?.pageNum ?? 0,
				limit: responseMeta?.limit ?? 0,
				totalBusinesses: responseMeta?.totalBusinesses ?? 0,
				totalPages: responseMeta?.totalPages ?? 0,
			});

			setPagination({
				totalItems: paginationResponse?.totalItems ?? 0,
				totalPages: paginationResponse?.totalPages ?? 0,
				currentPage: paginationResponse?.currentPage ?? 0,
				pageSize: paginationResponse?.pageSize ?? 0,
			});
		} catch (err) {
			let errorMessage: string;
			if (err instanceof AxiosError) {
				errorMessage = err.response?.data?.error || "An unexpected error occurred";
			} else if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = "An unknown error occurred";
			}

			setError(errorMessage);
			Toast.show({
				type: "error",
				text1: "Error",
				text2: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	};

	const setSingleBusinessFunction = (business: BusinessInterface) => {
		setSingleBusiness(business);
	};

	const setMySingleBusinessFunction = (business: BusinessInterface) => {
		setMyBusiness(business);
	};

	const setBusinessToEditFunction = (business: BusinessInterface) => {
		setBusinessToEdit(business);
	};

	useEffect(() => {
		if (user) {
			//@ts-ignore
			setMyBusinesses(user?.myBusinesses);
		}
	}, [user, allBusinesses]);

	useEffect(() => {
		fetchAllBusinesses();
	}, []);

	// register a business

	const memoizedContext = useMemo(
		() => ({
			allBusinesses,
			sponsoredBusinesses,
			meta,
			loading,
			error,
			fetchAllBusinesses,
			pagination,
			singleBusiness,
			setSingleBusinessFunction,
			myBusinesses,

			myBusiness,
			setMySingleBusinessFunction,

			businessToEdit,
			setBusinessToEditFunction,
		}),
		[
			allBusinesses,
			sponsoredBusinesses,
			meta,
			loading,
			error,
			fetchAllBusinesses,
			pagination,
			singleBusiness,
			myBusinesses,
			myBusiness,
			
		],
	);

	return <BusinessContext.Provider value={memoizedContext}>{children}</BusinessContext.Provider>;
};

const useBusiness = () => {
	const context = useContext(BusinessContext);
	if (!context) {
		throw new Error("useBusiness must be used within a BusinessProvider");
	}
	return context;
};

export { BusinessProvider, useBusiness };
