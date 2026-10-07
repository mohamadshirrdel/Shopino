const ProductCardSkeleton = () => {
  return (
    <article className="w-full h-64 space-y-3 flex pl-2 justify-between flex-col animate-pulse">
      <header className="h-[300px] flex-center w-full">
        <div className="w-full h-full bg-neutral-200 rounded-lg" />
      </header>

      <main className="h-full space-y-2">
        <div className="h-3.5 bg-neutral-200 rounded w-full" />
        <div className="h-3.5 bg-neutral-200 rounded w-2/3" />
      </main>

      <footer className="mt-auto! flex items-end justify-end">
        <div className="flex-ic gap-1">
          <div className="h-4 w-20 bg-neutral-200 rounded" />
          <div className="h-4 w-8 bg-neutral-200 rounded" />
        </div>
      </footer>
    </article>
  );
};

export default ProductCardSkeleton;
