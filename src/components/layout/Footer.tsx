export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white mt-8">

      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 gap-6">

        <div>
          <h3 className="text-base font-bold mb-2">Solaruse</h3>
          <p className="text-gray-300 text-xs">
            پلتفرم تخصصی انرژی خورشیدی و خدمات مهندسی.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">
            لینک‌ها
          </h4>

          <ul className="space-y-1 text-gray-300 text-xs">
            <li>خانه</li>
            <li>فروشگاه</li>
            <li>پروژه‌ها</li>
            <li>تماس</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">
            تماس با ما
          </h4>

          <p className="text-gray-300 text-xs">
            info@solaruse.com
          </p>

          <p className="text-gray-300 text-xs">
            +989000000000
          </p>
        </div>

      </div>

      <div className="text-center py-2 border-t border-gray-700 text-gray-400 text-xs">
        © 2026 Solaruse
      </div>

    </footer>
  );
}
