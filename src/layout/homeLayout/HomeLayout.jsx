import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  return (
    <div>
      <Helmet>
        <title>PillPoint</title>
      </Helmet>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default HomeLayout;
