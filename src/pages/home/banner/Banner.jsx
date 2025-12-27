import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { Link } from "react-router";

const Banner = () => {
  const { banners } = useAuthInfo();

  console.log(banners);

  if (banners.length === 0) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  } else {
    return (
      <div className="min-h-[20vh] lg:min-h-[70vh]">
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {banners
            ?.filter((banner) => banner.approval)
            .map((banner) => (
              <SwiperSlide key={banner._id} className="overflow-hidden">
                <div className="block w-full h-full relative rounded-sm">
                  <img
                    src={banner.imgUrl}
                    alt={banner.itemName}
                    className="w-full max-h-[80vh] object-cover hover:scale-101 transition-transform duration-500"
                  />
                  <Link
                    to={`/product/${banner._id}`}
                    className="md:p-4 absolute bottom-0 md:bottom-10 bg-white/90 w-full shadow-2xl text-center "
                  >
                    <h2 className="text-lg font-bold ">{banner.itemName}</h2>
                    <p className="text-sm text-blue-400">{banner.company}</p>
                    <p
                      className="text-md font-semibold mt-1
                  "
                    >
                      Tk {banner.perUnitPrice}{" "}
                      {banner.discount && banner.discount !== "0" && (
                        <span className="text-primary ml-2">
                          ({banner.discount}% OFF)
                        </span>
                      )}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
  }
};

export default Banner;
