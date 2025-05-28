"use client";
import { Link } from "react-router-dom";
import {
	PopoverGroup
} from "@headlessui/react";
import {
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Cart from '../Cart';
import { useCart } from "../../context/CartContext";

export default function Header() {
	const { showCart, toggleCart } = useCart();

	return (
		<header className="bg-amber-100">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<Link to='/' className="-m-1.5 p-1.5">
						<span className="sr-only">React Talento-Tech</span>
						<img
							alt="Home"
							src="/src/assets/home-logo.png"
							className="h-12 w-auto"
						/>
					</Link>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Link to='/products' className="text-sm/6 font-semibold text-gray-900">Productos</Link>
					<Link to="/about-us" className="text-sm/6 font-semibold text-gray-900">Acerca de</Link>
					<Link to="/contact" className="text-sm/6 font-semibold text-gray-900">Contacto</Link>
				</PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
                    <button
                        onClick={toggleCart}
                        className="flex items-center gap-2 px-3 py-1 rounded hover:cursor-pointer"
                        aria-label="Abrir carrito"
                    >
                        <ShoppingCartIcon aria-hidden="true" className="h-8 w-auto" />
                        <span className="sr-only">Abrir carrito</span>
                    </button>
                </div>
            </nav>
            {showCart && (
                <Cart />
            )}
		</header>
	);
}
