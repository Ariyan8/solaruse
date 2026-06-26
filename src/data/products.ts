export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  category: "package" | "equipment" | "service";
  isFeatured?: boolean;
};

export const products: Product[] = [
  {
    slug: "solar-offgrid-2kw",
    name: "پکیج خورشیدی 2 کیلووات آفگرید",
    shortDescription: "سیستم اقتصادی برای ویلا، باغ و کانکس",
    description:
      "سیستم خورشیدی 2 کیلووات یک راهکار اقتصادی برای تأمین برق ویلا، باغ و کانکس است. این پکیج می‌تواند برق مورد نیاز روشنایی، یخچال، تلویزیون و وسایل سبک را بدون وابستگی به شبکه برق تأمین کند و گزینه‌ای مناسب برای مکان‌هایی است که دسترسی به برق شهری ندارند.",
    price: 120000,
    image: "/images/products/placeholder.jpg",
    category: "package",
    isFeatured: true,
  },
  {
    slug: "solar-offgrid-6kw",
    name: "پکیج خورشیدی 6 کیلووات آفگرید",
    shortDescription: "تأمین برق کامل ویلا و خانه‌های روستایی",
    description:
      "پکیج خورشیدی 6 کیلووات آفگرید برای تأمین برق کامل یک ویلای متوسط یا خانه روستایی طراحی شده است. این سیستم با استفاده از پنل‌های خورشیدی، اینورتر و باتری، برق مورد نیاز لوازم خانگی مانند یخچال، پمپ آب، روشنایی و تجهیزات الکترونیکی را به صورت مستقل از شبکه برق تأمین می‌کند.",
    price: 150000,
    image: "/images/products/placeholder.jpg",
    category: "package",
    isFeatured: true,
  },
  {
    slug: "solar-hybrid-10kw",
    name: "پکیج خورشیدی 10 کیلووات هیبریدی",
    shortDescription: "کاهش هزینه برق + برق اضطراری هنگام قطعی",
    description:
      "پکیج خورشیدی 10 کیلووات هیبریدی ترکیبی از برق خورشیدی، برق شبکه و ذخیره‌سازی باتری است. این سیستم علاوه بر کاهش هزینه برق مصرفی، در زمان قطع برق نیز انرژی مورد نیاز خانه یا محل کار را تأمین می‌کند و گزینه‌ای مناسب برای خانه‌های پرمصرف و واحدهای تجاری است.",
    price: 180000,
    image: "/images/products/placeholder.jpg",
    category: "package",
  },
  {
    slug: "solar-ongrid-15kw",
    name: "پکیج خورشیدی 15 کیلووات آنگرید",
    shortDescription: "مناسب سرمایه‌گذاری و تولید برق خورشیدی",
    description:
      "این پکیج برای تولید برق خورشیدی و تزریق آن به شبکه طراحی شده است. سیستم 15 کیلووات آنگرید گزینه‌ای مناسب برای واحدهای صنعتی، کشاورزی و سرمایه‌گذاران حوزه انرژی خورشیدی است و می‌تواند به کاهش هزینه برق و افزایش بهره‌وری انرژی کمک کند.",
    price: 210000,
    image: "/images/products/placeholder.jpg",
    category: "package",
  },
  {
    slug: "upgrade-ongrid-to-hybrid",
    name: "ارتقاء نیروگاه خورشیدی آنگرید به هیبرید",
    shortDescription: "افزودن باتری و امکان استفاده هنگام قطع برق",
    description:
      "با ارتقاء نیروگاه خورشیدی متصل به شبکه به سیستم هیبریدی، امکان ذخیره انرژی در باتری و استفاده از آن در زمان قطع برق فراهم می‌شود. این راهکار به ویژه برای مناطقی که با قطعی برق مواجه هستند بسیار کاربردی است و بهره‌وری نیروگاه را افزایش می‌دهد.",
    price: 99000,
    image: "/images/products/placeholder.jpg",
    category: "service",
  },
  {
    slug: "lithium-battery-5kwh",
    name: "باتری لیتیومی خورشیدی 5kWh",
    shortDescription: "باتری LiFePO4 با طول عمر بالا برای سیستم خورشیدی",
    description:
      "باتری لیتیومی خورشیدی 5kWh با فناوری LiFePO4 دارای طول عمر بالا، شارژ سریع و ایمنی مناسب است. این باتری برای ذخیره انرژی در سیستم‌های خورشیدی خانگی و صنعتی استفاده می‌شود و می‌تواند پایداری و کارایی سیستم را به طور قابل توجهی افزایش دهد.",
    price: 175000,
    image: "/images/products/placeholder.jpg",
    category: "equipment",
  },
  {
    slug: "solar-structure",
    name: "استراکچر خورشیدی",
    shortDescription: "سازه گالوانیزه برای نصب پنل خورشیدی",
    description:
      "استراکچر خورشیدی گالوانیزه سازه‌ای مقاوم برای نصب ایمن پنل‌های خورشیدی روی زمین یا سقف است. این سازه با طراحی مهندسی و مقاومت بالا در برابر شرایط محیطی، نصب مطمئن و طول عمر بالای سیستم خورشیدی را تضمین می‌کند.",
    price: 265000,
    image: "/images/products/placeholder.jpg",
    category: "equipment",
  },
  {
    slug: "solar-water-heater-200l",
    name: "آبگرمکن خورشیدی 200 لیتری",
    shortDescription: "تأمین آب گرم با انرژی رایگان خورشید",
    description:
      "آبگرمکن خورشیدی 200 لیتری با استفاده از انرژی خورشید آب گرم مصرفی را بدون نیاز به برق یا گاز تأمین می‌کند. این سیستم گزینه‌ای اقتصادی و سازگار با محیط زیست برای منازل و ویلاها بوده و می‌تواند بخش قابل توجهی از هزینه انرژی را کاهش دهد.",
    price: 310000,
    image: "/images/products/placeholder.jpg",
    category: "equipment",
  },
];
