import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { BusinessInterface, BusinessResponse } from "@/types/business";
import { CategoryPagination, CategoryInterface, CategoryResponse } from "@/types/category";
import { useBusiness } from "../business/fetch";

interface CategoryContextType {
	allCategories: CategoryInterface[];
	meta?: any;
	loading: boolean;
	error: string | null;
	pagination?: CategoryPagination;
	categoriesWithBusinesses: CategoryInterface[];
	
	singleCategory: CategoryInterface | null;
	setSingleCategoryFunction: (category: CategoryInterface) => void;
	
	fetchAllCategories: (pageNo?: number, pageLimit?: number) => Promise<void>;
	setBusinessFromCategory: (business: BusinessInterface) => void
	fetchAllBusinesses: (pageNo?: number, pageLimit?: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const CategoryProvider = ({ children }: { children: ReactNode }) => {
	const [allCategories, setAllCategories] = useState<CategoryInterface[]>([]);
	const [meta, setMeta] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<CategoryPagination | undefined>(undefined);
	const [categoriesWithBusinesses, setCategoriesWithBusinesses] = useState<CategoryInterface[]>(
		[],
	);
	const [singleCategory, setSingleCategory] = useState<CategoryInterface | null>(null);
	const [businessSet, setBusinessSet] = useState<BusinessInterface[] | null>(null);
	const { singleBusiness, allBusinesses } = useBusiness()

	const fetchAllCategories = async (pageNo?: number, pageLimit?: number) => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<CategoryResponse[]>(
				"https://byzxpo-server.onrender.com/api/categories/fetch/all",
				{
					params: {
						page: pageNo,
						limit: pageLimit,
					},
				},
			);

			//@ts-ignore
			const { categories, success, meta: responseMeta } = response.data;

			if (!success) {
				throw new Error("Failed to fetch categories");
			}

			setAllCategories(categories.sort((a : any, b : any) => b.businesses.length - a.businesses.length));
			setMeta(responseMeta);
			setPagination({
				currentPage: responseMeta.currentPage,
				totalPages: responseMeta.totalPages,
			});

			//filter categories with businesses and set them to state
			setCategoriesWithBusinesses(
				categories.filter(
					(category: CategoryInterface) =>
						category.businesses && category.businesses.length > 0,
				).sort((a : any, b : any) => b.businesses.length - a.businesses.length),
			);

			Toast.show({
				type: "success",
				text1: "Success",
				text2: "Categories fetched successfully",
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

	const fetchAllBusinesses = async (pageNo?: number, pageLimit?: number) => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<BusinessResponse[]>(
				"https://byzxpo-server.onrender.com/api/businesses/fetch/all",
				{
					params: {
						page: pageNo,
						limit: pageLimit,
					},
				},
			);

			const { businesses, success } : any = response.data;

			if (!success) {
				throw new Error("Failed to fetch businesses");
			}

			setAllCategories(businesses.sort((a : any, b : any) => b.businesses.length - a.businesses.length));
			Toast.show({
				type: "success",
				text1: "Success",
				text2: "Businesses fetched successfully",
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
	}



	const setSingleCategoryFunction = (category: CategoryInterface) => {
		setSingleCategory(category);
	}

	const setBusinessFromCategory = (business: BusinessInterface) => {
		const businessSetFromCategory = allBusinesses.filter((b : any) => b._id === business._id);
		setBusinessSet(businessSetFromCategory);
	}

	useEffect(() => {
		fetchAllCategories();
	}, []);

	const memoizedCategoryValues = {
		allCategories,
		meta,
		loading,
		error,
		pagination,
		categoriesWithBusinesses,
		
		singleCategory,
		setSingleCategoryFunction,

		fetchAllCategories,

		setBusinessFromCategory,
		fetchAllBusinesses,
	}

	return (
		<CategoryContext.Provider
			value={memoizedCategoryValues}
		>
			{children}
		</CategoryContext.Provider>
	);
};

const useCategory = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategory must be used within a CategoryProvider");
	}
	return context;
};

export { CategoryProvider, useCategory };
