// auth/login.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@/theme";
import { useAuth } from "@/auth/provider";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
// import { useAuth } from "../../auth/provider";

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
	const auth = useAuth();
	const [errorMsg, setError] = React.useState<string | null>(null);
	const [ loadingState, setLoading ] = React.useState<boolean>(false);


	const methods = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: LoginFormValues) => {
		try {
			setLoading(true);
			setError(null);

			const result = await login(data);
			
			if (result) {
				router.push("/");
			}
			
		} catch (error) {
			console.log("error >>>>>>>>>>>>>>>>>>", error);
			console.log("error >>>>>>>>>>>>>>>>>>", typeof(error));
			
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			// setLoading(false);
			setLoading(false)
		}
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
			{
				error && (
					<View
						style={{
							backgroundColor: theme.error.main,
							padding: 12,
							borderRadius: 8,
							alignItems: "center",
							marginTop: 16,
						}}
					>
						<Text style={{ color: theme.error.contrastText, fontWeight: "bold" }}>
							{error}
						</Text>
					</View>
				)
			}
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
				<View style={{gap:10}} >

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
							{loading ? "Logging in..." : "Login"}
						</Text>
					</TouchableOpacity>
				</View>
			</FormProvider>
			
			<TouchableOpacity onPress={() => router.push("/forgot-password")}>
				<Text style={{ color: theme.primary.main, marginTop: 16 }}>
					Forgot Password?
				</Text>
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
