import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { useTheme } from "@/theme";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import * as ImagePicker from "expo-image-picker";
import { Controller } from "react-hook-form";
import { RHFSelect } from "@/components/hook-form";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useBusiness } from "@/contexts/business/fetch";
import { useAuth } from "@/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNewBusiness } from "@/actions/business/new";
import Toast from "react-native-toast-message";
import { editBusinessActtion } from "@/actions/business/edit";
import { useRouter } from "expo-router";

// Stepper Steps
const steps = ["Basic Info", "Location", "Images"];

// Yup Validation Schema
const NewBusinessSchema = Yup.object().shape({
	businessName: Yup.string().required("Business name is required"),
	basicInfo: Yup.object().shape({
		email: Yup.string().email("Email must be a valid email address"),
		phone: Yup.string(),
		website: Yup.string().url("Invalid website URL"),
		tags: Yup.mixed().test(
			"is-string-or-array",
			"Tags must be a string or an array of strings",
			(value) => typeof value === "string" || Array.isArray(value),
		),
	}),
	location: Yup.object().shape({
		street: Yup.string(),
		city: Yup.string(),
		country: Yup.string(),
		state: Yup.string(),
	}),
	thumbnail: Yup.mixed().nullable(),
	logo: Yup.mixed().nullable(),
});

const placeholderImage = require("@/assets/images/image-placeholder.png");

// Image Upload Component
interface RHFImageUploadProps {
	name: string;
	label: string;
	existingImage?: string | null; // URL of existing image from businessToEdit
}

const RHFImageUpload = ({ name, label, existingImage }: RHFImageUploadProps) => {
	const { control } = useFormContext();
	const { theme } = useTheme();

	const pickImage = async (onChange: (file: any) => void) => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			onChange(result.assets[0]);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View style={{ marginBottom: 10 }}>
					<Text
						style={{
							color: theme.text.primary,
							fontSize: 10,
							marginBottom: 8,
						}}
					>
						{label}
					</Text>
					<TouchableOpacity
						style={{
							backgroundColor: theme.grey[200],
							padding: 10,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: error ? theme.error.main : theme.grey[300],
							alignItems: "center",
							justifyContent: "center",
							height: 150, // Fixed height for consistency
						}}
						onPress={() => pickImage(field.onChange)}
					>
						{field.value ? (
							// Display selected image
							<Image
								source={{ uri: field.value.uri }}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 5,
									resizeMode: "cover",
								}}
							/>
						) : existingImage ? (
							// Display existing image from businessToEdit
							<Image
								source={{ uri: existingImage }}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 5,
									resizeMode: "cover",
								}}
							/>
						) : (
							// Display placeholder (icon or image)
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<FontAwesome name="image" size={40} color={theme.grey[500]} />
								<Text
									style={{
										color: theme.grey[500],
										marginTop: 8,
										fontSize: 12,
									}}
								>
									Upload {label}
								</Text>
							</View>
						)}
					</TouchableOpacity>
					{error && (
						<Text
							style={{
								color: theme.error.main,
								fontSize: 12,
								marginTop: 4,
							}}
						>
							{error.message}
						</Text>
					)}
				</View>
			)}
		/>
	);
};

// Basic Info Section
const BasicInfoSection = () => {
	const { theme } = useTheme();

	return (
		<View style={{ padding: 10, gap: 10 }}>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
					marginBottom: 10,
					color: theme.text.primary,
				}}
			>
				Basic Information
			</Text>
			<RHFTextField
				name="businessName"
				placeholder="Business Name"
				helperText="Enter the name of your business"
			/>
			<RHFTextField
				name="basicInfo.email"
				placeholder="Business Email"
				helperText="Enter a valid email address"
			/>
			<RHFTextField
				name="basicInfo.phone"
				placeholder="Phone Number"
				helperText="Enter a contact number"
			/>
			<RHFTextField
				name="basicInfo.website"
				placeholder="Website (Optional)"
				helperText="Enter your website URL"
			/>
			<RHFTextField
				name="basicInfo.tags"
				placeholder="Tags (Optional) eg retail, tech, food"
				helperText="Enter business tags (comma separated)"
			/>
			{/* <RHFSelect
				name="basicInfo.category"
				options={categories}
				placeholder="Select Category"
				helperText="Choose a business category"
			/> */}
		</View>
	);
};

// Location Section
const LocationSection = () => {
	const { theme } = useTheme();

	return (
		<View style={{ padding: 10, gap: 10 }}>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
					marginBottom: 10,
					color: theme.text.primary,
				}}
			>
				Location
			</Text>
			<RHFTextField
				name="location.street"
				placeholder="Street Address"
				helperText="Enter the street address (optional)"
			/>
			<RHFTextField name="location.city" placeholder="City" helperText="Enter the city" />
			<RHFTextField
				name="location.state"
				placeholder="State"
				helperText="Enter the state in which the business is located"
			/>
			<RHFTextField
				name="location.country"
				placeholder="Country"
				helperText="Enter the country"
			/>
		</View>
	);
};

// Images Section
const ImagesSection = () => {
	const { theme } = useTheme();
	const { businessToEdit } = useBusiness();

	return (
		<View style={{ padding: 10, gap: 10 }}>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
					marginBottom: 10,
					color: theme.text.primary,
				}}
			>
				Images
			</Text>
			<RHFImageUpload
				name="thumbnail"
				label="Thumbnail"
				existingImage={businessToEdit?.thumbnail}
			/>
			<RHFImageUpload name="logo" label="Logo" existingImage={businessToEdit?.logo} />
		</View>
	);
};

