import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthInfo from "../../../hooks/useAuthInfo";
import axios from "axios";
import Swal from "sweetalert2";
import FormLoading from "../../../components/shared/FormLoading";
import DiscountSlider from "./DiscountProducts";

const ProductPage = () => {
  const { id } = useParams();
  const { user, refrash, setRefrash, medicines, loading, setLoading } = useAuthInfo();
  const product = medicines.find((med) => med._id === id);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true)
    e.preventDefault();
    const userEmail = user?.email;
    if (quantity <= product.quantity) {
      axios
        .put(
          "https://pill-point-server-one.vercel.app/addtoCart",
          {
            userEmail,
            medicineId: product._id,
            cartQuantity: quantity,
          },
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
            setLoading(false)
            navigate("/");
            setRefrash(refrash + 1);
            document.getElementById("my_modal_3").close();
            e.target.reset();
          }
        })
      // .catch((err) => console.log(err));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Available quantity ${product.quantity}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false)
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-500">Product not found</div>
    );
  }

  const price = Number(product.perUnitPrice) || 0;
  const discountedPrice = price * (1 - (product.discount || 0) / 100);

  return (
    // <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">

    // {
    //   loading && <FormLoading />
    // }

    //   <div className="lg:flex lg:gap-8">
    //     {/* Product Image */}
    //     <div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/2 flex justify-center items-center">
    //       <img
    //         src={product.imgUrl || "https://via.placeholder.com/250"}
    //         alt={product.itemName}
    //         className="w-64 h-64 object-cover rounded-xl shadow-md"
    //       />
    //     </div>

    //     {/* Product Details */}
    //     <div className="lg:w-1/2">
    // <h1 className="text-3xl font-bold text-gray-800 mb-2">
    //   {product.itemName}
    // </h1>
    //       <p className="text-gray-600 mb-1">{product.itemGenericName}</p>
    //       <p className="text-sm text-gray-500 mb-3">
    //         Category: {product.category}
    //       </p>

    //       {/* Price */}
    // <div className="flex items-center gap-3 mb-4">
    //   <span className="line-through text-gray-400 text-lg">
    //     Tk {price.toFixed(2)}
    //   </span>
    //   <span className="text-red-600 font-bold text-2xl">
    //     Tk {discountedPrice.toFixed(2)}
    //   </span>
    // </div>

    //       {/* Stock */}
    // {product.stock !== undefined && (
    //   <p
    //     className={`mb-4 font-medium ${product.stock > 0 ? "text-green-700" : "text-red-600"
    //       }`}
    //   >
    //     {product.stock > 0
    //       ? `In Stock: ${product.stock}`
    //       : "Out of Stock"}
    //   </p>
    // )}

    //       {/* Description */}
    // <p className="text-gray-700 mb-4">
    //   {product.description || "No description available."}
    // </p>

    //       {/* Quantity & Add to Cart */}
    // <div className="flex items-center gap-4 mb-4">
    //   <label className="font-medium text-black">Quantity:</label>
    //   <input
    //     type="number"
    //     min="1"
    //     max={product.stock || 100}
    //     value={quantity}
    //     onChange={(e) => setQuantity(Number(e.target.value))}
    //     className="w-20 px-3 py-1 border text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //   />
    // </div>

    // <button
    //   onClick={handleAddToCart}
    //   disabled={product.stock === 0}
    //   className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${product.stock === 0
    //       ? "bg-gray-400 cursor-not-allowed"
    //       : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    //     }`}
    // >
    //   {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    // </button>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="container grid md:grid-cols-2 gap-6">
        {
          loading && <FormLoading />
        }
        <div>
          <img
            src={product.imgUrl || "https://via.placeholder.com/250"}
            alt={product.itemName}
            className=" object-cover rounded-sm shadow-md w-full md:h-[400px] hover:scale-98 transition-transform duration-300"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.itemName}
          </h1>

          {product.stock !== undefined && (
            <p
              className={`mb-4 font-medium ${product.stock > 0 ? "text-green-700" : "text-red-600"
                }`}
            >
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </p>
          )}


          <div className="flex items-center gap-3 mb-4">
            <span className="line-through text-gray-400 text-lg">
              Tk {price.toFixed(2)}
            </span>
            <span className="text-primary font-bold text-2xl">
              Tk {discountedPrice.toFixed(2)}
            </span>
          </div>


          <p className=" mb-4">
            {product.description || "No description available."}
          </p>



          <div className="flex items-center gap-4 mb-4">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock || 100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-1 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>


          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-primary/75 hover:from-primary/75 hover:to-primary transition-colors duration-500"
              }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

        </div>
      </div>
      <DiscountSlider />
    </div>
  );
};

export default ProductPage;
