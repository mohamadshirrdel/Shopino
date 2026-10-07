const Pagination = ({ pagination, page, setPage }) => {
  return (
    pagination &&
    pagination.totalPages > 1 && (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded-md primary-border text-sm disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          قبلی
        </button>

        <span className="text-sm text-zinc-500">
          صفحه {pagination.page} از {pagination.totalPages}
        </span>

        <button
          className="px-3 py-1 rounded-md primary-border text-sm disabled:opacity-40"
          disabled={page >= pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          بعدی
        </button>
      </div>
    )
  );
};

export default Pagination;
