// auth/forgot-password.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { useAuth } from "../../auth/provider";
import { useTheme } from "@/theme";

const forgotPasswordSchema = yup
	.object({
		email: yup.string().email("Invalid email").required("Email is required"),
	})
	.required();

type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
	const { forgotPassword, loading } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [forgetPasswordLoading, setForgetPasswordLoading] = React.useState<boolean>(false);
	const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

	const methods = useForm<ForgotPasswordFormValues>({
		resolver: yupResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		try {
			await forgotPassword(data);
		} catch (error: any) {
			setErrorMsg(error?.response?.error);
		} finally {
			setSuccessMessage(
				"If the email exists in our system, you will receive an email with instructions on how to reset your password.",
			);

			setTimeout(() => {
				router.push("/login");
			}, 5500);
		}
	};

	return (
		<View style={{ flex: 1, padding: 16, backgroundColor: theme.background.default }}>
			{successMessage && (
				<View
					style={{
						backgroundColor: theme.success.main,
						padding: 12,
						borderRadius: 5,
						alignItems: "center",
						marginTop: 16,
						marginBottom: 16,
					}}
				>
					<Text style={{ color: theme.success.contrastText, fontWeight: "bold" }}>
						{successMessage}
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
				Forgot Password
			</Text>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<RHFTextField name="email" placeholder="Email" />
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
						{loading ? "Sending..." : "Send Reset Email"}
					</Text>
				</TouchableOpacity>
			</FormProvider>
			<TouchableOpacity onPress={() => router.push("/login")}>
				<Text style={{ color: theme.primary.main, marginTop: 16 }}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ForgotPassword;
