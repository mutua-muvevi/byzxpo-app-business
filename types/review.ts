export interface ReviewInterface {
	_id: string;
	business: string;
	rating: number;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}


export interface FetchReviewsResponse {
	success: boolean;
	reviews: ReviewInterface[];
	meta?: {
		pageNum?: number;
		limit?: number;
		totalBusinesses?: number;
		totalPages?: number;
	};
	pagination?: {
		totalItems?: number;
		totalPages?: number;
		currentPage?: number;
		pageSize?: number;
	};
}
