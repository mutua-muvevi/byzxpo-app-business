import { BusinessInterface, BusinessResponse } from "@/types/business";
import { CreatedByInterface } from "./created-by";

export interface CategoryMeta {
	page?: number;
	pageLimit?: number;
	totalCategories?: number;
	totalPages?: number;
}

export interface CategoryPagination {
	totalItems?: number;
	totalPages?: number;
	currentPage?: number;
	pageSize?: number;
}


export interface CategoryInterface {
	_id: string;
	name: string;
	industry: string;
	businesses?: BusinessInterface[];
	createdAt?: string;
	updatedAt?: string;
	createdBy?: CreatedByInterface;
	__v?: number;
	description?: string;
}

export interface CategoryResponse {
	success: boolean;
	categories: CategoryInterface[];
	meta?: CategoryMeta;
	pagination?: CategoryPagination;
}