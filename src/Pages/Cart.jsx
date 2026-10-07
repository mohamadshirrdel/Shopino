import { useContext } from "react";
import Checkout from "../Components/Templates/Cart/Checkout";
import CartProduct from "../Components/Templates/Cart/Content/Fragments/CartProduct";
import CartTitle from "../Components/Templates/Cart/Content/Fragments/CartTitle";
import ClearBasket from "../Components/Templates/Cart/Content/Fragments/ClearBasket";
import { EmptyBasket } from "../Components/Templates/Cart/EmptyBasket";
import CartContext from "./../context/CartContext";

const CartPage = () => {
  const { items, isLoading } = useContext(CartContext);

  console.log(items);

  if (isLoading) {
    return (
      <div className="container my-10 text-center text-slate-400">
        در حال بارگذاری سبد خرید...
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyBasket />;
  }

  return (
    <main id="cart-page" className="my-10 container grid grid-cols-9 gap-5">
      <div id="cart-content" className="col-span-6">
        <div className="flex-between">
          <CartTitle />
          <ClearBasket />
        </div>

        <div id="cart-products-container" className=" space-y-4 mt-2">
          {items.map((item, index) => (
            <CartProduct key={index} {...item} />
          ))}
        </div>
      </div>
      <Checkout />
    </main>
  );
};

export default CartPage;
