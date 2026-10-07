import { BiDollar, BiHome } from "react-icons/bi";
import { BsBox2, BsShop } from "react-icons/bs";
import { FaTruckArrowRight, FaUser } from "react-icons/fa6";
import NavItem from "../../Common/Sidebar/fragments/NavItem";

const ModeratorLinks = () => {
  return (
    <>
      <NavItem
        bgColor="bg-zinc-500"
        iconColor="text-zinc-500"
        icon={<BiHome />}
        href="/dashboard/moderator/home"
        label="پیشخوان"
      />
      <NavItem
        bgColor="bg-green-500"
        iconColor="text-green-500"
        icon={<BiHome />}
        href="/dashboard/moderator/categories"
        label="دسته بندی محصولات"
      />
      <NavItem
        bgColor="bg-yellow-500"
        iconColor="text-yellow-500"
        icon={<BsBox2 />}
        href="/dashboard/moderator/products"
        label="محصولات"
      />
      <NavItem
        bgColor="bg-orange-500"
        iconColor="text-orange-500"
        icon={<FaTruckArrowRight />}
        href="/dashboard/moderator/orders"
        label="سفارشات"
      />
      <NavItem
        bgColor="bg-blue-500"
        iconColor="text-blue-500"
        icon={<FaUser />}
        href="/dashboard/moderator/users"
        label="کاربران"
      />
      <NavItem
        bgColor="bg-green-500"
        iconColor="text-green-500"
        icon={<BsShop />}
        href="/dashboard/moderator/sellers"
        label="فروشنده‌ها"
      />
      <NavItem
        bgColor="bg-red-500"
        iconColor="text-red-500"
        icon={<BiDollar />}
        href="/dashboard/moderator/offs"
        label="تخفیفات"
      />
    </>
  );
};

export default ModeratorLinks;
