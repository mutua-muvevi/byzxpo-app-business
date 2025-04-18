// app/theme/typography.ts
export const pxToRem = (value: number) => `${value / 16}rem`;

export const responsiveFontSizes = ({
	sm,
	md,
	lg,
}: {
	sm: number;
	md: number;
	lg: number;
}) => ({
	sm: pxToRem(sm),
	md: pxToRem(md),
	lg: pxToRem(lg),
});

export const typography = {
	fontFamily: '"Public Sans", Helvetica, Arial, sans-serif',
	fontSecondaryFamily: '"Barlow", Helvetica, Arial, sans-serif',
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightSemiBold: 600,
	fontWeightBold: 700,
	h1: {
		fontWeight: 800,
		lineHeight: 80 / 64,
		fontSize: pxToRem(40),
		responsive: responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
	},
	h2: {
		fontWeight: 800,
		lineHeight: 64 / 48,
		fontSize: pxToRem(32),
		responsive: responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
	},
	h3: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(24),
		responsive: responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
	},
	h4: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(20),
		responsive: responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
	},
	h5: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(18),
		responsive: responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
	},
	h6: {
		fontWeight: 700,
		lineHeight: 28 / 18,
		fontSize: pxToRem(17),
		responsive: responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
	},
	subtitle1: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(16),
	},
	subtitle2: {
		fontWeight: 600,
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
	},
	body1: {
		lineHeight: 1.5,
		fontSize: pxToRem(16),
	},
	body2: {
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
	},
	overline: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		textTransform: "uppercase" as const,
	},
	button: {
		fontWeight: 700,
		lineHeight: 24 / 14,
		fontSize: pxToRem(14),
		textTransform: "unset" as const,
	},
};
