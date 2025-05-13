export interface EnquiryInterface {
	_id: string;
	__v: number;
	business: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	name: string;
	email: string;
	message: string;
	location?: string;
	phone?: string;
	subject?: string;
}

export interface FetchEnquiriesResponse {
	success: boolean;
	enquiries: EnquiryInterface[];
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

