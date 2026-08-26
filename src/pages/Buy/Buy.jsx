import { useState, useEffect } from "react";
import { getProducts, createTransaction } from "../../api";
import { useNavigate } from "react-router-dom";

function Buy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    productId: "",
    type: "SALE",
    quantity: 1,
    note: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, productId: data[0].id }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "productId" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createTransaction(formData);
      setSuccess(true);
      setFormData((prev) => ({ ...prev, quantity: 1, note: "" }));
    } catch (err) {
      setError(err.message || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Transaction</h2>
          <p className="mt-1 text-sm text-gray-500">
            Use this secret route to manually create transactions.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                Transaction created successfully!
              </div>
            )}

            <div>
              <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <select
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border ring-1 ring-gray-200"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Stock: {product.currentStock})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border ring-1 ring-gray-200"
              >
                <option value="SALE">Sale (Deduct Stock)</option>
                <option value="RECEIPT">Receipt (Add Stock)</option>
                <option value="CONSUMPTION">Consumption (Deduct Stock)</option>
                <option value="ADJUSTMENT">Adjustment</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border ring-1 ring-gray-200"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                Note (Optional)
              </label>
              <input
                type="text"
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border ring-1 ring-gray-200"
                placeholder="E.g., Manual restock"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Submit Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Buy;
