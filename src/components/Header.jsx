import { ShoppingCart, Store } from "lucide-react";

export default function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Store size={22} />
          <span>ShopEasy</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md border">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-2 text-xs bg-black text-white rounded-full px-2 py-0.5">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
