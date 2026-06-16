"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-[#1A2B4A]">
            طراحی و مدیریت هوشمند سیستم‌های انرژی خورشیدی
          </h1>

          <p className="mt-6 text-lg text-gray-700 leading-8">
            Solaruse پلتفرمی تخصصی برای تحلیل، طراحی و مدیریت پروژه‌های انرژی خورشیدی است
            که با ابزارهای محاسباتی پیشرفته، شما را از مرحله بررسی و طراحی تا اجرای کامل
            سیستم‌های خورشیدی همراهی می‌کند.
          </p>

          <Link
            href="/tools"
            className="inline-block mt-8 bg-[#F5A623] hover:bg-[#E8751A] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            شروع طراحی سیستم خورشیدی شما
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full">
          <Image
            src="/solar-hero.jpg"
            alt="سیستم انرژی خورشیدی"
            width={800}
            height={600}
            className="rounded-2xl object-cover shadow-md"
            priority
          />
        </div>

      </section>


      {/* SERVICES SECTION */}
      <section className="container mx-auto px-6 py-24">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A2B4A]">
          خدمات Solaruse
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#1A2B4A]">
              طراحی دقیق سیستم خورشیدی
            </h3>
            <p className="mt-4 text-gray-600 leading-7">
              محاسبه ظرفیت نیروگاه خورشیدی، انتخاب تجهیزات مناسب،
              شبیه‌سازی تولید انرژی و ارائه نقشه اجرای دقیق سیستم.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#1A2B4A]">
              مدیریت پروژه و مانیتورینگ
            </h3>
            <p className="mt-4 text-gray-600 leading-7">
              مدیریت مراحل طراحی و نصب، پایش عملکرد سیستم‌ها،
              و ثبت لاگ‌های تحلیلی برای بهینه‌سازی بلندمدت.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#1A2B4A]">
              فروش تجهیزات خورشیدی
            </h3>
            <p className="mt-4 text-gray-600 leading-7">
              ارائه پنل‌های خورشیدی، اینورتر، باتری و تجهیزات تخصصی
              با امکان بررسی و مقایسه مشخصات فنی در پلتفرم Solaruse.
            </p>
          </div>

        </div>
      </section>


      {/* ABOUT SECTION */}
      <section className="bg-white py-24">
        <div className="container mx-auto text-center max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4A]">
            چرا Solaruse؟
          </h2>
          <p className="mt-6 text-gray-700 leading-8 text-lg">
            Solaruse با هدف توسعه انرژی‌های تجدیدپذیر و کمک به طراحان و
            مهندسان سیستم‌های خورشیدی ایجاد شده است. 
            با ارائه ابزارهای محاسباتی، تحلیل عملکرد و مدیریت پروژه، 
            مسیر طراحی تا اجرا را برای شما ساده‌تر، سریع‌تر و دقیق‌تر می‌کند.
          </p>
        </div>
      </section>

    </main>
  );
}
