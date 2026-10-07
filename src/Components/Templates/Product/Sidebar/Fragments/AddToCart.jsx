import { useContext, useState } from "react";
import CartContext from "../../../../../context/CartContext";
import { toast } from "sonner";

const AddToCart = ({
  productId,
  sellerId,
  name,
  slug,
  image,
  price,
  stock,
}) => {
  const { addItem } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCartHandler = async () => {
    if (!sellerId) {
      toast.error("این محصول در حال حاضر فروشنده‌ای ندارد");
      return;
    }

    if (stock <= 0) {
      toast.error("این محصول موجود نیست");
      return;
    }

    setIsSubmitting(true);

    try {
      await addItem({
        productId,
        sellerId,
        quantity: 1,
        name,
        slug,
        image,
        price,
      });

      toast.success("محصول به سبد شما اضافه شد");
    } catch (err) {
      console.log(err);

      toast.error("مشکلی در اضافه کردن محصول وجود دارد");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={addToCartHandler}
      disabled={isSubmitting}
      className=" h-10 text-xs bg-blue-500 text-white w-full rounded-md ring-blue-500/40"
    >
      {isSubmitting ? "در حال افزودن" : "افزودن به سبد خرید"}
    </button>
  );
};

export default AddToCart;
