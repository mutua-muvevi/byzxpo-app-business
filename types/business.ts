export interface BusinessInterface {
	_id: string;
	businessName: string;
	overalRating?: number;
	ownerIdentifier?: string | null;
	description?: Description[];
	isSponsored?: boolean;
	isVerified?: boolean;
	isFlagged?: boolean;
	openingHours?: any[];
	reviews?: Review[];
	productsAndServices?: any[];
	enquiries?: any[];
	staff?: any[];
	claims?: string[];
	logo?: string | null;
	thumbnail?: string | null;
	otherImages?: string[] | null;
	stats?: any[];
	owner?: Owner | null;
	createdBy?: CreatedBy;
	removeBusinessRequests?: any[];
	reported?: any[];
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	basicInfo?: BasicInfo;
	location?: Location;
	registrationDetails?: RegistrationDetails;
	socialMedia?: SocialMedia;
	leads: any[];
}

export interface Description {
	title: string;
	paragraphs: string[];
	_id: string;
}

export interface Review {
	_id: string;
	rating: number;
	title: string;
	description: string;
	business: string;
	createdBy: {
		_id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface Owner {
	_id: string;
	name: string;
	email: string;
}

export interface CreatedBy {
	_id: string;
	name: string;
	email: string;
}

export interface BasicInfo {
	_id: string;
	email: string;
	emailTwo: string;
	phone: string;
	phoneTwo: string;
	website: string;
	tags: string[];
}

export interface Location {
	_id: string;
	type: string;
	coordinates: [number, number];
	city: string;
	country: string;
	state: string;
	zipCode: string;
	street: string;
	buildingName?: string;
	roomNumber?: string;
	business: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
	__v?: number;
}

export interface RegistrationDetails {
	_id: string;
	registrationNumber: string;
	registrationDate: string | null;
	taxIdentificationNumber: string;
	vatNumber: string;
	registrationCountry: string;
	expirationDate: string | null;
	business: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface SocialMedia {
	_id: string;
	facebook: string;
	instagram: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface BusinessResponse {
	success: boolean;
	businesses: BusinessInterface[];
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
