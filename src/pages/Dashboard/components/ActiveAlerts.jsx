import { Bell, TriangleAlert } from "lucide-react";

import { useDashboardStore } from "../../../store/dashboardStore";

function ActiveAlerts() {
	const alerts = useDashboardStore((state) => state.activeAlerts);
	const dismissAllAlerts = useDashboardStore(
		(state) => state.dismissAllAlerts
	);

	return (
		<div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div>
				<h2 className="text-sm font-semibold text-gray-900">
					Active Alerts
				</h2>

				<p className="mt-1 text-xs text-gray-500">
					{alerts?.length ?? 0} items need attention
				</p>
			</div>

			<Bell className="mt-2 h-4 w-4 text-gray-500" />

			<div className="mt-3 max-h-93.75 space-y-2 overflow-y-auto pr-1">
				{alerts?.map((alert) => (
					<div
						key={alert.id}
						className="rounded-lg border border-gray-200 bg-gray-50 p-3"
					>
						<div className="flex items-start gap-3">
							<TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gray-800" />

							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 text-xs">
									<span className="font-medium text-red-600">
										Alert #{alert.id}
									</span>
									<span className="text-gray-400">&bull;</span>
									<span className="text-gray-500 uppercase">
										{alert.product?.id ? `SKU-${alert.product.id}` : ''}
									</span>
								</div>

								<div className="mt-1">
									<p className="font-medium text-gray-900">
										{alert.product?.name || "Unknown Product"}
									</p>
									<p className="mt-0.5 text-gray-500">
									{alert.currentStock === 0
										? `Stock depleted — ${alert.currentStock} units remaining`
										: alert.type === "LOW_STOCK"
										? `Critical — only ${alert.currentStock} units left (minimum: ${alert.minimumStock})`
										: `Low stock — ${alert.currentStock} units remaining`}
									</p>
								</div>
							</div>

							<div className="flex shrink-0 flex-col items-end gap-2 text-xs text-gray-500">
								<span className="whitespace-nowrap">
									{new Date(alert.createdAt).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<button
				type="button"
				onClick={dismissAllAlerts}
				className="mt-3 h-8 rounded-md border border-gray-200 text-xs font-medium text-gray-900 transition hover:bg-gray-50"
			>
				Dismiss All
			</button>
		</div>
	);
}

export default ActiveAlerts;