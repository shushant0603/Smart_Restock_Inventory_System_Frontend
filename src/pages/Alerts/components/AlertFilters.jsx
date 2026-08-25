const FILTER_OPTIONS = [
	{ key: "all", label: "All", dotColor: "bg-gray-400" },
	{ key: "critical", label: "Critical", dotColor: "bg-red-500" },
	{ key: "low_stock", label: "Low Stock", dotColor: "bg-orange-500" },
	{ key: "out_of_stock", label: "Out of Stock", dotColor: "bg-red-400" },
	{ key: "resolved", label: "Resolved", dotColor: "bg-emerald-500" },
];

function AlertFilters({ activeFilter, onFilterChange, counts }) {
	return (
		<div className="flex flex-wrap items-center gap-2">
			{FILTER_OPTIONS.map((option) => {
				const isActive = activeFilter === option.key;
				const count = counts[option.key] ?? 0;

				return (
					<button
						key={option.key}
						type="button"
						onClick={() => onFilterChange(option.key)}
						className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
							isActive
								? "border-gray-900 bg-gray-900 text-white shadow-sm"
								: "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
						}`}
					>
						<span
							className={`h-2 w-2 rounded-full ${
								isActive ? "bg-white" : option.dotColor
							}`}
						/>

						{option.label}

						<span
							className={`ml-0.5 rounded px-1.5 py-0.5 text-xs font-bold ${
								isActive
									? "bg-white/20 text-white"
									: "bg-gray-100 text-gray-600"
							}`}
						>
							{count}
						</span>
					</button>
				);
			})}
		</div>
	);
}

export default AlertFilters;
