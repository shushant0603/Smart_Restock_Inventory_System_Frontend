import DashboardStats from "./components/DashboardStats";
import InventoryStatusTrend from "./components/InventoryStatusTrend";
import ActiveAlerts from "./components/ActiveAlerts";
import ReorderSuggestions from "./components/ReorderSuggestions";
// import RecentActivity from "./components/RecentActivity";

function Dashboard() {
	return (
		<div className="min-h-full bg-white p-2 md:p-8">
			{/* Header */}
			<div className="mb-6 flex items-start justify-between">
				<div>
					<h1 className="text-xl font-semibold text-gray-900">
						Inventory Dashboard
					</h1>

					<p className="mt-1 text-sm text-gray-500">
						Live overview of stock health across all locations
					</p>
				</div>

			</div>

			{/* Stats */}
			<DashboardStats />

			{/* Smart Reorder Suggestions */}
			<div className="mt-6">
				<ReorderSuggestions />
			</div>

			{/* Charts + Alerts */} 
			 <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
				<InventoryStatusTrend />

				<ActiveAlerts />
			</div>

			{/* Recent Activity */}
			{/* <div className="mt-6">
				<RecentActivity />
			</div> */}
		</div>
	);
}

export default Dashboard;