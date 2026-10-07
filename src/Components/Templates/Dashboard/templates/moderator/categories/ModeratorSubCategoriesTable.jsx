import { useState } from "react";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import useCategories from "../../../../../../lib/Hooks/useCategories";
import useSubCategories from "../../../../../../lib/Hooks/useSubCategories";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import { removeSubCategory } from "../../../../../../services/category.service";
import Confirm from "../../../../../Common/Confirm";
import Table from "../../../common/Table";
import TableBody from "../../../common/Table/TableBody";
import TableCell from "../../../common/Table/TableCell";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableToolbar from "../../../common/Table/TableToolbar";

const ModeratorSubCategoriesTable = () => {
  const { subCategories, isLoading, refetch, error } = useSubCategories();
  const { categories } = useCategories();

  const [deletingSubCategory, setDeletingSubCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const getParentTitle = (parentId) =>
    categories.find((category) => category._id === parentId)?.title || " - ";

  const handleRemove = async () => {
    setIsDeleting(true);

    try {
      await removeSubCategory(deletingSubCategory._id);
      toast.success("زیردسته‌بندی با موفقیت حذف شد");
      setDeletingSubCategory(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در حذف زیردسته‌بندی");
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
              تمامی زیردسته‌بندی‌ها
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedSubCategory(null);
                setIsOpenForm(true);
              }}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد زیردسته‌بندی</span>
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="">
            <TableCell>عنوان</TableCell>
            <TableCell>لینک</TableCell>
            <TableCell>دسته‌بندی اصلی</TableCell>
            <TableCell>تعداد فیلتر</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="text-zinc-600 *:h-16! font-medium text-xs!">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-400">
                در حال بارگزاری ...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && error && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-500">
                {error || "خطا در دریافت دسته‌بندی‌ها"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && subCategories.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-400">
                هنوز دسته‌بندی‌ای ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            subCategories.map((subCategory) => {
              return (
                <TableRow key={subCategory._id}>
                  <TableCell>{subCategory.title}</TableCell>
                  <TableCell>{subCategory.slug}</TableCell>
                  <TableCell>{getParentTitle(subCategory.parent)}</TableCell>
                  <TableCell>{subCategory.filters?.length}</TableCell>

                  <TableCell>
                    <button
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-md"
                      title="ویرایش"
                      onClick={() => {
                        setSelectedSubCategory(subCategory);
                        setIsOpenForm(true);
                      }}
                    >
                      <BiPencil />
                    </button>

                    <button
                      className="text-red-500 hover:bg-blue-50 p-2 rounded-md"
                      title="حذف"
                      onClick={() => setDeletingSubCategory(subCategory)}
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
        isOpen={!!deletingSubCategory}
        title="حذف دسته‌بندی"
        description={`آیا از حذف زیردسته‌بندی ${deletingSubCategory?.title} مطمئن هستید؟`}
        onConfirm={handleRemove}
        onCancel={() => setDeletingSubCategory(null)}
        isLoading={isDeleting}
      />
      <CreateSubCategoryModal
        isOpen={isOpenForm}
        subCategory={selectedSubCategory}
        onClose={() => {
          setIsOpenForm(false);
          setSelectedSubCategory(null);
        }}
        onSuccess={refetch}
      />
    </>
  );
};

export default ModeratorSubCategoriesTable;
