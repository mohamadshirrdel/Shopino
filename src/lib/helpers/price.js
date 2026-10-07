export const getDisplayPrice = (sellers) => {
  if (!sellers || sellers.length === 0) return null;

  const price = sellers.map((seller) => seller.price);
  const minPrice = Math.min(...price);

  return {
    price: minPrice,
    hasMultipleSellers: sellers.length > 1,
  };
};

export const formatPrice = (price) => price.toLocaleString("fa-IR");
