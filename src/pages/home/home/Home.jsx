import Shop from "../../Shop/Shop";
import Banner from "../banner/Banner";
import CategoryCard from "../categoryCard/CategoryCard";
import CustomFeedback from "../customFeedback/CustomFeedback";
import DeliveryService from "../DeliveryService/DeliveryService";
import DiscountProducts from "../DiscountProducts/DiscountProducts";
import MedicineInquiry from "../MedicineInquiry/MedicineInquiry";

const Home = () => {

  const fromHome = true;

  return (
    <div>
      <Banner />
      <Shop fromHome={fromHome} />
      <CategoryCard />
      <DiscountProducts />
      <CustomFeedback />
    </div>
  );
};
export default Home;