// Main Form Component
const EditBusinessForm = ({ onClose }: { onClose: () => void }) => {
	const [activeStep, setActiveStep] = useState(0);
	const { theme } = useTheme();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { accessToken, user } = useAuth();
	const { businessToEdit, myBusiness } = useBusiness();

	const router = useRouter()

	// Initial Form Values
	const initialValues = {
		businessName: businessToEdit?.businessName || "",
		basicInfo: {
			email: businessToEdit?.basicInfo?.email || "",
			phone: businessToEdit?.basicInfo?.phone || "",
			website: businessToEdit?.basicInfo?.website || "",
			tags: businessToEdit?.basicInfo?.tags || "",
		},
		location: {
			street: businessToEdit?.location?.street || "",
			city: businessToEdit?.location?.city || "",
			country: businessToEdit?.location?.country || "",
			// coordinates: [0, 0],
			state: businessToEdit?.location?.state || "",
		},
		thumbnail: businessToEdit?.thumbnail || null,
		logo: businessToEdit?.logo || null,
	};

	const methods = useForm({
		resolver: yupResolver(NewBusinessSchema),
		defaultValues: initialValues,
		mode: "all",
	});

	const {
		handleSubmit,
		formState: { isValid },
		reset,
	} = methods;

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const onSubmit = async (data: any) => {
		setIsSubmitting(true);

		try {
			const token = (await AsyncStorage.getItem("accessToken")) || accessToken || "";
			if (!token) {
				throw new Error("User is not authenticated");
			}

			// Call the createNewBusiness API
			const response = await editBusinessActtion(
				businessToEdit?._id || myBusiness?._id || "",
				data,
				(message: string) => {
					Toast.show({
						type: "info",
						text1: "Info",
						text2: message,
					});
				},
				(severity: "info" | "success" | "error") => {
					Toast.show({
						type: severity,
						text1: severity.charAt(0).toUpperCase() + severity.slice(1),
						text2:
							severity === "success"
								? "Business created successfully"
								: "An error occurred",
					});
				},
				token, // Pass the token from user
			);

			const { success, message } = response;
			if (success) {
				// Reset form
				reset();
				setActiveStep(0);

				onClose();

				router.push("/")
			}
		} catch (errorMessage: any) {
			console.log("ERROR", errorMessage);

			if (typeof errorMessage === "string") {
				setError(JSON.stringify(errorMessage));
			}

			setError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<ScrollView style={{ flex: 1, width: "100%" }}>
				{/* Stepper */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10,
						backgroundColor: theme.background.default,
						borderRadius: 5,
					}}
				>
					{steps.map((label, index) => (
						<View key={label} style={{ alignItems: "center", flex: 1 }}>
							<View
								style={{
									width: 30,
									height: 30,
									borderRadius: 15,
									backgroundColor:
										index <= activeStep
											? theme.palette.primary.main
											: theme.grey[300],
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										color:
											index <= activeStep
												? theme.primary.contrastText
												: theme.text.primary,
										fontWeight: "bold",
									}}
								>
									{index + 1}
								</Text>
							</View>
							<Text
								style={{
									color: theme.text.primary,
									fontSize: 12,
									marginTop: 4,
								}}
							>
								{label}
							</Text>
						</View>
					))}
				</View>
				{error && (
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
							{JSON.stringify(error)}
						</Text>
					</View>
				)}

				{/* Form Sections */}
				<View style={{ backgroundColor: theme.background.default }}>
					{activeStep === 0 && <BasicInfoSection />}
					{activeStep === 1 && <LocationSection />}
					{activeStep === 2 && <ImagesSection />}
				</View>

				{/* Navigation Buttons */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10,
						backgroundColor: theme.background.default,
					}}
				>
					<TouchableOpacity
						style={{
							padding: 12,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: theme.grey[300],
							opacity: activeStep === 0 ? 0.5 : 1,
						}}
						onPress={handleBack}
						disabled={activeStep === 0}
					>
						<Text style={{ color: theme.text.primary }}>Back</Text>
					</TouchableOpacity>

					{activeStep === steps.length - 1 ? (
						<TouchableOpacity
							style={{
								padding: 12,
								borderRadius: 5,
								backgroundColor: theme.palette.primary.main,
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={handleSubmit(onSubmit)}
							disabled={isSubmitting || !isValid}
						>
							{isSubmitting ? (
								<ActivityIndicator
									size="small"
									color={theme.primary.contrastText}
								/>
							) : (
								<Text
									style={{
										color: theme.primary.contrastText,
										marginRight: 8,
									}}
								>
									Submit
								</Text>
							)}
							<FontAwesome
								name="check"
								size={20}
								color={theme.primary.contrastText}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={{
								padding: 12,
								borderRadius: 5,
								backgroundColor: isValid ? theme.primary.main : theme.grey[300],
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={handleNext}
							// disabled={!isValid}
						>
							<Text
								style={{
									color: theme.primary.contrastText,
									marginRight: 8,
								}}
							>
								Next
							</Text>
							<Feather
								name="arrow-right"
								size={20}
								color={theme.primary.contrastText}
							/>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</FormProvider>
	);
};

export default EditBusinessForm;
