import { useState } from "react";
import {
	User,
	Building2,
	Bell,
	SlidersHorizontal,
	Upload,
	Save,
} from "lucide-react";

import useAuthStore from "../../store/authStore";

const sidebarLinks = [
	{ id: "profile", label: "Profile", icon: User },
	{ id: "workspace", label: "Workspace", icon: Building2 },
	{ id: "notifications", label: "Notifications", icon: Bell },
	{ id: "preferences", label: "Preferences", icon: SlidersHorizontal },
];

function Settings() {
	const [activeTab, setActiveTab] = useState("profile");
	const user = useAuthStore((state) => state.user);

	return (
		<div className="min-h-full bg-gray-50 px-4 py-8 md:px-8 text-gray-900">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Settings
				</h1>
				<p className="mt-1 text-sm text-gray-500">
					Manage your profile, preferences and workspace details.
				</p>
			</div>

			<div className="flex flex-col gap-8 md:flex-row">
				{/* Sidebar */}
				<aside className="w-full shrink-0 md:w-64">
					<nav className="flex flex-col gap-1 rounded-2xl bg-white p-3 shadow-sm border border-gray-200">
						{sidebarLinks.map((link) => {
							const Icon = link.icon;
							const isActive = activeTab === link.id;

							return (
								<button
									key={link.id}
									onClick={() => setActiveTab(link.id)}
									className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
										isActive
											? "bg-gray-50 text-gray-900"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									<Icon className="h-4 w-4" />
									{link.label}
								</button>
							);
						})}
					</nav>
				</aside>

				{/* Content Area */}
				<main className="flex-1 space-y-6">
					{/* Currently only implementing the Profile view which contains all 3 cards in the screenshot */}
					{activeTab === "profile" && (
						<>
							{/* Profile Information Card */}
							<div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
								<div className="border-b border-gray-100 p-6 md:p-8">
									<h2 className="text-lg font-bold text-gray-900">
										Profile information
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										Update your account name and profile image.
									</p>

									<div className="mt-6 flex items-center gap-6">
										<div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-50 overflow-hidden">
											<img 
												src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=EBF4FF&color=1E40AF&size=96`} 
												alt={user?.name || "User"}
												className="h-full w-full object-cover" 
											/>
										</div>
										<div>
											<h3 className="text-sm font-semibold text-gray-900">
												Profile image
											</h3>
											<p className="mt-1 text-xs text-gray-500">
												PNG or JPG, up to 5MB
											</p>
											<button className="mt-3 flex h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-gray-600 transition hover:bg-gray-50">
												<Upload className="h-4 w-4" />
											</button>
										</div>
									</div>

									<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
										<div>
											<label className="mb-2 block text-sm font-semibold text-gray-900">
												Full name
											</label>
											<input
												type="text"
												defaultValue={user?.name || ""}
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="mb-2 block text-sm font-semibold text-gray-900">
												Role
											</label>
											<input
												type="text"
												defaultValue={user?.role || ""}
												readOnly
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 capitalize"
											/>
										</div>
										<div className="sm:col-span-2">
											<label className="mb-2 block text-sm font-semibold text-gray-900">
												Email address
											</label>
											<input
												type="email"
												defaultValue={user?.email || ""}
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
											/>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-end gap-3 p-6">
									<button className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
										Cancel
									</button>
									<button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
										<Save className="h-4 w-4" />
										Save changes
									</button>
								</div>
							</div>

							{/* Bottom Cards: Workspace & Notifications */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{/* Workspace Card */}
								<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
									<h2 className="text-lg font-bold text-gray-900">
										Workspace
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										Details shown across your inventory workspace.
									</p>

									<div className="mt-6 space-y-5">
										<div>
											<label className="mb-2 block text-sm font-semibold text-gray-900">
												Workspace name
											</label>
											<input
												type="text"
												defaultValue="SmartStock Inc."
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="mb-2 block text-sm font-semibold text-gray-900">
												Currency
											</label>
											<div className="relative">
												<select
													defaultValue="USD"
													className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
												>
													<option value="USD">USD — US Dollar</option>
													<option value="EUR">EUR — Euro</option>
													<option value="GBP">GBP — British Pound</option>
												</select>
												<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
													<svg
														className="h-4 w-4 fill-current"
														viewBox="0 0 20 20"
													>
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Notifications Card */}
								<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
									<h2 className="text-lg font-bold text-gray-900">
										Notifications
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										Choose which inventory updates you receive.
									</p>

									<div className="mt-6 space-y-6">
										<div className="flex items-start justify-between gap-4">
											<div>
												<h3 className="text-sm font-semibold text-gray-900">
													Email notifications
												</h3>
												<p className="text-xs text-gray-500">
													Receive daily activity summaries
												</p>
											</div>
											<label className="relative inline-flex cursor-pointer items-center">
												<input
													type="checkbox"
													defaultChecked
													className="peer sr-only"
												/>
												<div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
											</label>
										</div>

										<div className="flex items-start justify-between gap-4">
											<div>
												<h3 className="text-sm font-semibold text-gray-900">
													Low stock alerts
												</h3>
												<p className="text-xs text-gray-500">
													Get notified when stock is below threshold
												</p>
											</div>
											<label className="relative inline-flex cursor-pointer items-center">
												<input
													type="checkbox"
													defaultChecked
													className="peer sr-only"
												/>
												<div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
											</label>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}

export default Settings;
