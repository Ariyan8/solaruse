import Link from "next/link";
import { news } from "@/data/news";
import { newsCategories } from "@/data/newsCategories";

export default function NewsSidebar() {

  return (
    <aside className="sticky top-24">

      <h3 className="text-xl font-bold mb-6">
        دسته‌بندی اخبار
      </h3>

      <ul className="space-y-4">

        {newsCategories.map((category) => {

          const count = news.filter(
            (n) => n.category === category.slug
          ).length;

          return (
            <li key={category.slug}>

              <Link
                href={`/media/news/category/${category.slug}`}
                className="flex justify-between items-center hover:opacity-80 transition"
              >

                <span className={`font-medium ${category.color}`}>
                  {category.title}
                </span>

                <span className="text-gray-400 text-sm">
                  ({count})
                </span>

              </Link>

            </li>
          );
        })}

      </ul>

    </aside>
  );
}
