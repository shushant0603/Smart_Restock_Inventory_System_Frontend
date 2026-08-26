import { useEffect } from "react";
import { io } from "socket.io-client";
import AppRoutes from "./routes/AppRoutes";
import { useInventoryStore } from "./store/useInventoryStore";
import { useDashboardStore } from "./store/dashboardStore";

const socket = io(import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE || "http://localhost:3000");

const App = () => {
  const updateProductStock = useInventoryStore((state) => state.updateProductStock);
  const addAlert = useDashboardStore((state) => state.addAlert);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to backend Socket.IO:", socket.id);
    });

    socket.on("stockUpdated", (data) => {
      console.log("Real-time stock update received:", data);
      updateProductStock(data.productId, data.currentStock);
    });

    socket.on("lowStockAlert", (data) => {
      console.log("Real-time alert received:", data);
      addAlert({
        id: Date.now(), // Fallback ID for local real-time rendering
        productId: data.productId,
        type: "LOW_STOCK",
        message: data.message || `Low stock alert for ${data.name}`,
        currentStock: data.currentStock,
        status: "ACTIVE",
        createdAt: data.timestamp || new Date().toISOString(),
        product: { name: data.name }
      });
    });

    return () => {
      socket.off("connect");
      socket.off("stockUpdated");
      socket.off("lowStockAlert");
    };
  }, [updateProductStock, addAlert]);

  return <AppRoutes />;
};

export default App;
