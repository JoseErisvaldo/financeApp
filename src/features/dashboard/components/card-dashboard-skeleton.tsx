export function CardDashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-2xl border p-6 shadow-sm bg-white">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-40 rounded bg-muted" />

            <div className="h-8 w-28 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
