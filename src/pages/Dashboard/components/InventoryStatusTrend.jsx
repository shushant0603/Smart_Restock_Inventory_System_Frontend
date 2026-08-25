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

				<select
					value={selectedProduct}
					onChange={(e) => setSelectedProduct(e.target.value)}
					className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				>
					<option value="overall">Overall (All Products)</option>
					{products.map((p) => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
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