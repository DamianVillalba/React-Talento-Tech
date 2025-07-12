"use client";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../../context/CartContext";
import CartIcon from "../static/CartIcon";
import { useState } from "react";

export default function Header() {
	const { cart, showCart, toggleCart } = useCart();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMobileMenuOpen(false);
	};

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
							className="h-14 lg:h-18 w-auto"
						/>
					</Link>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Link to="/products" className="text-l/6 font-semibold text-gray-900">
						Productos
					</Link>
					<Link to="/about-us" className="text-l/6 font-semibold text-gray-900">
						Acerca de
					</Link>
					<Link to="/contact" className="text-l/6 font-semibold text-gray-900">
						Contacto
					</Link>
				</PopoverGroup>
				<div className="flex flex-1 justify-center items-center gap-2 lg:justify-end">
					<Link
						to="/login"
						className="hidden lg:flex items-center text-sm font-semibold text-gray-900"
					>
						<UserCircleIcon
							className="h-9 w-9"
							aria-label="Ir a inicio de sesión"
						/>
					</Link>
					<button
						onClick={toggleCart}
						className="flex items-center gap-2 px-3 py-1 rounded hover:cursor-pointer"
						aria-label="Abrir carrito"
					>
						<CartIcon countCart={cart.length} />
					</button>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Abrir menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<Dialog
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
					className="lg:hidden"
				>
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link to="/" className="-m-1.5 p-1.5">
								<img
									alt="Home"
									src="/src/assets/logo-store.png"
									className="h-14 w-auto"
								/>
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Cerrar menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									<PopoverGroup>
										<Link
											to="/products"
											className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
											onClick={handleMenuClick}
										>
											Productos
										</Link>
										<Link
											to="/about-us"
											className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
											onClick={handleMenuClick}
										>
											Acerca de
										</Link>
										<Link
											to="/contact"
											className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
											onClick={handleMenuClick}
										>
											Contacto
										</Link>
									</PopoverGroup>
								</div>
								<div className="py-6">
									<Link
										to="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
										onClick={handleMenuClick}
									>
										Log in
									</Link>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</nav>
			{showCart && <Cart />}
		</header>
	);
}
