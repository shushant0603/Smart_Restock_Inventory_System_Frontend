import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Bell,
	ChevronDown,
	Package,
	AlertTriangle,
	Menu,
} from "lucide-react";
import gsap from "gsap";
import useAuthStore from "../../store/authStore";
import { useDashboardStore } from "../../store/dashboardStore";

function Header({ onMenuClick }) {
	const navigate = useNavigate();
	const headerRef = useRef(null);
	const notificationRef = useRef(null);
	const notificationPanelRef = useRef(null);
	const userRef = useRef(null);
	const userPanelRef = useRef(null);
	const dotRef = useRef(null);
	const bellIconRef = useRef(null);

	const [showNotifications, setShowNotifications] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const user = useAuthStore((state) => state.user);
	const alerts = useDashboardStore((state) => state.activeAlerts);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: {
					ease: "power3.out",
				},
			});

			tl.from(
				notificationRef.current,
				{
					opacity: 0,
					scale: 0.5,
					duration: 0.4,
				},
				"-=0.3"
			)
				.from(
					userRef.current,
					{
						opacity: 0,
						x: 30,
						duration: 0.5,
					},
					"-=0.2"
				);

			gsap.to(dotRef.current, {
				scale: 1.25,
				opacity: 0.7,
				duration: 0.8,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			});
		}, headerRef);

		return () => ctx.revert();
	}, []);

	const handleNotificationClick = () => {
		gsap.timeline()
			.to(bellIconRef.current, {
				rotation: -18,
				duration: 0.08,
			})
			.to(bellIconRef.current, {
				rotation: 18,
				duration: 0.08,
			})
			.to(bellIconRef.current, {
				rotation: -14,
				duration: 0.08,
			})
			.to(bellIconRef.current, {
				rotation: 14,
				duration: 0.08,
			})
			.to(bellIconRef.current, {
				rotation: 0,
				duration: 0.15,
				ease: "elastic.out(1, 0.4)",
			});

		if (!showNotifications) {
			setShowNotifications(true);

			requestAnimationFrame(() => {
				gsap.fromTo(
					notificationPanelRef.current,
					{
						opacity: 0,
						y: -15,
						scale: 0.95,
					},
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.3,
						ease: "power3.out",
					}
				);
			});
		} else {
			gsap.to(notificationPanelRef.current, {
				opacity: 0,
				y: -10,
				scale: 0.95,
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => {
					setShowNotifications(false);
				},
			});
		}
	};

	const handleUserClick = () => {
		if (!showUserMenu) {
			setShowUserMenu(true);

			requestAnimationFrame(() => {
				gsap.fromTo(
					userPanelRef.current,
					{
						opacity: 0,
						y: -10,
						scale: 0.95,
					},
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.25,
						ease: "power3.out",
					}
				);
			});
		} else {
			gsap.to(userPanelRef.current, {
				opacity: 0,
				y: -10,
				scale: 0.95,
				duration: 0.2,
				onComplete: () => {
					setShowUserMenu(false);
				},
			});
		}
	};

	return (
		<header
			ref={headerRef}
			className="
				relative
				flex
				h-[9vh]
				min-h-[64px]
				max-h-[90px]
				items-center
				justify-between
				border-b
				border-gray-200
				bg-white
				px-[3%]
			"
		>
			{/* ================= HAMBURGER ================= */}

			<div className="flex h-[70%] items-center">
				<button
					onClick={onMenuClick}
					className="flex shrink-0 items-center justify-center rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 md:hidden"
				>
					<Menu className="h-6 w-6" />
				</button>
			</div>

			{/* ================= RIGHT SIDE ================= */}

			<div className="flex items-center gap-[2vw]">

				{/* ================= NOTIFICATION ================= */}

				<div className="relative">
					<button
						ref={notificationRef}
						onClick={handleNotificationClick}
						className="
							flex
							h-[clamp(38px,3vw,48px)]
							w-[clamp(38px,3vw,48px)]
							items-center
							justify-center
							rounded-full
							transition-colors
							duration-200
							hover:bg-gray-100
						"
					>
						<Bell
							ref={bellIconRef}
							className="
								h-[clamp(20px,1.7vw,28px)]
								w-[clamp(20px,1.7vw,28px)]
								text-gray-900
							"
							strokeWidth={2}
						/>

						{alerts.filter(a => a.status === "ACTIVE").length > 0 && (
							<span
								ref={dotRef}
								className="
									absolute
									right-[10%]
									top-[10%]
									h-[clamp(7px,0.7vw,11px)]
									w-[clamp(7px,0.7vw,11px)]
									rounded-full
									bg-red-600
								"
							/>
						)}
					</button>

					{/* Notification Dropdown */}

					{showNotifications && (
						<div
							ref={notificationPanelRef}
							className="
								absolute
								right-0
								top-[calc(100%+12px)]
								z-50
								w-[min(380px,90vw)]
								origin-top-right
								rounded-2xl
								border
								border-gray-200
								bg-white
								p-4
								shadow-xl
							"
						>
							<div className="mb-4 flex items-center justify-between">
								<div>
									<h3 className="text-[clamp(15px,1vw,18px)] font-semibold text-gray-900">
										Notifications
									</h3>

									<p className="text-[clamp(11px,0.8vw,14px)] text-gray-500">
										{alerts.filter(a => a.status === "ACTIVE").length} items need attention
									</p>
								</div>

								<button className="text-sm font-medium text-blue-600 hover:text-blue-700">
									Mark all read
								</button>
							</div>

							<div className="max-h-[60vh] overflow-y-auto">
								{alerts.length === 0 ? (
									<p className="p-4 text-center text-sm text-gray-500">No recent notifications</p>
								) : (
									alerts.map((alert) => (
										<div key={alert.id} className="mb-2 flex cursor-pointer gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
											<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${alert.status === 'ACTIVE' ? 'bg-red-100' : 'bg-green-100'}`}>
												<AlertTriangle className={`h-5 w-5 ${alert.status === 'ACTIVE' ? 'text-red-600' : 'text-green-600'}`} />
											</div>

											<div>
												<p className="font-medium text-gray-900">
													{alert.type === 'LOW_STOCK' ? 'Low stock alert' : 'Alert'}
												</p>
												<p className="text-sm text-gray-500">
													{alert.message || `${alert.product?.name} has ${alert.currentStock} units left.`}
												</p>
												<p className="mt-1 text-xs text-gray-400">
													{new Date(alert.createdAt).toLocaleDateString()}
												</p>
											</div>
										</div>
									))
								)}
							</div>

							<button
								onClick={() => {
									setShowNotifications(false);
									navigate('/alerts');
								}}
								className="mt-3 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
							>
								View all notifications
							</button>
						</div>
					)}
				</div>

				{/* ================= USER ================= */}

				<div className="relative">
					<div
						ref={userRef}
						onClick={handleUserClick}
						className="group flex cursor-pointer items-center gap-[1vw]"
					>
						<img
							src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=EBF4FF&color=1E40AF`}
							alt={user?.name || "User"}
							className="
								h-[clamp(36px,3.2vw,60px)]
								w-[clamp(36px,3.2vw,60px)]
								rounded-full
								object-cover
								transition-transform
								duration-300
								group-hover:scale-105
							"
						/>

						<div className="hidden leading-tight sm:block">
							<p className="text-[clamp(14px,1.2vw,22px)] font-semibold text-gray-900">
								{user?.name || "User"}
							</p>

							<p className="mt-1 text-[clamp(11px,0.9vw,17px)] text-gray-500 capitalize">
								{user?.role || "User"}
							</p>
						</div>

						<ChevronDown
							className={`
								ml-[0.3vw]
								h-[clamp(16px,1.4vw,24px)]
								w-[clamp(16px,1.4vw,24px)]
								text-gray-500
								transition-transform
								duration-300
								${showUserMenu ? "rotate-180" : ""}
							`}
						/>
					</div>

					{/* User Dropdown */}

					{showUserMenu && (
						<div
							ref={userPanelRef}
							className="
								absolute
								right-0
								top-[calc(100%+15px)]
								z-50
								w-[min(240px,80vw)]
								origin-top-right
								rounded-2xl
								border
								border-gray-200
								bg-white
								p-2
								shadow-xl
							"
						>
							<button
								onClick={() => {
									setShowUserMenu(false);
									navigate('/settings');
								}}
								className="w-full rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-gray-50"
							>
								Profile
							</button>

							<button
								onClick={() => {
									setShowUserMenu(false);
									navigate('/settings');
								}}
								className="w-full rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-gray-50"
							>
								Settings
							</button>

							<div className="my-1 border-t border-gray-100" />

							<button onClick={() => useAuthStore.getState().logout()} className="w-full rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50">
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;