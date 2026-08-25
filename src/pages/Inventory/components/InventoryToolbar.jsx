import { Search, Tag, Filter, XCircle } from "lucide-react";

function InventoryToolbar({
	searchQuery,
	setSearchQuery,
	categoryFilter,
	setCategoryFilter,
	statusFilter,
	setStatusFilter,
	onClearFilters,
	categories = [],
}) {
	const hasActiveFilters =
		searchQuery || categoryFilter !== "All Categories" || statusFilter !== "All Status";

	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
			{/* Search */}
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					placeholder="Search products..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				{/* Category Filter */}
				<div className="relative">
					<Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<select
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
						className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					>
						<option value="All Categories">All Categories</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					{/* Dropdown arrow */}
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
						<svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
							<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
						</svg>
					</div>
				</div>

				{/* Status Filter */}
				<div className="relative">
					<Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					>
						<option value="All Status">All Status</option>
						<option value="Healthy">Healthy</option>
						<option value="Low Stock">Low Stock</option>
						<option value="Out of Stock">Out of Stock</option>
					</select>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
						<svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
							<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
						</svg>
					</div>
				</div>

				{/* Clear Filters */}
				{hasActiveFilters && (
					<button
						type="button"
						onClick={onClearFilters}
						className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						<XCircle className="h-4 w-4" />
						Clear filters
					</button>
				)}
			</div>
		</div>
	);
}

export default InventoryToolbar;
