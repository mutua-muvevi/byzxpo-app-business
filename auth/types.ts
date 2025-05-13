import { BusinessInterface } from "@/types/business";

// auth/types.ts
export interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
	phone?: string;
	phoneVerified?: boolean;
	image?: string;
	country?: string;
	emailVerified: boolean;
	isBanned: boolean;
	business?: string[];
	token?: string;
	createdAt?: string;
	updatedAt?: string;
	memberType?: string;
	mySavedBusinesses?: BusinessInterface[] | any[];
}

export interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
	country: string;
	role?: string;
}

export interface ForgotPasswordCredentials {
	email: string;
}

export interface ResetPasswordCredentials {
	token: string;
	password: string;
}

export interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<{ accessToken: any; refreshToken: any; user: any; }>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	forgotPassword: (credentials: ForgotPasswordCredentials) => Promise<void>;
	resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
	logout: () => Promise<void>;
	refreshAccessToken: () => Promise<void>;
	fetchMe: () => Promise<void>;
	authenticated: boolean;
	unauthenticated: boolean;
	user: User | null;
	saveABusiness: (credentials: any) => Promise<void>;
	removeABusiness: (credentials: any) => Promise<void>;
}
