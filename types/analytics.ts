// types/analytics.ts
export interface AnalyticsInterface {
	_id: string;
	business: string;
	eventType: "impression" | "click" | "view" | "share" | "enquiry" | "rating";
	metadata: {
		source?: "website" | "mobile_app" | "social_media" | "email" | "other";
		page?: string;
		itemId?: string;
		userAgent?: string;
		ipAddress?: string;
		referrer?: string;
	};
	createdBy?: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

export interface AnalyticsTotal {
	eventType: "impression" | "click" | "view" | "share" | "enquiry" | "rating";
	count: number;
	sources: string[];
}

export interface AnalyticsDaily {
	eventType: "impression" | "click" | "view" | "share" | "enquiry" | "rating";
	date: string; // YYYY-MM-DD
	count: number;
}

export interface FetchAnalyticsResponse {
	success: boolean;
	analytics: {
		totals: AnalyticsTotal[];
		dailyCounts: AnalyticsDaily[];
	};
	message: string;
}
