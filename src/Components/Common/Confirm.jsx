const Confirm = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return isOpen ? (
    <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-sm">
        <h3 className="font-bold text-zinc-800">{title}</h3>
        <p className="text-sm text-zinc-500 mt-2">{description}</p>

        <div className="flex items-center justify-end gap-2 mt-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-600 text-sm"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm disabled:opacity-50"
          >
            {isLoading ? "در حال حذف" : "حذف کن"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Confirm;
