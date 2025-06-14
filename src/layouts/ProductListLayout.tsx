const ProductListLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <section className="bg-white">
		<section className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-6">
				<h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">
					{title}
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {children}
				</div>
			</div>
		</section>
    </section>
);

export default ProductListLayout;