// components/hook-form/form-provider.tsx
import { FormProvider as RHFormProvider } from "react-hook-form";
import { View } from "react-native";
import type { UseFormReturn } from "react-hook-form";

interface FormProviderProps {
	children: React.ReactNode;
	methods: UseFormReturn<any>;
	onSubmit: () => void;
}

const FormProvider = ({ children, onSubmit, methods }: FormProviderProps) => {
	return (
		<RHFormProvider {...methods}>
			<View
				onStartShouldSetResponder={() => true}
				onResponderGrant={onSubmit}
			>
				{children}
			</View>
		</RHFormProvider>
	);
};

export default FormProvider;
