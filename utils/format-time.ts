/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export const fDate = (date : any, newFormat?: any) => {
	const fm = newFormat || "dd MMM yyyy";

	return date ? format(new Date(date), fm) : "";
}

export const fTime = (date : any, newFormat : any) => {
	const fm = newFormat || "p";

	return date ? format(new Date(date), fm) : "";
}

export const fDateTime = (date : any, newFormat : any) => {
	const fm = newFormat || "dd MMM yyyy p";

	return date ? format(new Date(date), fm) : "";
}

export const fTimestamp = (date : any) => {
	return date ? getTime(new Date(date)) : "";
}

export const fToNow = (date : any) => {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
		  })
		: "";
}

export const isBetween = (inputDate : any, startDate : any, endDate : any) => {
	const date = new Date(inputDate);

	const results =
		new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
		new Date(date.toDateString()) <= new Date(endDate.toDateString());

	return results;
}

export const isAfter = (startDate : any, endDate : any) => {
	const results =
		startDate && endDate
			? new Date(startDate).getTime() > new Date(endDate).getTime()
			: false;

	return results;
}


export const yearNow = () => new Date().getFullYear();