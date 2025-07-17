export const calculateDiscount = (
	price: number,
	originalPrice?: number
): number => {
	if (!originalPrice || originalPrice <= price) return 0;
	return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const isProductOnSale = (
	price: number,
	originalPrice?: number
): boolean => {
	// no hay precio de oferta o el precio de oferta es mayor al precio base
	if (!originalPrice || originalPrice <= price) return false;

	// el precio de oferta es menor que el original
	return true;
};

export const calculateSavings = (
	price: number,
	originalPrice?: number
): number => {
	if (!originalPrice || originalPrice <= price) return 0;
	return originalPrice - price;
};

export const formatPrice = (
	price: number,
	currency: string = "ARS",
	locale: string = "es-AR"
): string => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
};
