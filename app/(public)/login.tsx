// auth/login.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@/theme";
import { useAuth } from "@/auth/provider";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import LoadingStateIndicator from "@/components/ui/LoadingStateIndicator";

const loginSchema = yup
	.object({
		email: yup.string().email("Invalid email").required("Email is required"),
		password: yup.string().required("Password is required"),
	})
	.required();

type LoginFormValues = yup.InferType<typeof loginSchema>;

const Login = () => {
	const { login, loading, error } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

	// Handle navigation when user is authenticated
	useEffect(() => {
		if (user && isAuthenticated) {
			router.replace("/"); // Use replace instead of push to avoid stacking
		}
	}, [user, isAuthenticated, router]);

	const methods = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: LoginFormValues) => {
		try {
			setErrorMsg(null);
			const result = await login(data);
			if (result) {
				router.replace("/");
			}
		} catch (error) {
			
			if (error instanceof Error) {
				setErrorMsg(error.message);
			}
		}
	};

	// Show loading indicator when authenticating
	if (loading) {
		return <LoadingStateIndicator text={"Authenticating ..."} />;
	}

	return (
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
				Login
			</Text>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<View style={{ gap: 10 }}>
					<RHFTextField name="email" placeholder="Email" helperText="Enter your email" />
					<RHFTextField name="password" placeholder="Password" type="password" />
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
							{loading ? "Authenticating..." : "Login"}
						</Text>
					</TouchableOpacity>
				</View>
			</FormProvider>

			<TouchableOpacity onPress={() => router.push("/forgot-password")}>
				<Text style={{ color: theme.primary.main, marginTop: 16 }}>Forgot Password?</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => router.push("/register")}>
				<Text style={{ color: theme.primary.main, marginTop: 8 }}>
					Don't have an account? Register
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;
