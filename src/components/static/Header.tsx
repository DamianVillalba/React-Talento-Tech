"use client";
import { Link } from "react-router-dom";
import { PopoverGroup } from "@headlessui/react";
import Cart from "../Cart";
import { useCart } from "../../context/CartContext";
import CartIcon from "./CartIcon";

export default function Header() {
	const { cart, showCart, toggleCart } = useCart();

	return (
		<header className="bg-amber-100">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between py-1 px-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<Link to="/" className="-m-1.5 p-1.5">
						<img
							alt="Home"
							src="/src/assets/logo-store.png"
							className="h-18 w-auto"
						/>
					</Link>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Link
						to="/products"
						className="text-l/6 font-semibold text-gray-900"
					>
						Productos
					</Link>
					<Link
						to="/about-us"
						className="text-l/6 font-semibold text-gray-900"
					>
						Acerca de
					</Link>
					<Link to="/contact" className="text-l/6 font-semibold text-gray-900">
						Contacto
					</Link>
				</PopoverGroup>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
					<button
						onClick={toggleCart}
						className="flex items-center gap-2 px-3 py-1 rounded hover:cursor-pointer"
						aria-label="Abrir carrito"
					>
						<CartIcon countCart = {cart.length} />
					</button>
				</div>
			</nav>
			{showCart && <Cart />}
		</header>
	);
}
