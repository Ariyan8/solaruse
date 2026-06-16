import NewsSidebar from "@/components/news/NewsSidebar";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-4 gap-10">

        <main className="lg:col-span-3">
          {children}
        </main>

        <aside className="lg:col-span-1">
          <NewsSidebar />
        </aside>

      </div>

    </div>
  );
}
