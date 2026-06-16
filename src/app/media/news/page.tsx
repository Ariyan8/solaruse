import Link from "next/link";
import Image from "next/image";
import { news } from "@/data/news";

export default function NewsPage() {

  return (
    <div className="min-h-screen py-24 px-6 bg-white" dir="rtl">

      <div className="max-w-6xl mx-auto">

        {news.map((item, index) => (

          <div key={item.slug}>

            <Link href={`/media/news/${item.slug}`}>

              <div className="grid md:grid-cols-2 gap-12 items-center py-16">

                {/* متن */}
                <div className="text-right space-y-4">

                  <h2 className="text-3xl font-bold">
                    {item.title}
                  </h2>

                  {/* اطلاعات خبر */}
                  <div className="text-sm text-gray-500 flex flex-wrap gap-4">

                    <span>{item.date}</span>

                    {item.author && (
                      <span>نویسنده: {item.author}</span>
                    )}

                    {item.source && (
                      <span>منبع: {item.source}</span>
                    )}

                    {item.category && (
                      <span>دسته: {item.category}</span>
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
                    className="object-cover"
                  />

                </div>

              </div>

            </Link>

            {/* جداکننده حرفه‌ای */}
            {index !== news.length - 1 && (
              <div className="flex items-center py-8">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-6 text-gray-400 text-sm">•••</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}
