import React from "react";
import { Modal, StyleSheet, View } from "react-native";

interface ModalComponentProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
	style?: object;
	modalId?: string;
	withInput?: boolean;
	[key: string]: any;
}

const ModalComponent = ({
	isOpen,
	children,
	onClose,
	style,
	modalId,
	...others
}: ModalComponentProps) => {
	return (
		<Modal
			visible={isOpen}
			onRequestClose={onClose}
			animationType="fade"
			statusBarTranslucent
			style={{
				width: "100%",
			}}
			{...others}
		>
			{children}
		</Modal>
	);
};

const styles = StyleSheet.create({});

export default ModalComponent;
