import PageLabel from "../../../../Components/Templates/Dashboard/ui/PageLabel";
import ModeratorCategoriesTable from "../../../../Components/Templates/Dashboard/templates/moderator/categories/ModeratorCategoriesTable";
import ModeratorSubCategoriesTable from "../../../../Components/Templates/Dashboard/templates/moderator/categories/ModeratorSubCategoriesTable";

const ModeratorCategories = () => {
  return (
    <div className="space-y-10">
      <PageLabel label="مدیریت دسته‌بندی های فروشگاه" />
      <ModeratorCategoriesTable />
      <ModeratorSubCategoriesTable />
    </div>
  );
};

export default ModeratorCategories;
