import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

function InventoryTrendChart({ data = [] }) {
	return ( 
		<ResponsiveContainer width="100%" height="100%" minHeight={300}>
			<AreaChart
				data={data}
				margin={{
					top: 10,
					right: 10,
					left: -15,
					bottom: 0,
				}}
			>
				{/* ================= GRADIENTS ================= */}

				<defs>
					<linearGradient
						id="salesGradient"
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop
							offset="0%"
							stopColor="#3b82f6"
							stopOpacity={0.28}
						/>

						<stop
							offset="95%"
							stopColor="#3b82f6"
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>

				{/* ================= GRID ================= */}

				<CartesianGrid
					strokeDasharray="4 6"
					vertical={false}
					stroke="#e5e7eb"
				/>

				{/* ================= X AXIS ================= */}

				<XAxis
					dataKey="label"
					axisLine={false}
					tickLine={false}
					tick={{
						fontSize: 12,
						fill: "#6b7280",
					}}
					dy={10}
				/>

				{/* ================= Y AXIS ================= */}

				<YAxis
					axisLine={false}
					tickLine={false}
					tick={{
						fontSize: 12,
						fill: "#6b7280",
					}}
					domain={[0, "auto"]}
				/>

				{/* ================= TOOLTIP ================= */}

				<Tooltip
					cursor={{
						stroke: "#d1d5db",
						strokeWidth: 1,
						strokeDasharray: "5 5",
					}}
					contentStyle={{
						borderRadius: "14px",
						border: "1px solid #e5e7eb",
						backgroundColor: "#ffffff",
						boxShadow:
							"0 12px 35px rgba(0,0,0,0.10)",
						padding: "12px 14px",
					}}
					labelStyle={{
						fontWeight: 600,
						color: "#111827",
						marginBottom: 8,
					}}
				/>

				{/* ================= SALES ================= */}

				<Area
					type="monotone"
					dataKey="sales"
					name="Sales"
					stroke="#3b82f6"
					strokeWidth={3}
					fill="url(#salesGradient)"
					fillOpacity={1}
					connectNulls
					dot={false}
					activeDot={{
						r: 6,
						fill: "#3b82f6",
						stroke: "#ffffff",
						strokeWidth: 3,
					}}
					animationDuration={1400}
					animationEasing="ease-out"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}

export default InventoryTrendChart;