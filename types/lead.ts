export interface LeadInterface {
	_id: string;
	__v: number;
	business: string;
	createdAt: string; // ISO date string
	name: string;
	email: string;
	location?: string;
	phone?: string;
	[key : string] : any
}

export interface FetchLeadsResponse {
	success: boolean;
	leads: LeadInterface[];
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

