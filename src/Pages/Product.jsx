import { useParams } from "react-router";
import ProductComments from "../Components/Templates/Product/Content/Comments";
import Description from "../Components/Templates/Product/Content/Description";
import HeroDetails from "../Components/Templates/Product/Content/HeroDetails";
import RelatedProducts from "../Components/Templates/Product/Content/RelatedProducts";
import Sidebar from "../Components/Templates/Product/Sidebar";
import useProduct from "../lib/Hooks/useProduct";

const ProductPage = () => {
  const { productSlug } = useParams();

  const { product, isLoading, error } = useProduct(productSlug);

  return (
    <main
      id="product-content"
      className="w-[95%] mx-auto grid grid-cols-8 gap-5  my-10"
    >
      <section className="col-span-6 space-y-10  *:p-5 *:border *:border-neutral-200  *:rounded-xl">
        <HeroDetails {...product} image={product?.images?.[0]} />
        <Description {...product} />
        <RelatedProducts {...product} />
        <ProductComments productId={product?._id} {...product} />
      </section>
      <Sidebar
        product={product}
        image={product?.images?.[0]}
        sellers={product?.sellers}
        name={product?.name}
      />
    </main>
  );
};
export default ProductPage;
