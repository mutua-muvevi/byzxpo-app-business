import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import Toast from "react-native-toast-message";
import { LeadInterface, FetchLeadsResponse } from "@/types/lead";
import {
	fetchLeadsAPI,
	fetchLeadAPI,
	fetchLeadAsPerBusinessAPI,
} from "@/actions/leads/fetch";
import { useAuth } from "@/auth";
import { deleteLeadAPI } from "@/actions/leads/delete";

interface LeadsContextInterface {
	allLeads: LeadInterface[];
	allLeadsLoading: boolean;
	fetchLeads: (pageNo?: number, pageLimit?: number) => Promise<void>;

	businessLeads: LeadInterface[];
	allBusinessLeadsLoading: boolean;
	fetchBusinessLeads: (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => Promise<void>;

	singleLead: LeadInterface | null;
	singleLeadLoading: boolean;
	fetchSingleLead: (leadId: string) => Promise<void>;
	setSingleLeadFunction: (lead: LeadInterface) => void;

	deleteLeadLoading: boolean;
	deleteLead: (leadId: string) => Promise<void>;
	setSingleDeleteLeadFunction: (lead: LeadInterface) => void;
}

const defaultLeadsContext = undefined;

const LeadsContext = createContext<LeadsContextInterface | undefined>(
	defaultLeadsContext,
);

const LeadsContextProvider = ({ children }: { children: ReactNode }) => {
	const [allLeads, setAllLeads] = useState<LeadInterface[]>([]);
	const [allLeadsLoading, setAllLeadsLoading] = useState<boolean>(false);

	const [businessLeads, setBusinessLeads] = useState<LeadInterface[]>([]);
	const [allBusinessLeadsLoading, setAllBusinessLeadsLoading] = useState<boolean>(false);

	const [singleLead, setSingleLead] = useState<LeadInterface | null>(null);

	const [singleLeadLoading, setSingleLeadLoading] = useState<boolean>(false);

	const [deleteLeadLoading, setDeleteLeadLoading] = useState<boolean>(false);

	const { user, accessToken } = useAuth();

	const token = accessToken || user?.token || "";

	const fetchLeads = async (pageNo?: number, pageLimit?: number) => {
		setAllLeadsLoading(true);
		try {
			const response: FetchLeadsResponse = await fetchLeadsAPI(
				pageNo,
				pageLimit,
				token,
			);
			setAllLeads(response.leads);
			setAllLeadsLoading(false);
		} catch (error) {
			setAllLeadsLoading(false);
		}
	};

	const fetchBusinessLeads = async (
		businessId: string,
		pageNo?: number,
		pageLimit?: number,
	) => {
		setAllBusinessLeadsLoading(true);
		try {
			const response: FetchLeadsResponse = await fetchLeadAsPerBusinessAPI(
				pageNo,
				pageLimit,
				businessId,
				token,
			);
			console.log("REEEEEDPONSEEEEEEEEEEEEEE", response)
			setBusinessLeads(response.leads);
			setAllBusinessLeadsLoading(false);
		} catch (error) {
			setAllBusinessLeadsLoading(false);

		}
	};

	const fetchSingleLead = async (leadId: string) => {
		setSingleLeadLoading(true);
		try {
			const response = await fetchLeadAPI(leadId, token);
			setSingleLead(response.lead);
			setSingleLeadLoading(false);
		} catch (error) {
			setSingleLeadLoading(false);
		}
	};

	const deleteLead = async (leadId: string) => {
		setDeleteLeadLoading(true);
		try {
			await deleteLeadAPI(leadId, token);
			setDeleteLeadLoading(false);
		} catch (error) {
			setDeleteLeadLoading(false);
		}
	};

	

	const memoizedData = useMemo(() => ({
		allLeads,
		allLeadsLoading,
		fetchLeads,

		businessLeads,
		allBusinessLeadsLoading,
		fetchBusinessLeads,

		singleLead,
		singleLeadLoading,
		fetchSingleLead,
		setSingleLeadFunction: setSingleLead,

		deleteLeadLoading,
		deleteLead,
		setSingleDeleteLeadFunction: setSingleLead,
	}), [
		allLeads,
		allLeadsLoading,
		fetchLeads,

		businessLeads,
		allBusinessLeadsLoading,
		fetchBusinessLeads,

		singleLead,
		singleLeadLoading,
		fetchSingleLead,

		deleteLeadLoading,
		deleteLead,
	]);

	return (
		<LeadsContext.Provider value={memoizedData}>
			{children}
		</LeadsContext.Provider>
	);
};

const useLeads = () => {
	const context = useContext(LeadsContext);
	if (!context) {
		throw new Error("useLeads must be used within a LeadsProvider");
	}
	return context;
};

export {
	LeadsContext,
	LeadsContextProvider,
	useLeads,
}