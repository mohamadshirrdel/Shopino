import MiniProduct from "./Fragments/MiniProduct";
import AddToCart from "./Fragments/AddToCart";
import NoticeDescription from "./Fragments/NoticeDescription";
import Price from "./Fragments/Price";
import Counseling from "./Fragments/Counseling";

const Sidebar = ({ sellers, product }) => {
  const firstSeller = product?.sellers[0];
  const image = product?.images[0];

  return (
    <aside className="col-span-2 w-full rounded-xl border border-neutral-200 max-h-max sticky top-5 p-5 space-y-5">
      <MiniProduct image={image} name={product?.name} />
      <NoticeDescription />
      <Price price={sellers && sellers[0].price} />

      <AddToCart
        productId={product?._id}
        sellerId={firstSeller?.seller?._id}
        name={product?.name}
        slug={product?.slug}
        price={firstSeller?.price}
        stock={firstSeller?.stock}
        image={image}
      />

      <Counseling />
    </aside>
  );
};

export default Sidebar;
