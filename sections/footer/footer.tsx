import React from 'react';
import { StyleSheet, View } from 'react-native';

interface FooterSectionProps {
	pageNumber: number;
	setPageNumber: (pageNumber: number) => void;
	method?: ( pageNumber: number) => void;
	pageLimit?: number;
	setLimit?: (limit: number) => void;
}

const FooterSection = ({pageNumber, setPageNumber, pageLimit, setLimit} : FooterSectionProps) => {
	return (
		<View style={{
			marginBottom: 30
		}}>
			
		</View>
	);
}

const styles = StyleSheet.create({})

export default FooterSection;
