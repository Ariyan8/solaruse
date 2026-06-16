import { news } from "@/data/news";
import { notFound } from "next/navigation";
import Image from "next/image";
import NewsCard from "@/components/news/NewsCard";

export default async function NewsPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = news.find((item) => item.slug === slug);

  if (!post) return notFound();

  const relatedNews = news
    .filter(
      (item) =>
        item.category === post.category &&
        item.slug !== post.slug
    )
    .slice(0, 2);

  return (
    <article className="bg-white p-8 rounded-xl shadow" dir="rtl">

      {/* عنوان خبر */}
      <h1 className="text-3xl font-bold mb-6 leading-relaxed">
        {post.title}
      </h1>

      {/* اطلاعات خبر */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">

        <span>تاریخ: {post.date}</span>

        {post.source && (
          <span>منبع: {post.source}</span>
        )}

        {post.author && (
          <span>نویسنده: {post.author}</span>
        )}

      </div>

      {/* تصویر خبر */}
      {post.image && (
        <div className="relative w-full h-[420px] mb-10 rounded-xl overflow-hidden">

          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 900px"
            className="object-cover"
            priority
          />

        </div>
      )}

      {/* متن خبر */}
      <div className="text-lg leading-9 text-gray-700 whitespace-pre-line text-justify">

        {post.content}

      </div>

      {/* اخبار مرتبط */}
      {relatedNews.length > 0 && (

        <div className="mt-16">

          <h3 className="text-2xl font-bold mb-8">
            اخبار مرتبط
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {relatedNews.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}

          </div>

        </div>

      )}

    </article>
  );
}
