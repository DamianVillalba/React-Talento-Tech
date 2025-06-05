import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface CartIconProps{
    countCart : number;
}

const CartIcon = ({countCart} : CartIconProps) => {
	return (
		<div className="relative">
			<ShoppingCartIcon className="h-9 w-9 text-gray-700" />
			{countCart > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
					{countCart}
				</span>
			)}
		</div>
	);
};

export default CartIcon;
