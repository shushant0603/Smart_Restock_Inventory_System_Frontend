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

							<div className="min-w-0 flex-1">
								<div className="flex items-start justify-between gap-2">
									<p className="text-xs font-semibold text-gray-900">
										{alert.sku}
									</p>

									<span className="h-1 w-3 rounded-full bg-blue-500" />
								</div>

								<p className="mt-0.5 text-xs font-medium text-gray-900">
									{alert.productName}
								</p>

								<p className="mt-1 text-[11px] leading-4 text-gray-500">
									{alert.severity === "out_of_stock"
										? `Stock depleted — ${alert.currentStock} units remaining`
										: alert.severity === "critical"
										? `Critical — only ${alert.currentStock} units left (threshold: ${alert.threshold})`
										: `Low stock — ${alert.currentStock} units remaining`}
								</p>

								<p className="mt-1 text-[10px] text-gray-500">
									{alert.triggeredAt}
								</p>
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