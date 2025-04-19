import { useBusiness } from '@/contexts/business/fetch';
import React from 'react';
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Business = () => {
	const { singleBusiness } = useBusiness()
	const params = useLocalSearchParams();

	return (
		<ScrollView>
			<Text>Business Details</Text>
			<Text>Business Details {params.id}</Text>
			<Text>Business Details {singleBusiness?.businessName}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({})

export default Business;
