"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const menu = [
    { name: "خانه", href: "/" },
    { name: "فروشگاه", href: "/shop" },
    { name: "ساخت فایل KMZ", href: "/kmz" },
    { name: "مشاوره", href: "/consulting" },
    { name: "بازی و سرگرمی", href: "/gamification" },
    { name: "پروژه‌ها", href: "/projects" },
    {
      name: "رسانه",
      href: "/media",
      submenu: [
        { name: "اتاق خبر", href: "/media/news" },
        { name: "استودیو پادکست", href: "/media/podcast" },
        { name: "کتابخانه تصویری", href: "/media/gallery" },
      ],
    },
    { name: "تماس", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-[#F5A623] to-[#E8751A] text-white shadow-lg relative z-50">
      <div className="w-full flex items-center justify-center py-12 px-10">
        
        {/* منوی اصلی */}
        <div className="flex items-center text-[22px] font-semibold">
          {menu.map((item, index) => (
            <div key={item.href} className="flex items-center">
              
              {/* بررسی اینکه آیا آیتم زیرمنو دارد یا خیر */}
              {item.submenu ? (
                <div className="relative group">
                  {/* آیتم اصلی رسانه */}
                  <Link
                    href={item.href}
                    className="hover:text-gray-200 transition duration-300 flex items-center gap-1"
                  >
                    {item.name}
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* پنل کشویی (Dropdown) */}
                  <div className="absolute right-0 mt-2 w-56 bg-white text-[#1A2B4A] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-6 py-4 text-[18px] hover:bg-orange-50 hover:text-[#E8751A] transition-colors border-b border-gray-50 last:border-0 text-right"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* آیتم‌های معمولی بدون زیرمنو */
                <Link
                  href={item.href}
                  className="hover:text-gray-200 transition duration-300"
                >
                  {item.name}
                </Link>
              )}

              {/* جداکننده (به جز آخرین آیتم) */}
              {index < menu.length - 1 && (
                <span className="mx-10 text-white/60">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
