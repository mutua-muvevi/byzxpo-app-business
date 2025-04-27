import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBusiness } from '@/contexts/business/fetch';
import { useAuth } from '@/auth';

const MyBusinessDetails = () => {
	
	 const { myBusiness } = useBusiness()
	 const { user } = useAuth()	

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<Text>{myBusiness ? myBusiness.businessName : "Business Details Not Found"}</Text>
			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({})

export default MyBusinessDetails;
