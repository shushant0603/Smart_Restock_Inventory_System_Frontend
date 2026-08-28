import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	Package,
	AlertCircle,
	ArrowRightLeft,
	ShoppingCart,
	Settings,
	Layers,
	Truck,
	Lightbulb,
	ClipboardList
} from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { usePlanningStore } from "../../store/usePlanningStore";
import useAuthStore from "../../store/authStore";
import gsap from "gsap";

const topLinks = [
	{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
	{ label: "Inventory", path: "/inventory", icon: Package },
	{ label: "Planning Requests", path: "/planning-requests", icon: ClipboardList, badgeKey: "planning" },
	{ label: "Alerts", path: "/alerts", icon: AlertCircle, badgeKey: "alerts" },
	{ label: "Suggestions", path: "/suggestions", icon: Lightbulb, badgeKey: "suggestions" },
	{ label: "Transactions", path: "/transactions", icon: ArrowRightLeft },
	{ label: "Orders", path: "/orders", icon: ShoppingCart },
	{ label: "Suppliers", path: "/suppliers", icon: Truck },
];

function Sidebar({ isOpen, onClose }) {
	const alerts = useDashboardStore((state) => state.activeAlerts);
	const suggestions = useDashboardStore((state) => state.suggestions);
	const requests = usePlanningStore((state) => state.requests);
	const planningRequests = requests?.filter(r => r.status === "New") || [];
	
	const counts = {
		alerts: alerts?.length ?? 0,
		suggestions: suggestions?.length ?? 0,
		planning: planningRequests?.length ?? 0
	};

	const handleMouseEnter = (e) => {
		gsap.to(e.currentTarget, { y: -3, scale: 1.02, duration: 0.2, ease: "power2.out" });
	};

	const handleMouseLeave = (e) => {
		gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: "power2.out" });
	};

	return (
		<>
			{/* Mobile Backdrop Overlay */}
			{isOpen && (
				<div 
					className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity"
					onClick={onClose}
				/>
			)}

			<aside 
				className={`
					fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-gray-50 p-4 transition-transform duration-300 ease-in-out md:static md:w-64 md:translate-x-0
					${isOpen ? "translate-x-0" : "-translate-x-full"}
				`}
			>
				{/* Branding */}
				<div className="mb-8 flex items-center gap-3 px-2">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
						<Layers className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<span className="text-lg font-bold leading-tight text-gray-900">
							SmartStock
						</span>
						<span className="text-xs font-medium text-gray-500">
							Inventory Suite
						</span>
					</div>
				</div>

				{/* Main Navigation */}
				<nav className="flex flex-1 flex-col gap-3 overflow-y-auto mt-2">
					{topLinks.map(({ label, path, icon: Icon, badgeKey }) => (
						<NavLink
							key={path}
							to={path}
							onClick={onClose}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							className={({ isActive }) =>
								`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-600 text-white shadow-sm"
										: "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
								}`
							}
						>
							{({ isActive }) => (
								<>
									<div className="flex items-center gap-3">
										<Icon
											className={`h-5 w-5 ${
												isActive ? "text-white" : "text-gray-900"
											}`}
										/>
										{label}
									</div>
									{badgeKey && counts[badgeKey] > 0 && (
										<span
											className={`flex h-5 items-center justify-center rounded-md px-1.5 text-xs font-bold ${
												isActive
													? "bg-white text-blue-600"
													: badgeKey === "alerts" ? "bg-red-600 text-white" : badgeKey === "planning" ? "bg-red-600 text-white" : "bg-amber-500 text-white"
											}`}
										>
											{counts[badgeKey]}
										</span>
									)}
								</>
							)}
						</NavLink>
					))}
				</nav>

				{/* Bottom Navigation */}
				<div className="mt-auto pt-4 space-y-1 border-t border-gray-200">
					<NavLink
						to="/settings"
						onClick={onClose}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={({ isActive }) =>
							`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
								isActive
									? "bg-blue-600 text-white shadow-sm"
									: "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
							}`
						}
					>
						{({ isActive }) => (
							<>
								<Settings
									className={`h-5 w-5 ${
										isActive ? "text-white" : "text-gray-900"
									}`}
								/>
								Settings
							</>
						)}
					</NavLink>
					
					<button
						onClick={() => {
							onClose();
							useAuthStore.getState().logout();
						}}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100/80 hover:text-red-600"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 group-hover:text-red-600"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
						Logout
					</button>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
