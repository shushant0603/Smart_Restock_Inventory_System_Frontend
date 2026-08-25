import { useState, useMemo, useEffect } from "react";
import { Lightbulb, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { createTransaction } from "../../api";
import { useDashboardStore } from "../../store/dashboardStore";

const LEAD_TIME_DAYS = 3;
const SAFETY_STOCK = 20;

function Suggestions() {
	const suggestions = useDashboardStore((state) => state.suggestions) || [];
	const loading = useDashboardStore((state) => state.loading);
	const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);
	const resolveAlert = useDashboardStore((state) => state.resolveAlert);
	
	const [processingIds, setProcessingIds] = useState(new Set());
	const [isProcessingAll, setIsProcessingAll] = useState(false);

	useEffect(() => {
		fetchDashboard();
	}, [fetchDashboard]);

	const handleAcceptSuggestion = async (suggestion) => {
		setProcessingIds(prev => new Set([...prev, suggestion.id]));
		try {
			await createTransaction({
				productId: suggestion.productId,
				type: "RECEIPT",
				quantity: suggestion.reorderQuantity,
				note: "Auto-reordered via Smart Suggestions"
			});
			
			resolveAlert(suggestion.id);
			setTimeout(() => fetchDashboard(), 1000);
		} catch (error) {
			console.error("Failed to process suggestion:", error);
			window.alert(`Failed to order ${suggestion.product?.name}`);
		} finally {
			setProcessingIds(prev => {
				const next = new Set(prev);
				next.delete(suggestion.id);
				return next;
			});
		}
	};

	const handleAcceptAll = async () => {
		if (suggestions.length === 0) return;
		if (!window.confirm(`Are you sure you want to accept all ${suggestions.length} suggestions? This will create multiple restock transactions.`)) return;

		setIsProcessingAll(true);
		
		const allIds = suggestions.map(s => s.id);
		setProcessingIds(new Set(allIds));

		try {
			const promises = suggestions.map(suggestion => 
				createTransaction({
					productId: suggestion.productId,
					type: "RECEIPT",
					quantity: suggestion.reorderQuantity,
					note: "Bulk auto-reordered via Smart Suggestions"
				}).then(() => resolveAlert(suggestion.id))
			);
			
			await Promise.allSettled(promises);
			setTimeout(() => fetchDashboard(), 1000);
		} finally {
			setIsProcessingAll(false);
			setProcessingIds(new Set());
		}
	};

	if (loading && !suggestions.length) {
		return (
			<div className="min-h-full bg-white px-[3%] py-[3%]">
				<div className="space-y-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-full bg-gray-50 px-4 py-8 md:px-8">
			{/* Header */}
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
							<Lightbulb className="h-6 w-6" />
						</div>
						Smart Suggestions
					</h1>
					<p className="mt-2 text-sm text-gray-500">
						AI-driven reorder recommendations based on your Average Daily Usage and Lead Time formulas.
					</p>
				</div>
				
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => fetchDashboard()}
						className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.97]"
					>
						<RefreshCw className="h-4 w-4" />
						Refresh
					</button>

					{suggestions.length > 0 && (
						<button
							onClick={handleAcceptAll}
							disabled={isProcessingAll}
							className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
						>
							{isProcessingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
							Accept All ({suggestions.length})
						</button>
					)}
				</div>
			</div>

			{/* Main Content */}
			{suggestions.length === 0 ? (
				<div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<CheckCircle2 className="h-8 w-8 text-green-600" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900">Optimal Stock Levels!</h3>
					<p className="mt-2 max-w-sm text-sm text-gray-500">
						Your inventory is perfectly balanced. There are no reorder suggestions at this time based on current usage.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{suggestions.map((suggestion) => (
						<div 
							key={suggestion.id} 
							className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
						>
							<div className="flex items-start justify-between">
								<h3 className="font-semibold text-gray-900">{suggestion.product?.name || "Product"}</h3>
								<span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md ring-1 ring-red-100">
									<span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
									{suggestion.currentStock} left
								</span>
							</div>

							<div className="mt-4 flex-1 space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-gray-500">Avg Daily Usage</span>
									<span className="font-medium text-gray-900">{suggestion.avgDailyUsage} units/day</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-500">Lead Time</span>
									<span className="font-medium text-gray-900">{LEAD_TIME_DAYS} days</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-500">Safety Stock (Min Threshold)</span>
									<span className="font-medium text-gray-900">{suggestion.safetyStock} units</span>
								</div>
								<div className="my-1 border-t border-gray-100" />
								<div className="flex justify-between text-sm">
									<span className="font-medium text-gray-700">Calculated Target</span>
									<span className="font-bold text-gray-900">{suggestion.targetStock} units</span>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
								<div className="flex flex-col">
									<span className="text-xs text-gray-500">Recommend</span>
									<span className="text-xl font-bold text-blue-600">+{suggestion.reorderQuantity}</span>
								</div>

								<button
									onClick={() => handleAcceptSuggestion(suggestion)}
									disabled={processingIds.has(suggestion.id)}
									className="flex min-w-[100px] shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
								>
									{processingIds.has(suggestion.id) ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										"Accept"
									)}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Suggestions;
