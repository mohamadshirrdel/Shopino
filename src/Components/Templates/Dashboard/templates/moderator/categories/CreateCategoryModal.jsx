import { useReducer, useState, useEffect } from "react";
import { toast } from "sonner";
import { filtersReducer } from "../../../../../../lib/reducers/category/filterReducer";
import { useCategoryForm } from "../../../../../../lib/Hooks/useCategoryForm";
import Modal from "./../../../common/Modal";
import FiltersEditor from "./FiltersEditor";

const CreateCategoryModal = ({ isOpen, onClose, onSuccess, category }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [filters, dispatchFilters] = useReducer(filtersReducer, []);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setIconFile(null);

    dispatchFilters({
      type: "filters/reset",
    });
  };

  useEffect(() => {
    if (!category) {
      return;
    }

    setTitle(category.title || "");
    setSlug(category.slug || "");
    setDescription(category.description || "");

    dispatchFilters({ type: "filters/set", payload: category.filters || [] });
  }, [category]);

  const { error, isSubmitting, submit } = useCategoryForm(() => {
    toast.success(
      category
        ? "دسته‌بندی با موفقیت ویرایش شد"
        : "دسته‌بندی جدید با موفقیت ایجاد شد",
    );
    resetForm();
    onClose();
    onSuccess();
  });

  const handleSubmit = async () => {
    if (!title.trim() || !slug.trim() || !description.trim()) {
      toast.error("عنوان، لینک و توضیحات الزامی هستن");
      return;
    }

    await submit({
      categoryId: category?._id,
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      iconFile,
      filters,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      title={category ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-zinc-700 block mb-1">عنوان</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-700 block mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-700 block mb-1">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 text-sm rounded-md outline-none primary-border px-3 pt-2"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-700 block mb-1">
            آیکون (اختیاری)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIconFile(e.target.files[0] || null)}
          />
        </div>

        <FiltersEditor filters={filters} dispatch={dispatchFilters} />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-600 text-sm"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50"
          >
            {isSubmitting
              ? category
                ? "در حال ویرایش ..."
                : "در حال ثبت ..."
              : category
                ? "ویرایش"
                : "ثبت"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
