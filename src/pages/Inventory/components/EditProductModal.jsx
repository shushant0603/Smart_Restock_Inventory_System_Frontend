import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useInventoryStore } from "../../../store/useInventoryStore";

export default function EditProductModal({ isOpen, onClose, product }) {
  const { editProduct } = useInventoryStore();
  const [currentStock, setCurrentStock] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setCurrentStock(product.currentStock);
      setMinimumStock(product.minimumStock);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await editProduct(product.id, {
        currentStock: Number(currentStock),
        minimumStock: Number(minimumStock),
      });
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to edit product");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Product Stock</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Updating stock for: <span className="font-semibold">{product.name}</span>
        </p>

        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Current Stock</label>
            <input
              type="number"
              required
              min="0"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Minimum Threshold</label>
            <input
              type="number"
              required
              min="0"
              value={minimumStock}
              onChange={(e) => setMinimumStock(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
