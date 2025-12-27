import { useState } from "react";
import useAuthInfo from "../../hooks/useAuthInfo";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import ShopCard from "./ShopCard";
import FormLoading from "../../components/shared/FormLoading";

const Shop = ({ fromHome }) => {
  const { medicines, user, refrash, setRefrash, loading, setLoading } =
    useAuthInfo();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // medicines per page
  const [sortBy, setSortBy] = useState(""); // New state for sorting

  // Sorting logic
  const sortedMedicines = [...medicines]?.sort((a, b) => {
    if (sortBy === "priceAsc") return a.perUnitPrice - b.perUnitPrice;
    if (sortBy === "priceDesc") return b.perUnitPrice - a.perUnitPrice;
    if (sortBy === "discount") return b.discount - a.discount;
    if (sortBy === "name") return a.itemName.localeCompare(b.itemName);
    return 0;
  });

  const totalPages = Math.ceil(sortedMedicines?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicines = sortedMedicines?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Quick Add to Cart
  const handleQuickAddToCart = (medicine) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const cartQuantity = 1;
    const medicineId = medicine._id;
    const userEmail = user?.email;

    if (cartQuantity <= medicine.quantity) {
      axios
        .put(
          "https://pill-point-server-one.vercel.app/addtoCart",
          { userEmail, medicineId, cartQuantity },
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.result.modifiedCount === 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Medicine added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
            setRefrash(refrash + 1);
            setLoading(false);
          }
        });
      // .catch((err) => console.log(err));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Available quantity ${medicine.quantity}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <div
      className={`container relative  py-8 ${!fromHome ? "" : ""}`}
    >
      <Helmet>
        <title>PillPoint | Shop</title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h1 className="title-section">Shop Medicines</h1>
          </div>

          {/* Sort Dropdown */}
          {!fromHome && (
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Sort By</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="discount">Discount: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          )}
        </div>
        <div>
          {loading && <FormLoading />}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {currentMedicines?.map((item) => (
                <ShopCard
                  key={item._id}
                  item={item}
                  fromHome={fromHome}
                  handleQuickAddToCart={handleQuickAddToCart}
                ></ShopCard>
              ))}
            </div>

            {/* Pagination Controls */}
            {!fromHome && (
              <div className="flex justify-center items-center gap-2">
                <button
                  className="px-3 py-1 bg-primary text-primary-content rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => setCurrentPage(num + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === num + 1
                        ? " bg-primary text-white"
                        : "bg-base-200"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}

                <button
                  className="px-3 py-1 bg-primary text-primary-content rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
