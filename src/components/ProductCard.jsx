import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 border border-gray-100">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price?.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900">
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
