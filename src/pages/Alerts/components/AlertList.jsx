import AlertCard from "./AlertCard";

function AlertList({ alerts, onReorder, onResolve }) {
	if (alerts.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-16 text-center">
				<p className="text-sm font-medium text-gray-400">
					No alerts found for this filter.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{alerts.map((alert) => (
				<AlertCard
					key={alert.id}
					alert={alert}
					onReorder={onReorder}
					onResolve={onResolve}
				/>
			))}
		</div>
	);
}

export default AlertList;
