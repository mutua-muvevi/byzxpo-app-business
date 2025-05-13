import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import Toast from "react-native-toast-message";
import { ReviewInterface, FetchReviewsResponse } from "@/types/review";
import {
	fetchReviewsAPI,
	fetchSingleReviewAPI,
	fetchReviewsAsPerBusinessAPI,
} from "@/actions/reviews/fetch";
import { useAuth } from "@/auth";
import { deleteReviewAPI } from "@/actions/reviews/delete";

interface ReviewsContextInterface {
	allReviews: ReviewInterface[];
	allReviewsLoading: boolean;
	fetchReviews: (pageNo?: number, pageLimit?: number) => Promise<void>;

	businessReviews: ReviewInterface[];
	allBusinessReviewsLoading: boolean;
	fetchBusinessReviews: (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => Promise<void>;

	singleReview: ReviewInterface | null;
	singleReviewLoading: boolean;
	fetchSingleReview: (reviewId: string) => Promise<void>;
	setSingleReviewFunction: (review: ReviewInterface) => void;

	deleteReviewLoading: boolean;
	deleteReview: (reviewId: string) => Promise<void>;
	setSingleDeleteReviewFunction: (review: ReviewInterface) => void;
}

const defaultReviewsContext = undefined;

const ReviewsContext = createContext<ReviewsContextInterface | undefined>(
	defaultReviewsContext,
);

const ReviewsContextProvider = ({ children }: { children: ReactNode }) => {
	const [allReviews, setAllReviews] = useState<ReviewInterface[]>([]);
	const [allReviewsLoading, setAllReviewsLoading] = useState<boolean>(false);

	const [businessReviews, setBusinessReviews] = useState<ReviewInterface[]>([]);
	const [allBusinessReviewsLoading, setAllBusinessReviewsLoading] = useState<boolean>(false);

	const [singleReview, setSingleReview] = useState<ReviewInterface | null>(null);

	const [singleReviewLoading, setSingleReviewLoading] = useState<boolean>(false);

	const [deleteReviewLoading, setDeleteReviewLoading] = useState<boolean>(false);

	const { user, accessToken } = useAuth();

	const token = accessToken || user?.token || "";

	const fetchReviews = async (pageNo?: number, pageLimit?: number) => {
		setAllReviewsLoading(true);
		try {
			const response: FetchReviewsResponse = await fetchReviewsAPI(
				pageNo,
				pageLimit,
				token,
			);
			setAllReviews(response.reviews);
			setAllReviewsLoading(false);
		} catch (error) {
			setAllReviewsLoading(false);
		}
	};

	const fetchBusinessReviews = async (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => {
		setAllBusinessReviewsLoading(true);
		try {
			const response: FetchReviewsResponse = await fetchReviewsAsPerBusinessAPI(
				businessId,
				pageNo,
				pageLimit,
			);
			console.log("REEEEEDPONSEEEEEEEEEEEEEE", response)
			
			setBusinessReviews(response.reviews);
			setAllBusinessReviewsLoading(false);
		} catch (error) {
			setAllBusinessReviewsLoading(false);

		}
	};

	const fetchSingleReview = async (reviewId: string) => {
		setSingleReviewLoading(true);
		try {
			const response = await fetchSingleReviewAPI(reviewId, token);
			setSingleReview(response.review);
			setSingleReviewLoading(false);
		} catch (error) {
			setSingleReviewLoading(false);
		}
	};

	const deleteReview = async (reviewId: string) => {
		setDeleteReviewLoading(true);
		try {
			await deleteReviewAPI(reviewId, token);
			setDeleteReviewLoading(false);
		} catch (error) {
			setDeleteReviewLoading(false);
		}
	};

	

	const memoizedData = useMemo(() => ({
		allReviews,
		allReviewsLoading,
		fetchReviews,

		businessReviews,
		allBusinessReviewsLoading,
		fetchBusinessReviews,

		singleReview,
		singleReviewLoading,
		fetchSingleReview,
		setSingleReviewFunction: setSingleReview,

		deleteReviewLoading,
		deleteReview,
		setSingleDeleteReviewFunction: setSingleReview,
	}), [
		allReviews,
		allReviewsLoading,
		fetchReviews,

		businessReviews,
		allBusinessReviewsLoading,
		fetchBusinessReviews,

		singleReview,
		singleReviewLoading,
		fetchSingleReview,

		deleteReviewLoading,
		deleteReview,
	]);

	return (
		<ReviewsContext.Provider value={memoizedData}>
			{children}
		</ReviewsContext.Provider>
	);
};

const useReviews = () => {
	const context = useContext(ReviewsContext);
	if (!context) {
		throw new Error("useReviews must be used within a ReviewsProvider");
	}
	return context;
};

export {
	ReviewsContext,
	ReviewsContextProvider,
	useReviews,
}