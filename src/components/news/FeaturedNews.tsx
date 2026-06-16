import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/news";

export default function FeaturedNews({
  item,
}: {
  item: NewsItem;
}) {
  return (
    <Link href={`/media/news/${item.slug}`}>

      <div className="relative w-full h-[420px] rounded-xl overflow-hidden mb-10">

        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end">

          <div className="p-8 text-white">

            <h2 className="text-3xl font-bold mb-3">
              {item.title}
            </h2>

            <p className="text-lg opacity-90">
              {item.summary}
            </p>

          </div>

        </div>

      </div>

    </Link>
  );
}
