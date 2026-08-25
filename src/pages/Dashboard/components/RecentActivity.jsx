import { ArrowRight } from "lucide-react";

import ActivityItem from "./ActivityItem";
import { useDashboardStore } from "../../store/dashboardStore";

function RecentActivity() {
	const activities = useDashboardStore(
		(state) => state.recentActivity
	);

	return (
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div>
				<h2 className="text-sm font-semibold text-gray-900">
					Recent Activity
				</h2>

				<p className="mt-1 text-xs text-gray-500">
					Latest stock transactions and updates
				</p>
			</div>

			<button
				type="button"
				className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-700"
			>
				View all
				<ArrowRight className="h-3 w-3" />
			</button>

			<div className="mt-5 space-y-2">
				{activities?.map((activity) => (
					<ActivityItem
						key={activity.id}
						activity={activity}
					/>
				))}
			</div>
		</div>
	);
}

export default RecentActivity;