import { useEffect, useReducer, useState } from "react";
import { HiX } from "react-icons/hi";
import { toast } from "sonner";

import { filtersReducer } from "../../../../../../lib/reducers/category/filterReducer";

import useCategories from "../../../../../../lib/Hooks/useCategories";
import useSubCategoryForm from "../../../../../../lib/Hooks/useSubCategoryForm";
import FiltersEditor from "./FiltersEditor";
const CreateSubCategoryModal = ({
  isOpen,
  onClose,
  subCategory,
  onSuccess,
}) => {
  const { categories } = useCategories();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("");
  const [filters, dispatchFilters] = useReducer(filtersReducer, []);

  const { submit, error, isSubmitting } = useSubCategoryForm(() => {
    toast.success(
      subCategory
        ? "زیردسته‌بندی با موفقیت ویرایش شد"
        : "زیردسته‌بندی با موفقیت ایجاد شد",
    );

    onSuccess();
    onClose();
  });

  useEffect(() => {
    if (!isOpen) return;

    if (subCategory) {
      setTitle(subCategory.title || "");
      setSlug(subCategory.slug || "");
      setDescription(subCategory.description || "");
      setParent(subCategory.parent || "");
      dispatchFilters({
        type: "filters/set",
        payload: subCategory.filters || [],
      });
    } else {
      setTitle("");
      setSlug("");
      setDescription("");
      setParent("");

      dispatchFilters({
        type: "filters/reset",
      });
    }
  }, [isOpen, subCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !description.trim()) {
      toast.error("عنوان، slug و توضیحات الزامی هستند");
      return;
    }

    if (!parent) {
      toast.error("لطفا دسته بندی را انتخاب کنید !");
      return;
    }

    await submit({
      subCategoryId: subCategory?._id,
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      parent,
      filters,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-5 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-800">
            {subCategory ? "ویرایش زیردسته‌بندی" : "ایجاد زیردسته‌بندی"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100"
          >
            <HiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              عنوان
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 w-full rounded-md border border-zinc-300 px-3 outline-none focus:border-blue-500"
              placeholder="مثلاً لپ تاپ"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Slug
            </label>

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="h-10 w-full rounded-md border border-zinc-300 px-3 outline-none focus:border-blue-500"
              placeholder="مثلاً laptop"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              توضیحات
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 w-full resize-none rounded-md border border-zinc-300 p-3 outline-none focus:border-blue-500"
              placeholder="توضیحات زیردسته‌بندی..."
            />
          </div>

          {/* Parent */}

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              دسته‌بندی اصلی
            </label>

            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="h-10 w-full rounded-md border border-zinc-300 px-3 outline-none focus:border-blue-500"
            >
              <option value="">انتخاب دسته‌بندی</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <FiltersEditor filters={filters} dispatch={dispatchFilters} />

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-md bg-blue-500 px-5 text-sm font-medium text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "در حال ذخیره..."
                : subCategory
                  ? "ویرایش"
                  : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubCategoryModal;
