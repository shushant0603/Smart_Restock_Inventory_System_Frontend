import { TriangleAlert, ShoppingCart, Check, Clock } from "lucide-react";
import AlertStatusBadge from "./AlertStatusBadge";

function AlertCard({ alert, onReorder, onResolve }) {
	const isResolved = alert.status === "resolved";

	return (
		<div
			className={`rounded-xl border p-5 transition-all duration-200 ${
				isResolved
					? "border-emerald-200 bg-emerald-50/50 opacity-60"
					: "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
			}`}
		>
			<div className="flex items-start justify-between gap-4">
				{/* Left — Icon + Info */}
				<div className="flex items-start gap-4">
					<div
						className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
							isResolved
								? "bg-emerald-100"
								: "bg-red-50"
						}`}
					>
						{isResolved ? (
							<Check className="h-5 w-5 text-emerald-600" />
						) : (
							<TriangleAlert className="h-5 w-5 text-red-500" />
						)}
					</div>

					<div>
						<div className="flex items-center gap-2.5">
							<h3 className="text-sm font-semibold text-gray-900">
								{alert.product?.name || "Unknown Product"}
							</h3>

							<AlertStatusBadge severity={isResolved ? "resolved" : (alert.currentStock === 0 ? "out_of_stock" : "low_stock")} />
						</div>

						<p className="mt-1 text-sm text-gray-500">
							Current stock
							<span className="font-semibold text-gray-800">
								{alert.currentStock} units
							</span>
							{" · "}
							Threshold
							<span className="font-semibold text-gray-800">
								{alert.minimumStock} units
							</span>
						</p>

						<p className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
							<Clock className="h-3 w-3" />
							Triggered {new Date(alert.createdAt).toLocaleString()}
						</p>
					</div>
				</div>

				{/* Right — Actions */}
				{!isResolved && (
					<div className="flex shrink-0 items-center gap-2">
						<button
							type="button"
							onClick={() => onReorder(alert)}
							className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.97]"
						>
							<ShoppingCart className="h-4 w-4" />
							Reorder Now
						</button>

						<button
							type="button"
							onClick={() => onResolve(alert)}
							className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.97]"
						>
							<Check className="h-4 w-4" />
							Mark Resolved
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default AlertCard;
