import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { useDashboardStore } from "../../store/dashboardStore";
import { useInventoryStore } from "../../store/useInventoryStore";
import { createTransaction } from "../../api";
import AlertFilters from "./components/AlertFilters";
import AlertList from "./components/AlertList";
import ReorderModal from "./components/ReorderModal";

function Alerts() {
	const alerts = useDashboardStore((state) => state.activeAlerts);
	const loading = useDashboardStore((state) => state.loading);
	const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);
	const resolveAlert = useDashboardStore((state) => state.resolveAlert);

	const [filter, setFilter] = useState("all");
	const [localAlerts, setLocalAlerts] = useState([]);
	const [selectedAlertForReorder, setSelectedAlertForReorder] = useState(null);

	/* Sync store alerts into local state so we can mutate (resolve) */
	useEffect(() => {
		if (alerts) {
			setLocalAlerts(alerts);
		}
	}, [alerts]);

	/* Fetch on mount */
	useEffect(() => {
		fetchDashboard();
	}, [fetchDashboard]);

	/*
	|--------------------------------------------------------------------------
	| Counts
	|--------------------------------------------------------------------------
	*/

	const counts = useMemo(() => {
		const c = {
			all: localAlerts.length,
			critical: 0,
			low_stock: 0,
			out_of_stock: 0,
			resolved: 0,
		};

		localAlerts.forEach((a) => {
			if (a.status === "resolved") {
				c.resolved += 1;
			} else if (a.severity === "critical") {
				c.critical += 1;
			} else if (a.severity === "low_stock") {
				c.low_stock += 1;
			} else if (a.severity === "out_of_stock") {
				c.out_of_stock += 1;
			}
		});

		return c;
	}, [localAlerts]);

	/*
	|--------------------------------------------------------------------------
	| Filtered Alerts
	|--------------------------------------------------------------------------
	*/

	const filteredAlerts = useMemo(() => {
		if (filter === "all") return localAlerts;
		if (filter === "resolved") {
			return localAlerts.filter((a) => a.status === "resolved");
		}
		return localAlerts.filter(
			(a) => a.severity === filter && a.status !== "resolved"
		);
	}, [localAlerts, filter]);

	/*
	|--------------------------------------------------------------------------
	| Actions
	|--------------------------------------------------------------------------
	*/

	const handleReorder = (alert) => {
		setSelectedAlertForReorder(alert);
	};

	const handleReorderSuccess = (alertId) => {
		resolveAlert(alertId);
		setLocalAlerts((prev) => prev.filter((a) => a.id !== alertId));
		
		// Add a short delay to allow the backend background event loop to finish marking the alert as RESOLVED
		setTimeout(() => {
			fetchDashboard(true);
			useInventoryStore.getState().fetchProducts(true);
		}, 1000);
	};

	const handleResolve = (alert) => {
		setLocalAlerts((prev) =>
			prev.map((a) =>
				a.id === alert.id ? { ...a, status: "resolved" } : a
			)
		);
	};

	const handleRefresh = () => {
		fetchDashboard();
	};

	/*
	|--------------------------------------------------------------------------
	| Loading
	|--------------------------------------------------------------------------
	*/

	if (loading && !localAlerts.length) {
		return (
			<div className="min-h-full bg-white px-[3%] py-[3%]">
				<div className="space-y-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-50"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-full bg-white px-[3%] py-[3%]">
			{/* ================= HEADER ================= */}

			<div className="mb-6 flex items-start justify-between">
				<div>
					<h1 className="text-[clamp(28px,2.5vw,40px)] font-semibold tracking-tight text-gray-900">
						Alerts
					</h1>

					<p className="mt-1 text-[clamp(14px,1vw,18px)] text-gray-500">
						Monitor and resolve stock issues across your
						inventory.
					</p>
				</div>

				<button
					type="button"
					onClick={handleRefresh}
					className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.97]"
				>
					<RefreshCw className="h-4 w-4" />
					Refresh
				</button>
			</div>

			{/* ================= FILTERS ================= */}

			<div className="mb-6">
				<AlertFilters
					activeFilter={filter}
					onFilterChange={setFilter}
					counts={counts}
				/>
			</div>

			{/* ================= ALERT LIST OR EMPTY STATE ================= */}

			{localAlerts.length === 0 ? (
				<div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-gray-900">All caught up!</h3>
					<p className="mt-2 max-w-sm text-sm text-gray-500">
						Your inventory is looking healthy. There are no active alerts or low stock warnings at the moment.
					</p>
				</div>
			) : (
				<AlertList
					alerts={filteredAlerts}
					onReorder={handleReorder}
					onResolve={handleResolve}
				/>
			)}

			{/* ================= REORDER MODAL ================= */}

			{selectedAlertForReorder && (
				<ReorderModal
					alert={selectedAlertForReorder}
					onClose={() => setSelectedAlertForReorder(null)}
					onSuccess={handleReorderSuccess}
				/>
			)}
		</div>
	);
}

export default Alerts;
