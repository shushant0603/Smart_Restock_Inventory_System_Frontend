import { useState, useMemo } from "react";
import { Lightbulb, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { createTransaction } from "../../../api";
import { useDashboardStore } from "../../../store/dashboardStore";

// Default parameters for the formula (since they are not in DB yet)
const LEAD_TIME_DAYS = 3;
const SAFETY_STOCK = 20;

export default function ReorderSuggestions() {
	const suggestionsStore = useDashboardStore((state) => state.suggestions) || [];
	const resolveAlert = useDashboardStore((state) => state.resolveAlert);
	const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);
	
	const [processingId, setProcessingId] = useState(null);

	const suggestions = suggestionsStore.slice(0, 3); // Show top 3 suggestions

	const handleAcceptSuggestion = async (suggestion) => {
		setProcessingId(suggestion.id);
		try {
			await createTransaction({
				productId: suggestion.productId,
				type: "RECEIPT",
				quantity: suggestion.reorderQuantity,
				note: "Auto-reordered via Smart Suggestions"
			});
			
			resolveAlert(suggestion.id);
			setTimeout(() => {
				fetchDashboard();
			}, 1000);
		} catch (error) {
			console.error("Failed to process suggestion:", error);
			window.alert("Failed to create transaction.");
		} finally {
			setProcessingId(null);
		}
	};

	if (suggestions.length === 0) return null;

	return (
		<div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-sm">
			<div className="mb-5 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
					<Lightbulb className="h-5 w-5" />
				</div>
				<div>
					<h2 className="text-lg font-bold text-gray-900">Smart Suggestions</h2>
					<p className="text-sm text-gray-500">AI-driven reorder recommendations based on your formula</p>
				</div>
			</div>

			<div className="space-y-4">
				{suggestions.map((suggestion) => (
					<div 
						key={suggestion.id} 
						className="group flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center"
					>
						<div className="flex flex-1 flex-col">
							<h3 className="font-semibold text-gray-900">{suggestion.product?.name || "Product"}</h3>
							<div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
								<span className="flex items-center gap-1">
									<span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
									Stock: <span className="font-medium text-red-600">{suggestion.currentStock}</span>
								</span>
								<span>Avg Usage: {suggestion.avgDailyUsage}/day</span>
								<span>Target: {suggestion.targetStock}</span>
							</div>
						</div>

						<div className="flex items-center gap-4 border-t border-gray-100 pt-3 sm:border-0 sm:pt-0">
							<div className="flex flex-col items-end">
								<span className="text-xs text-gray-500">Suggested Order</span>
								<span className="text-lg font-bold text-blue-600">+{suggestion.reorderQuantity} units</span>
							</div>

							<button
								onClick={() => handleAcceptSuggestion(suggestion)}
								disabled={processingId === suggestion.id}
								className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
							>
								{processingId === suggestion.id ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<>
										<CheckCircle2 className="h-4 w-4" />
										Accept
									</>
								)}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
