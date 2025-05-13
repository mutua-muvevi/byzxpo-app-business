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
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";

const roles = [
	{ label: "Individual", value: "admin" },
	{ label: "Public user", value: "public-user" },
	{ label: "Business", value: "business" },
];

const registerSchema = yup
	.object({
		name: yup.string().required("Name is required"),
		email: yup.string().email("Invalid email").required("Email is required"),
		password: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		country: yup.string().required("Country is required"),
		role: yup.string().required("Role is required"),
	})
	.required();

type RegisterFormValues = yup.InferType<typeof registerSchema>;

const Register = () => {
	const { register, loading } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const [errorMsg, setError] = React.useState<any | null>(null);
	const [loadingState, setLoading] = React.useState<boolean>(false);

	const methods = useForm<RegisterFormValues>({
		resolver: yupResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "", country: "", role: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			setError(null);
			setLoading(true);

			const results = await register(data);

			if (results) {
				setLoading(false);
				router.push("/login");
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return loading === true ? (
		<LoadingStateIndicator text={"Registering..."} />
	) : (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: theme.background.default,
				justifyContent: "center",
			}}
		>
			{errorMsg && (
				<View
					style={{
						backgroundColor: theme.error.main,
						padding: 12,
						borderRadius: 5,
						alignItems: "center",
						marginTop: 16,
						marginBottom: 16,
					}}
				>
					<Text style={{ color: theme.error.contrastText, fontWeight: "bold" }}>
						{errorMsg}
					</Text>
				</View>
			)}

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
				<View style={{ gap: 10 }}>

					<RHFTextField name="name" placeholder="Name" />
					<RHFTextField name="email" placeholder="Email" />
					<RHFTextField name="password" placeholder="Password" type="password" />
					<RHFSelect name="country" options={countries} placeholder="Select Country" />
					<RHFSelect name="role" options={roles} placeholder="Select your role" />
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
				</View>
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
