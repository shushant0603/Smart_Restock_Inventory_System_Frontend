import ProductRow from "./ProductRow";

function ProductTable({ products, loading }) {
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-16">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
				<p className="mt-4 text-sm text-gray-500">Loading products...</p>
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<p className="text-sm font-medium text-gray-400">No products found.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			{/* Table Header */}
			<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-200 bg-gray-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
				<div>Product</div>
				<div>Category</div>
				<div>Current Stock</div>
				<div>Min. Threshold</div>
				<div>Status</div>
				<div>Actions</div>
			</div>

			{/* Table Body */}
			<div className="flex flex-col">
				{products.map((product) => (
					<ProductRow key={product._id || product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default ProductTable;
