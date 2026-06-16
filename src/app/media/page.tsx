import Link from "next/link";
import { FiVideo, FiHeadphones, FiTrendingUp } from "react-icons/fi";

export default function MediaPage() {
  return (
    <div className="min-h-screen py-28 px-6 bg-gradient-to-b from-gray-100 to-gray-50 text-right" dir="rtl">

      <div className="max-w-6xl mx-auto">

        {/* هدر صفحه */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            مرکز رسانه و ارتباطات
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            دسترسی سریع به محتواهای خبری، صوتی و تصویری مجموعه.  
            تمامی بخش‌ها با معماری رسانه‌ای استاندارد و به‌روز طراحی شده‌اند.
          </p>

          {/* خط تزئینی */}
          <div className="w-24 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* کارت‌ها */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* اتاق خبر */}
          <Link
            href="/media/news"
            className="relative group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray-200 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* افکت نور */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 
                            group-hover:opacity-100 transition duration-500"></div>

            <FiTrendingUp className="text-blue-600 group-hover:text-blue-500 mb-6" size={48} />

            <h2 className="text-3xl font-extrabold mb-5 text-blue-800 group-hover:text-blue-600 transition-colors">
              اتاق خبر
            </h2>

            <p className="text-gray-700 leading-9 text-lg relative z-10">
              جدیدترین اخبار، بیانیه‌های رسمی و گزارش از مراسم‌ها و رویدادها.
            </p>
          </Link>

          {/* استودیو پادکست */}
          <Link
            href="/media/podcast"
            className="relative group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray-200 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* افکت نور */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-transparent opacity-0 
                            group-hover:opacity-100 transition duration-500"></div>

            <FiHeadphones className="text-emerald-600 group-hover:text-emerald-500 mb-6" size={48} />

            <h2 className="text-3xl font-extrabold mb-5 text-emerald-800 group-hover:text-emerald-600 transition-colors">
              استودیو پادکست
            </h2>

            <p className="text-gray-700 leading-9 text-lg relative z-10">
              گفتگوهای تحلیلی، روایت‌های تخصصی و برنامه‌های شنیداری با کیفیت بالا.
            </p>
          </Link>

          {/* کتابخانه تصویری */}
          <Link
            href="/media/gallery"
            className="relative group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray-200 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* افکت نور */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-transparent opacity-0 
                            group-hover:opacity-100 transition duration-500"></div>

            <FiVideo className="text-amber-600 group-hover:text-amber-500 mb-6" size={48} />

            <h2 className="text-3xl font-extrabold mb-5 text-amber-800 group-hover:text-amber-600 transition-colors">
              کتابخانه تصویری
            </h2>

            <p className="text-gray-700 leading-9 text-lg relative z-10">
              مستندهای کوتاه، گزارش‌های تصویری، تیزرها و گالری عکس رسمی مجموعه.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
