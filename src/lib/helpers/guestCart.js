const GUEST_CART_KEY = "guest_cart";

export const getGuestCartItems = () => {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveGuestCartItems = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  return items;
};

export const isSameCartItem = (item, productId, sellerId) =>
  item.productId === productId && item.sellerId === sellerId;

export const addGuestCartItem = ({
  productId,
  sellerId,
  quantity,
  name,
  slug,
  image,
  price,
}) => {
  const items = getGuestCartItems();

  const existing = items.find((item) =>
    isSameCartItem(item, productId, sellerId),
  );

  let updatedItems;

  if (existing) {
    updatedItems = items.map((item) =>
      isSameCartItem(item, productId, sellerId)
        ? { ...item, quantity: item.quantity + 1, price }
        : item,
    );
  } else {
    updatedItems = [
      ...items,
      { productId, sellerId, quantity, name, slug, image, price },
    ];
  }

  const newItems = saveGuestCartItems(updatedItems);
  return newItems;
};

export const updateGuestCartItem = (productId, sellerId, quantity) => {
  const items = getGuestCartItems();

  const updatedItems =
    quantity <= 0
      ? items.filter((item) => !isSameCartItem(item, productId, sellerId))
      : items.map((item) =>
          isSameCartItem(item, productId, sellerId)
            ? { ...item, quantity }
            : item,
        );

  return saveGuestCartItems(updatedItems);
};

export const removeGuestCartItem = (productId, sellerId) => {
  const items = getGuestCartItems();

  const updatedItems = items.filter(
    (item) => !isSameCartItem(item, productId, sellerId),
  );

  return saveGuestCartItems(updatedItems);
};

export const clearGuestCart = () => saveGuestCartItems([]);
