// auth/reset-password.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { useAuth } from "../../auth/provider";
import { useTheme } from "@/theme";

const resetPasswordSchema = yup
	.object({
		password: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
	})
	.required();

type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>;

const ResetPassword = () => {
	const { resetPassword, loading } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const { token } = useLocalSearchParams<{ token: string }>();

	const methods = useForm<ResetPasswordFormValues>({
		resolver: yupResolver(resetPasswordSchema),
		defaultValues: { password: "" },
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: ResetPasswordFormValues) => {
		if (!token) return;
		await resetPassword({ token, password: data.password });
		router.push("/login");
	};

	return (
		<View style={{ flex: 1, padding: 16, backgroundColor: theme.palette.background.default }}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 20,
					color: theme.palette.text.primary,
				}}
			>
				Reset Password
			</Text>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<RHFTextField name="password" placeholder="New Password" type="password" />
				<TouchableOpacity
					style={{
						backgroundColor: theme.palette.primary.main,
						padding: 12,
						borderRadius: 8,
						alignItems: "center",
						marginTop: 16,
					}}
					onPress={handleSubmit(onSubmit)}
					disabled={loading || !token}
				>
					<Text style={{ color: theme.palette.primary.contrastText, fontWeight: "bold" }}>
						{loading ? "Resetting..." : "Reset Password"}
					</Text>
				</TouchableOpacity>
			</FormProvider>
			<TouchableOpacity onPress={() => router.push("/login")}>
				<Text style={{ color: theme.palette.primary.main, marginTop: 16 }}>
					Back to Login
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ResetPassword;
