import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { BusinessInterface } from "@/types/business";
import { CategoryPagination, CategoryInterface, CategoryResponse } from "@/types/category";

interface CategoryContextType {
	allCategories: CategoryInterface[];
	meta?: any;
	loading: boolean;
	error: string | null;
	fetchAllCategories: (pageNo?: number, pageLimit?: number) => Promise<void>;
	pagination?: CategoryPagination;
	categoriesWithBusinesses: CategoryInterface[];
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

			setAllCategories(categories);
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

	useEffect(() => {
		fetchAllCategories();
	}, []);

	return (
		<CategoryContext.Provider
			value={{
				allCategories,
				meta,
				loading,
				error,
				fetchAllCategories,
				pagination,
				categoriesWithBusinesses,
			}}
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
