import { useContext } from "react";
import CartContext from "../../../../../context/CartContext";
CartContext;

const CartTitle = ({ productsLength = 0 }) => {
  const { itemsCount } = useContext(CartContext);

  return (
    <div className="flex-ic gap-2">
      <p className="text-lg font-bold text-slate-700">
        <strong> سبد خرید شما</strong>
      </p>
      <p className="text-slate-600 ">
        ({`${itemsCount.toLocaleString("fa-IR")} محصول`})
      </p>
    </div>
  );
};

export default CartTitle;
