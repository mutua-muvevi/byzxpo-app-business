// auth/register.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { RHFSelect } from "@/components/hook-form/rhf-select";
import { useAuth } from "../../auth/provider";
import { useTheme } from "@/theme";
import { countries } from "@/constants";

const registerSchema = yup
	.object({
		name: yup.string().required("Name is required"),
		email: yup.string().email("Invalid email").required("Email is required"),
		password: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		country: yup.string().required("Country is required"),
	})
	.required();

type RegisterFormValues = yup.InferType<typeof registerSchema>;

const Register = () => {
	const { register, loading } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();

	const methods = useForm<RegisterFormValues>({
		resolver: yupResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "", country: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: RegisterFormValues) => {
		await register(data);
	};

	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: theme.background.default,
				justifyContent: "center",
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 20,
					color: theme.text.primary,
				}}
			>
				Register
			</Text>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<RHFTextField name="name" placeholder="Name" />
				<RHFTextField name="email" placeholder="Email" />
				<RHFTextField name="password" placeholder="Password" type="password" />
				<RHFSelect name="country" options={countries} placeholder="Select Country" />
				<TouchableOpacity
					style={{
						backgroundColor: theme.primary.main,
						padding: 12,
						borderRadius: 8,
						alignItems: "center",
						marginTop: 16,
					}}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
				>
					<Text style={{ color: theme.primary.contrastText, fontWeight: "bold" }}>
						{loading ? "Registering..." : "Register"}
					</Text>
				</TouchableOpacity>
			</FormProvider>
			<TouchableOpacity onPress={() => router.push("/login")}>
				<Text style={{ color: theme.primary.main, marginTop: 16 }}>
					Already have an account? Login
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Register;
