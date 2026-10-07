import PageLabel from "../../../../Components/Templates/Dashboard/ui/PageLabel";
import ModeratorUserTable from "../../../../Components/Templates/Dashboard/templates/moderator/users/ModeratorUserTable";

const ModeratorUsers = () => {
  return (
    <div className="space-y-10">
      <PageLabel label="مدیریت کاربران فروشگاه" />
      <ModeratorUserTable />
    </div>
  );
};

export default ModeratorUsers;
