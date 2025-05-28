import { createContext, useState, PropsWithChildren, useContext } from "react";
import { Product } from "../types/Product";

interface ContextType {
	cart: Product[];
	showCart: boolean;
	handleAddToCart: (product: Product) => void;
	handleRemoveFromCart: (id: string) => void;
	handleIncrementItem: (id: string) => void;
	handleDecrementItem: (id: string) => void;
	toggleCart: () => void;
	//handleClearCart: () => void; mas adelante
}

export const CartContext = createContext<ContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
	const [cart, setCart] = useState<Product[]>([]);
	const [showCart, setShowCart] = useState(false);

	const handleAddToCart = (product: Product) => {
		setCart((prevCart) => {
			const existing = prevCart.find((p) => p.id === product.id); //busco si existe el producto en el carrito
			if (existing) {
				return prevCart.map(
					(p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p) //si existe le sumo 1
				);
			}
			return [...prevCart, { ...product, quantity: 1 }]; //sino agrego el producto y le asigno 1 como cantidad inicial
		});
		alert("Producto agregado exitosamente al carrito!") // proximamente un modal o algun mensaje en pantalla mas dinamico
	};

	const handleRemoveFromCart = (id: string) => {
		setCart((prevCart) => prevCart.filter((p) => p.id !== id));
	};

	const handleIncrementItem = (id: string) => {
		setCart((prevCart) =>
			prevCart.map(
				(p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p) //si existe le sumo 1
			)
		);
	};

	const handleDecrementItem = (id: string) => {
		setCart(
			(prevCart) =>
				prevCart
					.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
					.filter((p) => p.quantity > 0) // elimina si llega a 0
		);
	};

	const toggleCart = () => setShowCart((prev) => !prev); //cambio al estado contrario

	return (
		<CartContext.Provider
			value={{
				cart,
				showCart,
				toggleCart,
				handleAddToCart,
				handleRemoveFromCart,
				handleIncrementItem,
				handleDecrementItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Hook para usar el contexto
export const useCart = (): ContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart debe usarse dentro de un <CartProvider>");
	}
	return context;
};

export default CartProvider;
