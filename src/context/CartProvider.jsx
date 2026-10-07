import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";
import {
  addGuestCartItem,
  clearGuestCart,
  getGuestCartItems,
  removeGuestCartItem,
  updateGuestCartItem,
} from "../lib/helpers/guestCart";
import {
  addToServerCart,
  getServerCart,
  removeServerCartItem,
  updateServerCartItem,
} from "../services/cart.service";

const normalizeServerItem = (item) => ({
  productId: item.product?._id,
  sellerId: item.seller?._id,
  quantity: item.quantity,
  name: item.product?.name,
  slug: item.product?.slug,
  image: item.product?.images?.[0],
  price: item.discountedPrice ?? item.originalPrice,
});

const CartProvider = ({ children }) => {
  const { user, isLoading: authIsLoading } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServerCart = async () => {
    try {
      const response = await getServerCart();
      const cart = response?.data?.cart;

      setItems((cart?.items || []).map(normalizeServerItem));
    } catch (err) {
 
      if (err?.response?.status === 404) {
        setItems([]);
        return;
      } else {
        console.error("[GetCart]", err);
        toast.error("خطا در دریافت سبد خرید");
      }
    }
  };

  const mergeGuestCartIntoServer = async () => {
    const guestCart = getGuestCartItems();

    if (!guestCart.length) return;

    let failedCount = 0;

    for (const item of guestCart) {
      try {
        await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });
      } catch {
        failedCount += 1;
      }
    }

    clearGuestCart();

    if (failedCount > 0) {
      toast.error(`${failedCount} مورد از سبد قبلی شما اضافه نشد`);
    }
  };
  useEffect(() => {
    if (authIsLoading) return;

    const syncCart = async () => {
      setIsLoading(true);

      if (user) {
        await mergeGuestCartIntoServer();
        await fetchServerCart();
      } else {
        setItems(getGuestCartItems());
      }

      setIsLoading(false);
    };

    syncCart();
  }, [user, authIsLoading]);

  const addItem = async (item) => {
    if (user) {
      try {
        await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });

        await fetchServerCart();
      } catch (err) {
        toast.error("خطا در افزودن به سبد خرید");
        throw err;
      }
    } else {
      setItems(addGuestCartItem(item));
    }
  };
  const updateItem = async (productId, sellerId, quantity) => {
    if (user) {
      try {
        const response = await updateServerCartItem({
          productId,
          sellerId,
          quantity,
        });

        await fetchServerCart();
      } catch (err) {
        if (err.response?.status === 400) {
          return toast.error("تعداد انتخابی بیش از موجودی می‌باشد");
        }

        return toast.error("خطا در بروزرسانی سبد خرید");
      }
    } else {
      setItems(updateGuestCartItem(productId, sellerId, quantity));
    }
  };

  const removeItem = async (productId, sellerId) => {
    if (user) {
      try {
        const response = await removeServerCartItem({ productId, sellerId });
        await fetchServerCart();
      } catch (err) {
        toast.error("خطادر حذف محصول از سبد");
      }
    } else {
      setItems(removeGuestCartItem(productId, sellerId));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        for (const item of items) {
          await removeServerCartItem({
            productId: item.productId,
            sellerId: item.sellerId,
          });
        }

        await fetchServerCart();
      } catch (err) {
        toast.error("خطا در خالی کردن سبد خرید");
      }
    } else {
      setItems(clearGuestCart());
    }
  };

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    itemsCount,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
