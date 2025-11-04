import { useState } from "react";
import useAuthInfo from "../../hooks/useAuthInfo";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import ShopCard from "./ShopCard";
import FormLoading from "../../components/shared/FormLoading";

const Shop = ({ fromHome }) => {
  const { medicines, user, refrash, setRefrash, loading, setLoading } = useAuthInfo();

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

    setLoading(true)
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
            setLoading(false)
          }
        })
      // .catch((err) => console.log(err));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Available quantity ${medicine.quantity}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false)
    }
  };


  return (

    <div className="contain relative">
      <Helmet>
        <title>PillPoint | Shop</title>
      </Helmet>
      <h1 className="titles">
        Shop Medicines
      </h1>

      {
        loading && <FormLoading />
      }

      {/* Sort Dropdown */}
      {
        !fromHome &&

        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 rounded  border bg-blue-500"
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="discount">Discount: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      }
      {/* <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-base-200">
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Company</th>
              <th className="border px-3 py-2">Price (Tk)</th>
              <th className="border px-3 py-2">Discount (%)</th>
              <th className="border px-3 py-2">Quick Add</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines?.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border px-3 py-2">
                  <img
                    src={item.imgUrl}
                    alt={item.itemName}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="border px-3 py-2">{item.itemName}</td>
                <td className="border px-3 py-2">{item.company}</td>
                <td className="border px-3 py-2">
                  {parseFloat(item.perUnitPrice).toFixed(2)}
                </td>
                <td className="border px-3 py-2">{item.discount}</td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => handleQuickAddToCart(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {
          currentMedicines?.map((item) => <ShopCard key={item._id} item={item} fromHome={fromHome} handleQuickAddToCart={handleQuickAddToCart}></ShopCard>)
        }
      </div>



      {/* Pagination Controls */}
      {
        !fromHome && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              className="px-3 py-1 bg-base-200 rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 rounded ${currentPage === num + 1
                  ? "bg-blue-500 text-white"
                  : "bg-base-200"
                  }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 bg-base-200 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )
      }

    </div>
  );
};

export default Shop;
