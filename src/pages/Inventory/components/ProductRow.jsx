import { Eye, Edit2, RefreshCw } from "lucide-react";
import ProductStatusBadge from "./ProductStatusBadge";

function ProductRow({ product }) {
	const {
		name,
		sku,
		category,
		currentStock,
		minimumStock,
	} = product;

	return (
		<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center border-t border-gray-200 px-6 py-4 hover:bg-gray-50">
			{/* Product */}
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
					{/* Placeholder Icon based on category or default */}
					<svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
						/>
					</svg>
				</div>
				<div>
					<h3 className="text-sm font-semibold text-gray-900">{name}</h3>
					<p className="text-xs text-gray-500">{sku || "N/A"}</p>
				</div>
			</div>

			{/* Category */}
			<div className="text-sm text-gray-600">{category}</div>

			{/* Current Stock */}
			<div className="text-sm font-bold text-gray-900">{currentStock}</div>

			{/* Min Threshold */}
			<div className="text-sm text-gray-600">{minimumStock}</div>

			{/* Status */}
			<div>
				<ProductStatusBadge
					currentStock={currentStock}
					minimumStock={minimumStock}
				/>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-3">
				<button type="button" className="text-gray-400 hover:text-blue-600">
					<Eye className="h-4 w-4" />
				</button>
				<button type="button" className="text-gray-400 hover:text-gray-900">
					<Edit2 className="h-4 w-4" />
				</button>
				<button type="button" className="text-gray-400 hover:text-blue-600">
					<RefreshCw className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}

export default ProductRow;
