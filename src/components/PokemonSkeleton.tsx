export default function PokemonSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-neutral-800 p-4 md:p-6 bg-neutral-900/40 space-y-4">
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-xl bg-neutral-800" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 bg-neutral-800 rounded" />
          <div className="h-4 w-56 bg-neutral-800 rounded" />
          <div className="h-4 w-32 bg-neutral-800 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-800 p-4 bg-neutral-950/40 h-28"
          />
        ))}
      </div>
    </div>
  );
}
