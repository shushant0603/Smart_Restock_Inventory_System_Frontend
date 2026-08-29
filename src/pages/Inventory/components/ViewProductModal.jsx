import { X } from "lucide-react";
import ProductStatusBadge from "./ProductStatusBadge";

export default function ViewProductModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  // Generate a mock SKU based on the ID if not present in the model
  const generatedSku = product.sku || `SKU00${product.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          
          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 font-mono">{generatedSku}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Category</p>
              <p className="font-medium text-gray-900">{product.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <div className="mt-1">
                <ProductStatusBadge currentStock={product.currentStock} minimumStock={product.minimumStock} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Current Stock</p>
              <p className="text-2xl font-bold text-gray-900">{product.currentStock}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Min Threshold</p>
              <p className="text-2xl font-bold text-gray-900">{product.minimumStock}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
              <p className="font-medium text-gray-900">${product.price}</p>
            </div>
            {product.supplier && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Supplier</p>
                <p className="font-medium text-gray-900">{product.supplier.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
