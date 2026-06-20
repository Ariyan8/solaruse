// src/app/kmz/page.tsx
'use client'; // اگر از قبل داشتید، بگذارید بماند
import dynamic from 'next/dynamic';

// این بخش جایگزین import معمولی می‌شود
const KMZCreator = dynamic(
  () => import('@/components/gis/KMZcreator'), 
  { ssr: false } 
);

export default function KMZPage() {
  return (
    <div className="p-4">
      {/* حالا اینجا بدون خطا رندر می‌شود */}
      <KMZCreator /> 
    </div>
  );
}
