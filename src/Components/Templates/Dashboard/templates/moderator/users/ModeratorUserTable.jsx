import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaBan } from "react-icons/fa";
import { toast } from "sonner";
import { useUsers } from "../../../../../../lib/Hooks/useUsers";
import { banUser } from "../../../../../../services/user.service";
import { toPersianDate } from "./../../../../../../lib/helpers/date";
import Table from "../../../common/Table/index";
import TableToolbar from "../../../common/Table/TableToolbar";
import TableHead from "../../../common/Table//TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableCell from "../../../common/Table/TableCell";
import TableBody from "../../../common/Table/TableBody";
import Confirm from "../../../../../Common/Confirm";
import Pagination from "./../../../../../Common/Pagination";

// Mapping
const roleLabels = {
  USER: "کاربر",
  ADMIN: "مدیر",
  SELLER: "فروشنده",
};

const ModeratorUserTable = () => {
  const { users, isLoading, error, pagination, setPage, page, refetch } =
    useUsers(10);

  const [banningUser, setbanningUser] = useState(null);
  const [isBan, setIsBan] = useState(false);

  const handleBan = async () => {
    setIsBan(true);

    try {
      await banUser(banningUser._id);
      toast.success("کاربر با موفقیت بن شد");
      setbanningUser(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در بن کردن کاربر");
    } finally {
      setIsBan(false);
    }
  };

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2 className="font-black text-lg text-zinc-800">تمامی کاربران</h2>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="">
            <TableCell>نام</TableCell>
            <TableCell>نقش</TableCell>
            <TableCell>شماره تماس</TableCell>
            <TableCell>آدرس</TableCell>
            <TableCell>کد ملی</TableCell>
            <TableCell>تاریخ ثبت نام</TableCell>
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
                {error || "خطا در دریافت کاربران"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && users.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400">
                کاربری وجود ندارد.{" "}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            users.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableCell>{user.name || "ثبت نشده"}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => roleLabels[role]).join(" - ")}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.addresses[0] || "ثبت نشده"}</TableCell>
                  <TableCell>{user.nationalCode || "ثبت نشده"}</TableCell>
                  <TableCell>{toPersianDate(user.createdAt)}</TableCell>

                  <TableCell>
                    <button
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-md"
                      title="ویرایش"
                    >
                      <BiPencil />
                    </button>

                    <button
                      className="text-red-500 hover:bg-blue-50 p-2 rounded-md"
                      title="بن"
                      onClick={() => setbanningUser(user)}
                    >
                      <FaBan />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} setPage={setPage} page={page} />

      <Confirm
        isOpen={!!banningUser}
        title="بن کردن کاربر"
        description={`آیا از بن کردن کاربر ${banningUser?.name || "ناشناس"} مطمئن هستید؟ این عمل غیر قابل بازگشت است`}
        onConfirm={handleBan}
        onCancel={() => setbanningUser(null)}
        isLoading={isBan}
      />
    </>
  );
};

export default ModeratorUserTable;
