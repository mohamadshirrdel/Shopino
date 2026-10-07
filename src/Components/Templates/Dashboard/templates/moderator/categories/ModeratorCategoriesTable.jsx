import { useState } from "react";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import useCategories from "../../../../../../lib/Hooks/useCategories";
import { deleteCategory } from "../../../../../../services/category.service";
import Confirm from "../../../../../Common/Confirm";
import Table from "../../../common/Table";
import TableBody from "../../../common/Table/TableBody";
import TableCell from "../../../common/Table/TableCell";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableToolbar from "../../../common/Table/TableToolbar";
import CreateCategoryModal from "./CreateCategoryModal";

const ModeratorCategoriesTable = () => {
  const { categories, isLoading, error, refetch } = useCategories();

  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleRemove = async () => {
    setIsDeleting(true);

    try {
      await deleteCategory(deletingCategory._id);
      toast.success("محصول با موفقیت حذف شد");
      setDeletingCategory(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در حذف دسته‌بندی");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2 className="font-black text-lg text-zinc-800">
              تمامی دسته‌بندی‌ها
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpenForm(true)}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد دسته‌بندی</span>
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="">
            <TableCell>عنوان</TableCell>
            <TableCell>لینک</TableCell>
            <TableCell>تعداد فیلتر</TableCell>
            <TableCell>تعداد زیردسته‌بندی</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="text-zinc-600 *:h-16! font-medium text-xs!">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400">
                در حال بارگزاری ...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && error && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-red-500">
                {error || "خطا در دریافت دسته‌بندی‌ها"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400">
                هنوز دسته‌بندی‌ای ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            categories.map((category) => {
              return (
                <TableRow key={category._id}>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.filters?.length}</TableCell>
                  <TableCell>{category.subCategories?.length}</TableCell>

                  <TableCell>
                    <button
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-md"
                      title="ویرایش"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpenForm(true);
                      }}
                    >
                      <BiPencil />
                    </button>

                    <button
                      className="text-red-500 hover:bg-blue-50 p-2 rounded-md"
                      title="حذف"
                      onClick={() => setDeletingCategory(category)}
                    >
                      <BiTrash />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Confirm
        isOpen={!!deletingCategory}
        title="حذف دسته‌بندی"
        description={`آیا از حذف دسته‌بندی ${deletingCategory?.title} مطمئن هستید؟`}
        onConfirm={handleRemove}
        onCancel={() => setDeletingCategory(null)}
        isLoading={isDeleting}
      />

      <CreateCategoryModal
        isOpen={isOpenForm}
        onClose={() => {
          setIsOpenForm(false);
          setSelectedCategory(null);
        }}
        onSuccess={refetch}
        category={selectedCategory}
      />
    </>
  );
};

export default ModeratorCategoriesTable;
