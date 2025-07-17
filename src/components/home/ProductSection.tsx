import ContentState from "../common/ContentStateProps";

interface ProductSectionProps {
	isLoading: boolean;
	error?: string | null;
	title?: string;
	children: React.ReactNode;
}

//componente destinado a crear seccion grid de productos
const ProductSection = ({
	isLoading,
	error,
	title,
	children
}: ProductSectionProps) => (
	<ContentState isLoading={isLoading} error={error}>
		<section className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-6">
				{title && (
					<h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 mb-4">
						{title}
					</h2>
				)}
				{children}
			</div>
		</section>
	</ContentState>
);

export default ProductSection;
