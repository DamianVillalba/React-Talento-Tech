"use client";

import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
	const {
		showCart,
		toggleCart,
		cart,
		handleRemoveFromCart,
		processPurchase,
		handleClearCart,
		handleDecrementItem,
		handleIncrementItem,
	} = useCart();

	const totalCart = () => {
		return cart.reduce((total, p) => total + p.price * p.quantity, 0);
	};

	const listCartItems = (): React.ReactNode => {
		return (
			<ul role="list" className="-my-6 divide-y divide-gray-200">
				{cart.map((product) => (
					<li key={product.id} className="flex py-6">
						{/* proximamente...?
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product.name} src={product.img} className="size-full object-cover" />
                                </div> */}

						<div className="ml-4 flex flex-1 flex-col">
							<div>
								<div className="flex justify-between text-base font-medium text-gray-900">
									<Link to={`/products/${product.id}`}>
										<h3>{product.name}</h3>
									</Link>
									<p className="ml-4">{product.price}</p>
								</div>
							</div>
							<div className="flex flex-1 items-end justify-between text-sm">
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => handleDecrementItem(product.id)}
										className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
										disabled={product.quantity <= 1}
										aria-label="Quitar uno"
									>
										<MinusIcon className="h-4 w-4" />
									</button>
									<span className="text-gray-700 font-medium min-w-[24px] text-center">
										{product.quantity}
									</span>
									<button
										type="button"
										onClick={() => handleIncrementItem(product.id)}
										className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
										aria-label="Sumar uno"
									>
										<PlusIcon className="h-4 w-4" />
									</button>
								</div>
								<div className="flex">
									<button
										type="button"
										onClick={() =>
											handleRemoveFromCart(product.name, product.id)
										}
										className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
									>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	};

	//TODO: queda implementar quitar stock con finalizar la compra como extra
	return (
		<Dialog open={showCart} onClose={toggleCart} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
			/>

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<DialogPanel
							transition
							className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
						>
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="flex items-start justify-between">
										<DialogTitle className="text-lg font-medium text-gray-900">
											Carrito de compras
										</DialogTitle>
										<div className="ml-3 flex h-7 items-center">
											<button
												type="button"
												onClick={toggleCart}
												className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
											>
												<span className="absolute -inset-0.5" />
												<span className="sr-only">Cerrar</span>
												<XMarkIcon aria-hidden="true" className="size-6" />
											</button>
										</div>
									</div>

									<div className="mt-8">
										<div className="flow-root">
											{cart.length === 0 ? (
												<span>No hay productos en el carrito</span>
											) : (
												listCartItems()
											)}
										</div>
									</div>
								</div>
								<div className="w-3/4 flex self-center mb-1">
									<button
										type="button"
										onClick={handleClearCart}
										disabled={cart.length === 0}
										className={`flex items-center justify-center gap-2 w-full text-sm font-medium rounded bg-red-100 py-2
                							${
																cart.length === 0
																	? "hidden"
																	: "text-red-600 hover:bg-red-200 hover:text-red-700 cursor-pointer"
															}
            							`}
									>
										<TrashIcon className="h-5 w-5" />
										Borrar carrito
									</button>
								</div>
								<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
									<div className="flex justify-between text-base font-medium text-gray-900">
										<p>Total</p>
										<p>${totalCart()}</p>
									</div>
									<div className="mt-6">
										<button
											onClick={processPurchase}
											disabled={cart.length === 0}
											className={`w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-xs
            								${
															cart.length === 0
																? "bg-gray-600 text-white cursor-not-allowed"
																: "bg-indigo-600 text-white hover:bg-indigo-700  cursor-pointer"
														}
        									`}
										>
											Finalizar Compra
										</button>
									</div>
									<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
										<p>
											o{" "}
											<button
												type="button"
												onClick={toggleCart}
												className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
											>
												Continua comprando
												<span aria-hidden="true"> &rarr;</span>
											</button>
										</p>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
