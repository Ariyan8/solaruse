import { news } from "@/data/news";
import { newsCategories } from "@/data/newsCategories";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {

  const { category } = await params;

  const filteredNews = news.filter(
    (item) => item.category === category
  );

  const categoryInfo = newsCategories.find(
    (c) => c.slug === category
  );

  if (!categoryInfo) {
    return (
      <div className="py-24 text-center">
        دسته‌بندی پیدا نشد
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-white" dir="rtl">

      <div className="max-w-6xl mx-auto">

        {/* عنوان دسته */}
        <div className="mb-20">

          <h1 className={`text-4xl md:text-5xl font-extrabold ${categoryInfo.color}`}>
            {categoryInfo.title}
          </h1>

          <div className="flex items-center mt-4 gap-4">

            <div className="w-20 h-[3px] bg-gray-300"></div>

            <span className="text-gray-500 text-sm">
              {filteredNews.length} خبر
            </span>

          </div>

        </div>

        {/* لیست خبرها */}

        {filteredNews.map((item, index) => (

          <div key={item.slug}>

            <Link href={`/media/news/${item.slug}`}>

              <div className="grid md:grid-cols-2 gap-12 items-center py-16">

                {/* متن */}
                <div className="text-right space-y-4">

                  <h2 className="text-3xl font-bold leading-snug hover:text-blue-600 transition">
                    {item.title}
                  </h2>

                  <div className="text-sm text-gray-500 flex flex-wrap gap-4">

                    <span>{item.date}</span>

                    {item.author && (
                      <span>نویسنده: {item.author}</span>
                    )}

                    {item.source && (
                      <span>منبع: {item.source}</span>
                    )}

                  </div>

                  <p className="text-gray-700 text-lg leading-9">
                    {item.summary}
                  </p>

                </div>

                {/* تصویر */}
                <div className="relative h-[350px] rounded-xl overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition duration-500"
                  />

                </div>

              </div>

            </Link>

            {/* divider حرفه‌ای */}
            {index !== filteredNews.length - 1 && (
              <div className="flex items-center py-8">

                <div className="flex-grow border-t border-gray-200"></div>

                <span className="mx-6 text-gray-400 text-sm tracking-widest">
                  •••
                </span>

                <div className="flex-grow border-t border-gray-200"></div>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}
