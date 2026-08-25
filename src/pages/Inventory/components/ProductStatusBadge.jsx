import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

function ProductStatusBadge({ currentStock, minimumStock }) {
	let status = "Healthy";
	let colors = "bg-emerald-100 text-emerald-700";
	let Icon = CheckCircle2;

	if (currentStock === 0) {
		status = "Out of Stock";
		colors = "bg-red-100 text-red-700";
		Icon = XCircle;
	} else if (currentStock <= minimumStock) {
		status = "Low Stock";
		colors = "bg-orange-100 text-orange-700";
		Icon = AlertTriangle;
	}

	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors}`}
		>
			<Icon className="h-3.5 w-3.5" />
			{status}
		</span>
	);
}

export default ProductStatusBadge;
