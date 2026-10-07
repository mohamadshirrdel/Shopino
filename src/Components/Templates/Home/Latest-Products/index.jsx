import React from "react";
import { Link } from "react-router";
import ProductCard from "../../../Common/Cards/ProductCard";
import SectionTitle from "../../../Common/SectionTitle";
import { useProducts } from "./../../../../lib/Hooks/useProducts";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const LatestProducts = () => {
  const { products, error, isLoading } = useProducts();

  return (
    <section className="container my-[50px]">
      <SectionTitle
        text="جدیدترین محصولات"
        action={
          <Link
            to="/products"
            className="text-sm text-blue-500 hover:underline"
          >
            مشاهده همه محصولات
          </Link>
        }
      />
      <div className="mt-10 w-full border rounded-2xl p-4 border-neutral-300">
        {isLoading && (
          <Swiper slidesPerView={5} spaceBetween={20}>
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!isLoading && error && (
          <p className="col-span-5 text-center text-red-500 py-8">{error}</p>
        )}

        {!isLoading && products.length && (
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            loop
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {products.map((product) => (
              
                <SwiperSlide key={product._id}>
                  <ProductCard {...product} />
                </SwiperSlide>
           
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;
