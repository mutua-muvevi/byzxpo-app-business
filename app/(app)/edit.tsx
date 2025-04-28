import { useAuth } from "@/auth";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFSelect } from "@/components/hook-form";
import { countries } from "@/constants";

interface EditProfileFormValues {
	name: string;
	email: string;
	phone: string;
	country: string;
}

const editSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	phone: Yup.string().required("Phone number is required"),
	country: Yup.string().required("Country is required"),
});

const ProfileEditHeader = () => {
	const { theme } = useTheme();

	return (
		<View style={{ padding: 16, backgroundColor: theme.palette.primary.main }}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					color: theme.palette.primary.contrastText,
				}}
			>
				Edit My profile
			</Text>
		</View>
	);
};

const EditProfile = () => {
	const { theme } = useTheme();

	const { user } = useAuth();

	const defaultValues = {
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		country: user?.country || "",
	};

	const methods = useForm<EditProfileFormValues>({
		resolver: yupResolver(editSchema),
		defaultValues,
	});

	const { handleSubmit, control } = methods;
	const onSubmit = (data: EditProfileFormValues) => {
		console.log("data", data);
	};

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.background.default }}
			edges={["top", "left", "right"]}
		>
			<ScrollView>
				<ProfileEditHeader />

				<View style={{ flex: 1, backgroundColor: theme.background.default }}>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						<View style={{ gap: 20, padding: 10 }}>
							<RHFTextField
								name="name"
								label="Name"
								placeholder="John Doe"
								style={{ marginTop: 16 }}
							/>
							<RHFTextField
								name="email"
								label="Email"
								placeholder="example@example.com"
							/>
							<RHFTextField name="phone" label="Phone" placeholder="(123) 456-7890" />
							<RHFSelect
								name="country"
								options={countries}
								placeholder="Select Country"
							/>

							<TouchableOpacity
								onPress={handleSubmit(onSubmit)}
								style={{
									marginTop: 16,
									padding: 10,
									backgroundColor: theme.palette.primary.main,
									borderRadius: 4,
								}}
							>
								<Text
									style={{
										textAlign: "center",
										color: theme.palette.primary.contrastText,
										fontWeight: "bold",
									}}
								>
									Submit
								</Text>
							</TouchableOpacity>
						</View>
					</FormProvider>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default EditProfile;
