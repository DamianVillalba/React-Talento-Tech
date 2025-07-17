import { Edit, Trash2, Package } from "lucide-react";
import { Product } from "../../types/Product";
import { formatPrice, isProductOnSale } from "../../utils/productUtils";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    const getStockStatus = (quantity: number) => {
        if (quantity === 0)
            return { text: "Sin stock", color: "text-red-600 bg-red-100" };
        if (quantity <= 5)
            return { text: "Stock bajo", color: "text-amber-600 bg-amber-100" };
        return { text: "En stock", color: "text-green-600 bg-green-100" };
    };

    const stockStatus = getStockStatus(product.quantity);
    const isOnSale = isProductOnSale(product.price, product.originalPrice);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-indigo-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center max-w-3/4">
                    <img
                        alt={product.name}
                        src={product.img_url}
                        className="aspect-square w-14 h-18 object-contain mr-2"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/40x40/cccccc/333333?text=Img';
                        }}
                    />
                    <h3 className="text-base font-bold text-gray-700">{product.name}</h3>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Editar producto"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Eliminar producto"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                    Cantidad: {product.quantity}
                </span>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                >
                    {stockStatus.text}
                </span>
                {isOnSale && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                        En Oferta
                    </span>
                )}
            </div>

            <div className="flex justify-between items-end">
                {isOnSale ? (
                    <div className="flex flex-col items-start">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-red-600">
                                {formatPrice(product.price)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice ?? 0)}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="text-xl font-bold text-indigo-600">
                        {formatPrice(product.price)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
