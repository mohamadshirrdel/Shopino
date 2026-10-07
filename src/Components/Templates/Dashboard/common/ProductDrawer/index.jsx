import { useEffect, useState } from "react";
import { toast } from "sonner";

import useCategories from "../../../../../lib/Hooks/useCategories";
import useProductForm from "../../../../../lib/Hooks/useProductForm";
import createProduct from "../../../../../services/product.service";
import Drawer from "../Drawer";
import CascadeCategories from "./CascadeCategories";
import DynamicKeyValueFields from "./DynamicKeyValueFields";
import ImageUploadField from "./ImageUploadField";
import ProductDrawerInput from "./ProductDrawerInput";
import SellerFields from "./SellerFields";

const ProductDrawer = ({ isOpen, onToggle }) => {
  const { isLoading: categoriesIsLoading, categories } = useCategories();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    form,
    setField,
    selectedCategory,
    handleCategoryChange,
    addSeller,
    removeSeller,
    updateSeller,
    addPair,
    removePair,
    updatePair,
    setImages,
    buildFormData,
    resetForm,
  } = useProductForm();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    if (!form.name.trim() || !form.slug.trim() || !form.description.trim()) {
      setError("عنوان، توضیحات و لینک محصول الزامی هستن");
      return;
    }

    if (!selectedCategory) {
      setError("انتخاب دسته‌بندی محصول الزامی هست");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createProduct(buildFormData());
      resetForm();
      toast.success("محصول با موفقیت ایجاد شد");
      onToggle();
    } catch (err) {
      setError(err.response?.data?.message || "خطایی رخ داده است");
    }

    setIsSubmitting(false);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onToggle} title="ایجاد محصول">
      <div className="space-y-4 mt-5 px-6">
        <ProductDrawerInput
          label="عنوان محصول"
          placeholder="مثلا آیفون 17 پرومکس"
          type="text"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />

        <ProductDrawerInput
          label="لینک"
          placeholder="iphone-17-promax"
          type="text"
          value={form.slug}
          onChange={(e) => setField("slug", e.target.value)}
        />

        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-zinc-700 mb-2 block"
          >
            دسته‌بندی
          </label>

          {categoriesIsLoading ? (
            <p className="text-xs text-zinc-400">در حال بارگزاری ...</p>
          ) : (
            <CascadeCategories
              categories={categories}
              onChange={handleCategoryChange}
            />
          )}
        </div>

        <SellerFields
          sellers={form.sellers}
          onAdd={addSeller}
          onChange={updateSeller}
          onRemove={removeSeller}
        />

        <DynamicKeyValueFields
          title="ویژگی های فیلتری"
          items={form.filterValues}
          onAdd={() => addPair("filterValues")}
          onRemove={(index) => removePair("filterValues", index)}
          onChange={(index, key, value) =>
            updatePair("filterValues", index, key, value)
          }
        />

        <DynamicKeyValueFields
          title="ویژگی های سفارشی"
          items={form.customFields}
          onAdd={() => addPair("customFields")}
          onRemove={(index) => removePair("customFields", index)}
          onChange={(index, key, value) =>
            updatePair("customFields", index, key, value)
          }
        />

        <ImageUploadField files={form.images} onChange={setImages} />

        <div>
          <label htmlFor="product-details"> توضیحات محصول </label>
          <textarea
            id="product-details"
            name=""
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 mt-2 min-h-30 pt-2"
            placeholder=" آیفون - ارزان - تخفیف دار"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/15 ">
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-linear-to-t from-blue-600 text-sm to-blue-500 text-white"
          >
            {isSubmitting ? "در حال ثبت ..." : "ایجاد محصول"}
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
