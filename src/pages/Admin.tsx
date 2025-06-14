import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/common/ProductList";
import ProductCard from "../components/admin/ProductCard";
import { useProducts } from "../context/ProductContext";

const Admin = () => {
	const { products, editingProduct, showForm, isLoading, editProduct, handleDeleteProduct, toggleForm, handleSubmit } = useProducts();

	return (
		<div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductList
					products={products}
					ProductCardComponent={ProductCard}
					cardProps={{
						onEdit: editProduct,
						onDelete: handleDeleteProduct
					}}
				/>
            </div>
			{showForm && (
				<ProductForm
					onSubmit={handleSubmit}
					onClose={toggleForm}
					isLoading={isLoading}
					editingProduct={editingProduct}
				/>
			)}
		</div>
	);
};

export default Admin;
