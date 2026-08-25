import { useEffect } from "react";
import {
	Package,
	CircleCheck,
	TriangleAlert,
	CircleX,
} from "lucide-react";

import StatCard from "./StatCard";
import { useDashboardStore } from "../../../store/dashboardStore";

function DashboardStats() {
	const stats = useDashboardStore((state) => state.dashboardStats);
	const loading = useDashboardStore((state) => state.loading);
	const error = useDashboardStore((state) => state.error);
	const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);

	useEffect(() => {
		fetchDashboard();
	}, [fetchDashboard]);

	if (loading) {
		return (
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="h-[149px] animate-pulse rounded-xl border border-gray-200 bg-gray-50"
					/>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
				Failed to load dashboard stats: {error}
			</div>
		);
	}

	if (!stats) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
			<StatCard
				title="Total Products"
				value={stats.totalProducts}
				icon={<Package className="h-4 w-4 text-blue-600" />}
				iconClassName="bg-blue-50"
				trend={stats.totalProductsTrend}
				trendClassName="text-gray-500"
			/>

			<StatCard
				title="Healthy Stock"
				value={stats.healthyStock}
				icon={<CircleCheck className="h-4 w-4 text-emerald-600" />}
				iconClassName="bg-emerald-100"
				trend={stats.healthyStockTrend}
				trendClassName="text-emerald-600"
			/>

			<StatCard
				title="Low Stock"
				value={stats.lowStock}
				icon={<TriangleAlert className="h-4 w-4 text-orange-600" />}
				iconClassName="bg-orange-100"
				trend={stats.lowStockTrend}
				trendClassName="text-orange-600"
			/>

			<StatCard
				title="Out of Stock"
				value={stats.outOfStock}
				icon={<CircleX className="h-4 w-4 text-red-600" />}
				iconClassName="bg-red-50"
				trend={stats.outOfStockTrend}
				trendClassName="text-red-600"
			/>
		</div>
	);
}

export default DashboardStats;