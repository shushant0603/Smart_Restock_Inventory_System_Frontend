const SEVERITY_CONFIG = {
	critical: {
		label: "Critical",
		className: "bg-red-50 text-red-700 border-red-200",
	},
	low_stock: {
		label: "Low Stock",
		className: "bg-orange-50 text-orange-700 border-orange-200",
	},
	out_of_stock: {
		label: "Out of Stock",
		className: "bg-red-50 text-red-600 border-red-200",
	},
	resolved: {
		label: "Resolved",
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
	},
};

function AlertStatusBadge({ severity }) {
	const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.low_stock;

	return (
		<span
			className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${config.className}`}
		>
			{config.label}
		</span>
	);
}

export default AlertStatusBadge;
