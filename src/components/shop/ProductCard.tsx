"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const fallbackSrc = "/images/products/placeholder.jpg";
  const [src, setSrc] = useState(product.image || fallbackSrc);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-44 items-center justify-center bg-gray-50 p-2">
        <img
          src={src}
          alt={product.name}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setSrc(fallbackSrc)}
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-black text-emerald-600">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
    </Link>
  );
}
