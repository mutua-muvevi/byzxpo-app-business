// contexts/AnalyticsContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { FetchAnalyticsResponse } from "@/types/analytics";
import { useAuth } from "@/auth";

interface AnalyticsContextType {
	analytics: FetchAnalyticsResponse["analytics"] | null;
	loading: boolean;
	error: string | null;
	fetchAnalytics: (businessId: string, startDate?: string, endDate?: string) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [analytics, setAnalytics] = useState<FetchAnalyticsResponse["analytics"] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();

	const fetchAnalytics = useCallback(
		async (businessId: string, startDate?: string, endDate?: string) => {
			setLoading(true);
			setError(null);
			try {
				const token = user?.token || "";
				
				const response = await axios.get<FetchAnalyticsResponse>(
					"https://byzxpo-server.onrender.com/api/analytics/fetch",
					{
						headers: {
							Authorization: token,
						},
						params: {
							businessId,
							startDate,
							endDate,
						},
					},
				);

				if (response.data.success) {
					setAnalytics(response.data.analytics);
				} else {
					throw new Error(response.data.message || "Failed to fetch analytics");
				}
			} catch (err: any) {
				const errorMessage =
					err.response?.data?.message || err.message || "Error fetching analytics";
				console.error("Analytics fetch error:", errorMessage);
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	return (
		<AnalyticsContext.Provider value={{ analytics, loading, error, fetchAnalytics }}>
			{children}
		</AnalyticsContext.Provider>
	);
};

export const useAnalytics = () => {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error("useAnalytics must be used within an AnalyticsProvider");
	}
	return context;
};
