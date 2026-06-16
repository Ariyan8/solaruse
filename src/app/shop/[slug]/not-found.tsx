// src/app/shop/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" dir="rtl">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          محصول پیدا نشد
        </h2>
        <p className="text-gray-500 mt-3 leading-7">
          لینک اشتباه است یا این محصول حذف شده است.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-xl font-bold"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </div>
  );
}
