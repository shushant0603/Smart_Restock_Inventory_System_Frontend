import {
	useLayoutEffect,
	useRef,
	useState,
} from "react";

import gsap from "gsap";

import { useDashboardStore } from "../../../store/dashboardStore";
import InventoryTrendChart from "../../../components/charts/InventoryTrendChart";

function InventoryStatusTrend() {
	const trendData = useDashboardStore(
		(state) => state.inventoryStatusTrend
	);
	const products = useDashboardStore((state) => state.products) || [];

	const [period, setPeriod] = useState("monthly");
	const [selectedProduct, setSelectedProduct] = useState("overall");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const cardRef = useRef(null);
	const chartRef = useRef(null);
	const headerRef = useRef(null);
	const tabsRef = useRef(null);
	const legendRef = useRef(null);

	const currentTrendMap = selectedProduct === "overall" 
		? trendData?.overall 
		: trendData?.products?.[selectedProduct];
		
	const data = currentTrendMap?.[period] ?? [];

	/*
	|--------------------------------------------------------------------------
	| IMPORTANT
	|--------------------------------------------------------------------------
	| Data is ready only when current period actually contains data.
	*/

	const isTrendReady = data.length > 0;

	/*
	|--------------------------------------------------------------------------
	| Initial Animation
	|--------------------------------------------------------------------------
	*/

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: {
					ease: "power3.out",
				},
			});

			tl.from(cardRef.current, {
				opacity: 0,
				y: 25,
				duration: 0.6,
			});

			tl.from(
				headerRef.current,
				{
					opacity: 0,
					y: 15,
					duration: 0.4,
				},
				"-=0.3"
			);

			tl.from(
				tabsRef.current,
				{
					opacity: 0,
					y: 10,
					duration: 0.35,
				},
				"-=0.2"
			);

			tl.from(
				legendRef.current.children,
				{
					opacity: 0,
					y: 8,
					stagger: 0.08,
					duration: 0.3,
				},
				"-=0.2"
			);
		}, cardRef);

		return () => ctx.revert();
	}, []);

	/*
	|--------------------------------------------------------------------------
	| Chart Animation
	|--------------------------------------------------------------------------
	*/

	useLayoutEffect(() => {
		if (!isTrendReady || !chartRef.current) {
			return;
		}

		const ctx = gsap.context(() => {
			gsap.fromTo(
				chartRef.current,
				{
					opacity: 0,
					y: 15,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power3.out",
				}
			);
		}, chartRef);

		return () => ctx.revert();
	}, [isTrendReady, period]);

	/*
	|--------------------------------------------------------------------------
	| Period Change
	|--------------------------------------------------------------------------
	*/

	const handlePeriodChange = (item) => {
		if (item === period) return;

		setPeriod(item);
	};

	return (
		<div
			ref={cardRef}
			className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
		>
			{/* ================= HEADER ================= */}

			<div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">
						Sales & Usage Trend
					</h2>

					<p className="mt-1 text-sm text-gray-500">
						Track product performance over time
					</p>
				</div>

				<div className="relative">
					<button
						type="button"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
						className="flex w-full min-w-[220px] items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					>
						<span className="truncate">
							{selectedProduct === "overall" 
								? "Overall (All Products)" 
								: products.find((p) => String(p.id) === String(selectedProduct))?.name || "Unknown Product"}
						</span>
						<svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>

					{isDropdownOpen && (
						<div className="absolute right-0 z-10 mt-1 max-h-60 w-full min-w-[220px] overflow-y-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
							<button
								type="button"
								onClick={() => { setSelectedProduct("overall"); setIsDropdownOpen(false); }}
								className={`block w-full px-4 py-2 text-left text-sm ${selectedProduct === "overall" ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
							>
								Overall (All Products)
							</button>
							{products.map((p) => (
								<button
									key={p.id}
									type="button"
									onClick={() => { setSelectedProduct(p.id); setIsDropdownOpen(false); }}
									className={`block w-full px-4 py-2 text-left text-sm truncate ${String(selectedProduct) === String(p.id) ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
								>
									{p.name}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* ================= TABS ================= */}

			<div
				ref={tabsRef}
				className="mt-5 inline-flex rounded-xl bg-gray-100 p-1"
			>
				{["weekly", "monthly", "yearly"].map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => handlePeriodChange(item)}
						className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
							period === item
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-500 hover:text-gray-900"
						}`}
					>
						{item}
					</button>
				))}
			</div>

			{/* ================= CHART ================= */}

			<div
				ref={chartRef}
				className="mt-6 h-[300px] w-full"
			>
				{!isTrendReady ? (
					<div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-50">
						<div className="flex flex-col items-center gap-3">
							<div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />

							<p className="text-sm text-gray-400">
								Loading inventory trend...
							</p>
						</div>
					</div>
				) : (
					<InventoryTrendChart data={data} />
				)}
			</div>

			{/* ================= LEGEND ================= */}

			<div
				ref={legendRef}
				className="mt-5 flex items-center gap-6 text-sm text-gray-500"
			>
				<div className="flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
					<span>Sales / Dispatch</span>
				</div>
			</div>
		</div>
	);
}

export default InventoryStatusTrend;