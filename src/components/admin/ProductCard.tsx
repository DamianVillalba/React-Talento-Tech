import { Edit, Trash2, Package } from 'lucide-react';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Sin stock', color: 'text-red-600 bg-red-100' };
    if (quantity <= 5) return { text: 'Stock bajo', color: 'text-amber-600 bg-amber-100' };
    return { text: 'En stock', color: 'text-green-600 bg-green-100' };
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-indigo-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
          {product.name}
        </h3>
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

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <Package className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Cantidad: {product.quantity}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
          {stockStatus.text}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold text-indigo-600">
          {product.price}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;