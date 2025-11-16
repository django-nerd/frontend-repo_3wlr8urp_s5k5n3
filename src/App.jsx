import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";
const uidKey = "guest_uid";

function uid() {
  const existing = localStorage.getItem(uidKey);
  if (existing) return existing;
  const v = Math.random().toString(36).slice(2);
  localStorage.setItem(uidKey, v);
  return v;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const userId = useMemo(() => uid(), []);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/${userId}`);
      const data = await res.json();
      setCart(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const handleAdd = async (product) => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: product.id, quantity: 1 }),
      });
      await loadCart();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await res.json();
      if (data?.id) {
        alert(`Order placed! Total: $${data.total}`);
        await loadCart();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cart.reduce((a, c) => a + c.quantity, 0)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Featured Products</h1>
          <button
            onClick={placeOrder}
            disabled={cart.length === 0 || loading}
            className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Place Order
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-gray-500">No products yet. Add via backend or seed data.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        )}

        <section className="mt-10 bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-3">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>{item.product_id}</span>
                  <span className="text-sm text-gray-500">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
