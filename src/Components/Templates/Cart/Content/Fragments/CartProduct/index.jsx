import { useState, useContext } from "react";
import Title from "./Elements/Title";
import Variants from "./Elements/Variants";
import Entity from "./Elements/Entity";
import CartContext from "../../../../../../context/CartContext";

const IMAGE_BASE_URL = "https://shopino.iran.liara.run/images/products/";

const CartProduct = ({
  sellerId,
  productId,
  image,
  name,
  slug,
  quantity,
  price,
}) => {
  const { updateItem } = useContext(CartContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantituChange = async (newQuantity) => {
    if (newQuantity < 0) return;

    setIsUpdating(true);

    try {
      await updateItem(productId, sellerId, newQuantity);
    } catch {
      console.log("err");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <article className="w-full p-8 border rounded-xl border-slate-200  flex flex-col justify-between h-[414px]">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="space-y-5">
          <Title text={name} />
          <Variants />
        </div>
        <div className="flex-center">
          <img
            src={`${IMAGE_BASE_URL}/${image}`}
            alt="Product"
            className="max-h-[168px]"
          />
        </div>
      </div>

      <div className="w-full flex-between px-10 h-20 rounded-xl border border-slate-200 bg-slate-50">
        <Entity
          isUpdating={isUpdating}
          count={quantity}
          onCountChange={handleQuantituChange}
        />

        <div>
          <div className="flex-ic gap-1">
            <p className="text-xl">
              <strong>{Number(price).toLocaleString("fa-IR")}</strong>
            </p>
            <span>تومان</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
