import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import useAuthInfo from "../../../hooks/useAuthInfo";

export default function DiscountSlider() {
  const { medicines: products } = useAuthInfo();

  const discountedProducts = products.filter(
    (product) => product.discount && product.discount > 0
  );

  return (<div className="c-container bg-base-200">
    <div className="discount-slider-container">
      <h1 className="title-section">Discount Products</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        loop={true}
        className="discount-swiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {discountedProducts.map((item) => {
          const price = Number(item.perUnitPrice) || 0;
          const discountedPrice = price * (1 - (item.discount || 0) / 100);

          return (
            <SwiperSlide key={item._id}>
              <Link to={`/product/${item._id}`}>
                <div className="card bg-base-100 my-10 shadow-sm hover:shadow-lg transition duration-300">
                  <figure>
                    <img
                      src={item.imgUrl || "https://via.placeholder.com/200"}
                      alt="Shoes"
                      className="h-48 p-2 rounded-2xl hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {item.itemName.length > 15
                        ? item.itemName.slice(0, 15) + "..."
                        : item.itemName}
                      <div className="badge badge-primary">
                        {item.discount}% OFF
                      </div>
                    </h2>
                    <div className="card-actions justify-end">
                      <span className="old-price"><del>Tk {price.toFixed(2)}</del></span>
                      <span className="new-price">
                        <ins style={{ textDecoration: "none" }} className="text-primary">Tk {discountedPrice.toFixed(2)}</ins>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div></div>
  );
}
