import ProductColors from "./Fragments/ProductColors";
import ProductVariants from "./Fragments/ProductVariants";
import UsefulButtons from "./Fragments/UsefulButtons";

const HeroDetails = ({ name, description, customFields, images }) => {
  return (
    <>
      <section id="product-hero-details">
        <div className="col-span-6 w-full">
          <div className="flex items-center mb-10 justify-end">
            <UsefulButtons />
          </div>
          <div className="grid grid-cols-2 items-start">
            <div className="h-[450px]">
              <img
                src={`https://shopino.iran.liara.run/images/products/${images?.[0]}`}
                alt="Product"
                className="size-full"
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div className="space-y-2">
                  <h1 className="font-bold text-slate-800">{name}</h1>
                  <p className=" text-slate-500 text-xs">{description}</p>
                </div>

                <ProductColors />
              </div>

              <ProductVariants fields={customFields} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroDetails;
