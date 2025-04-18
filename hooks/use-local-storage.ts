import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

/*---------------------------------------------------------------- */
//use local storage hook
export const useLocalStorage = (key: string, initialState: any): any => {
	const [ value, setValue ] = useState(initialState);

	useEffect(() => {
		const restored = getStorage(key)

		if (restored) {
			setValue((prevState: any) => ({
				...prevState,
				...restored
			}));
		}
	}, [key]);

	const updateValue = useCallback(
		(updatedValue: any) => {
			try {
				setValue(() => {
					const newValue = { ...value, ...updatedValue };
					setStorage(key, newValue);
					return newValue;
				})
			} catch (error) {
				console.error(error)
			}
		}, [key]
	);

	const update = useCallback(
		(name: string, updatedValue: any) : void => {
			try {
				updateValue({ [name]: updatedValue });
			} catch (error) {
				console.error(error)
			}
		}, [updateValue]
	);

	const reset = useCallback(
		() => {
			try {
				setValue(initialState);
				removeStorage(key);
			} catch (error) {
				console.error(error)
			}
		}, [initialState, key]
	);

	return {
		state: value,
		update,
		reset
	}
}

/*---------------------------------------------------------------- */
// set item in local storage
export const setStorage = async (key: string, value: any): Promise<void> => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error('Error setting item in local storage', error);
	}
}


/*---------------------------------------------------------------- */
//get item from local storage
export const getStorage = async (key: string): Promise<any> => {
	if (!key) {
		console.warn('No key provided for local storage retrieval');
		return null;
	}

	try {
		const result = await AsyncStorage.getItem(key);

		if (result === null || result === undefined) {
			console.warn(`No value found for key: ${key}`);
			return null;
		}
		
		return result !== null ? JSON.parse(result) : null;

	} catch (error) {
		console.error('Error getting item from local storage', error);
		return null;
	}
}

/*---------------------------------------------------------------- */
//remove item from local storage
export const removeStorage = async (key: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error('Error removing item from local storage', error);
	}
}