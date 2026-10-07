import { useContext, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import CartContext from "../../../../../context/CartContext";
import { toast } from "sonner";

const ClearBasket = () => {
  const { clearCart, items } = useContext(CartContext);
  const [isClearing, setIsClearing] = useState(false);

  if (items.length === 0) return null;

  const handleClear = async () => {
    setIsClearing(true);

    try {
      await clearCart();
      toast.success("سبد خرید خالی شد");
    } catch {
      //
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleClear}
      disabled={isClearing}
      className="rounded-md  flex-center px-3 py-2  gap-1 hover:bg-red-500/10 text-red-500"
    >
      <HiTrash />
      <span className="text-sm font-semibold">
        {isClearing ? "در حال پاک‌سازی" : "پاک‌سازی سبد خرید"}
      </span>
    </button>
  );
};

export default ClearBasket;
