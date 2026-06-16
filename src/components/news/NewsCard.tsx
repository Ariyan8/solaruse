import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/news";

export default function NewsCard({
  item,
}: {
  item: NewsItem;
}) {
  return (
    <Link href={`/media/news/${item.slug}`}>

      <div className="flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">

        {/* تصویر خبر */}
        <div className="relative w-32 h-24 min-h-[96px] flex-shrink-0 overflow-hidden rounded-lg">

          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="128px"
            className="object-cover"
          />

        </div>

        {/* متن خبر */}
        <div className="flex flex-col justify-between">

          <h3 className="font-bold text-lg leading-snug hover:text-blue-600 transition">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {item.summary}
          </p>

          <span className="text-xs text-gray-400">
            {item.date}
          </span>

        </div>

      </div>

    </Link>
  );
}
