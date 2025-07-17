import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { X } from "lucide-react";

interface FormularioProps {
	onSubmit: (product: Omit<Product, "id">, id?: string) => void;
	onClose: () => void;
	isLoading: boolean;
	editingProduct?: Product;
}

interface Errors {
	name?: string;
	price?: string;
	originalPrice?: string;
	description?: string;
	category?: string;
	quantity?: string;
	img_url?: string;
}

const initialFormState = {
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    quantity: "",
    img_url: "",
};

const ProductForm = ({
	onSubmit,
	onClose,
	isLoading,
	editingProduct,
}: FormularioProps) => {
	const [productForm, setProductoForm] = useState(initialFormState);

	const [errors, setErrors] = useState<Errors>({});

	const clearForm = () => {
		setProductoForm(initialFormState);
		setErrors({});
	}

	useEffect(() => {
		if (editingProduct) {
			setProductoForm({
				name: editingProduct.name,
				price: editingProduct.price.toString(),
				originalPrice: editingProduct.originalPrice
					? editingProduct.originalPrice.toString()
					: "",
				description: editingProduct.description,
				category: editingProduct.category,
				quantity: editingProduct.quantity.toString(),
				img_url: editingProduct.img_url,
			});
		}else{
			clearForm();
		}
	}, [editingProduct]);

	const handleChange = (e: React.FormEvent) => {
		const { name, value } = e.target as HTMLInputElement;
		setProductoForm({ ...productForm, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		onSubmit(
			{
				...productForm,
				price: Number(productForm.price),
				originalPrice: Number(productForm.originalPrice),
				quantity: Number(productForm.quantity),
			},
			editingProduct?.id
		); // Llamada a la funcion para agregar el producto
		clearForm() //llamo a la funcion para limpiar el formulario
	};

	const validateForm = () => {
		const newErrors: Errors = {};
		const categorys = ["manga", "libro"];
		if (!productForm.name.trim()) {
			newErrors.name = "El nombre es obligatorio.";
		}
		const priceNum = Number(productForm.price);
		if (!productForm.price || isNaN(priceNum) || priceNum <= 0) {
			newErrors.price = "El precio debe ser mayor a 0.";
		}
		const priceOgNum = Number(productForm.originalPrice);
		if (productForm.originalPrice && (isNaN(priceOgNum) || priceOgNum <= 0)) {
            newErrors.originalPrice = "El precio original debe ser un número positivo o vacío.";
        }
		if (productForm.originalPrice && priceOgNum <= priceNum && priceOgNum > 0) {
            newErrors.originalPrice = "El precio original debe ser mayor al precio de descuento";
        }
            
		const quantityNum = Number(productForm.quantity);
		if (
			!productForm.quantity ||
			isNaN(quantityNum) ||
			quantityNum < 0 || //bloqueo los negativos
			(!editingProduct && quantityNum === 0) // bloquea 0 solo si estoy creando
		) {
			newErrors.quantity = "La cantidad debe ser mayor a 0.";
		}
		if (!productForm.img_url.trim()) {
			newErrors.img_url = "La imagen es obligatoria.";
		}
		if (
			!productForm.description.trim() ||
			productForm.description.length < 10
		) {
			newErrors.description =
				"La descripción debe tener al menos 10 caracteres.";
		}
		if (!categorys.includes(productForm.category)) {
			newErrors.category = `La categoría debe ser una de las siguientes: ${categorys.join(
				", "
			)}`;
		}
		setErrors(newErrors);
		// Retorna true solo si todos los campos no tienen errores
		return (
			!newErrors.name &&
			!newErrors.price &&
			!newErrors.originalPrice &&
			!newErrors.description &&
			!newErrors.category &&
			!newErrors.quantity &&
			!newErrors.img_url
		);
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="flex items-center justify-between p-6 border-b border-gray-200 bg-amber-100 rounded-t-xl">
					<h2 className="text-xl font-semibold text-gray-900">
						{editingProduct ? "Editar Producto" : "Nuevo Producto"}
					</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-white/50 rounded-lg transition-colors"
						disabled={isLoading}
					>
						<X className="h-5 w-5 text-gray-500" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nombre *
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={productForm.name}
							onChange={handleChange}
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
								errors.name ? "border-red-500" : "border-gray-300"
							}`}
							placeholder="Ingresa el nombre del producto"
							disabled={isLoading}
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-600">{errors.name}</p>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="originalPrice"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Precio anterior
							</label>
							<div className="relative">
								<span className="absolute left-3 top-2 text-gray-500">$</span>
								<input
									type="number"
									name="originalPrice"
									id="originalPrice"
									value={productForm.originalPrice}
									onChange={handleChange}
									className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
										errors.originalPrice ? "border-red-500" : "border-gray-300"
									}`}
								/>
							</div>
							{errors.originalPrice && (
								<p className="mt-1 text-sm text-red-600">
									{errors.originalPrice}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="price"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Precio*
							</label>
							<div className="relative">
								<span className="absolute left-3 top-2 text-gray-500">$</span>
								<input
									type="number"
									name="price"
									id="price"
									value={productForm.price}
									onChange={handleChange}
									className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
										errors.price ? "border-red-500" : "border-gray-300"
									}`}
									placeholder="1"
								/>
							</div>
							{errors.price && (
								<p className="mt-1 text-sm text-red-600">{errors.price}</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Categoria *
							</label>
							<div className="relative">
								<input
									type="text"
									name="category"
									id="category"
									value={productForm.category}
									onChange={handleChange}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
										errors.category ? "border-red-500" : "border-gray-300"
									}`}
									placeholder="Ingresa la categoria"
									disabled={isLoading}
								/>
							</div>
							{errors.category && (
								<p className="mt-1 text-sm text-red-600">{errors.category}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="quantity"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Cantidad *
							</label>
							<input
								type="number"
								name="quantity"
								id="quantity"
								value={productForm.quantity}
								onChange={handleChange}
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
									errors.quantity ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="0"
								disabled={isLoading}
							/>
							{errors.quantity && (
								<p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="img_url"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Url de imagen *
						</label>
						<input
							type="text"
							name="img_url"
							id="img_url"
							value={productForm.img_url}
							onChange={handleChange}
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors ${
								errors.img_url ? "border-red-500" : "border-gray-300"
							}`}
							placeholder="Ingresa el url de la imagen "
							disabled={isLoading}
						/>
						{errors.img_url && (
							<p className="mt-1 text-sm text-red-600">{errors.img_url}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Descripción *
						</label>
						<textarea
							name="description"
							id="description"
							value={productForm.description}
							onChange={handleChange}
							rows={3}
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors resize-none ${
								errors.description ? "border-red-500" : "border-gray-300"
							}`}
							placeholder="Describe el producto (mínimo 10 caracteres)"
							disabled={isLoading}
						/>
						<div className="flex justify-between items-center mt-1">
							{errors.description ? (
								<p className="text-sm text-red-600">{errors.description}</p>
							) : (
								<p className="text-sm text-gray-500">
									{productForm.description.length}/10 caracteres mínimos
								</p>
							)}
						</div>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							disabled={isLoading}
							className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
						>
							{isLoading && (
								<div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
							)}
							{editingProduct ? "Actualizar" : "Crear"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductForm;
