import { products } from "@/data/products";
import { notFound } from "next/navigation";

// تعریف نوع داده برای پارامترها
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  // دریافت اسلاگ از پارامترها
  const { slug } = await params;

  // پیدا کردن محصول
  const product = products.find((p) => p.slug === slug);

  // اگر محصول پیدا نشد، نمایش صفحه 404
  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        
        {/* کانتینر عکس با ارتفاع کنترل شده */}
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full w-auto object-contain p-4"
          />
        </div>

        {/* جزئیات محصول */}
        <div className="mt-8 text-right">
          <h1 className="text-3xl font-black text-gray-900">{product.name}</h1>
          
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <span className="text-2xl font-black text-emerald-600">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>

            <button className="rounded-xl bg-gray-900 px-8 py-3 font-bold text-white transition hover:bg-emerald-600">
              افزودن به سبد خرید
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
