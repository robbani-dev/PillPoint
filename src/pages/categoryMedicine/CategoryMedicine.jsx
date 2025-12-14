import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CategoryMedicineCard from "./CategoryMedicineCard";
import useAuthInfo from "../../hooks/useAuthInfo";
import Swal from "sweetalert2";

const CategoryMedicine = () => {
  const { user, refrash, setRefrash } = useAuthInfo();
  const { categoryName } = useParams();
  const [categoryMedicines, setCategoryMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cartMedicine, setCartMedicine] = useState(null);
  const navigate = useNavigate()

  const handleAddToCart = (e) => {

    if (!user){
      navigate("/login")
    }

    e.preventDefault();
    const cartQuantity = parseInt(e.target.quantity.value);
    const medicineId = cartMedicine._id;
    const userEmail = user?.email;
    if (cartQuantity <= cartMedicine.quantity) {
      axios
        .put(
          "https://pill-point-server-one.vercel.app/addtoCart",
          {
            userEmail,
            medicineId,
            cartQuantity,
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
        title: `Available quantity ${cartMedicine.quantity}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`https://pill-point-server-one.vercel.app/medicineByCate?category=${categoryName}`)
      .then((res) => setCategoryMedicines(res.data));
  }, [categoryName]);

  return (
    <>
      {categoryMedicines?.length >= 1 ? (
        <div className="overflow-x-auto c-container b-p">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Per Unit Price</th>
                <th>Available Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryMedicines.map((medicine) => (
                <CategoryMedicineCard
                  key={medicine._id}
                  medicine={medicine}
                  onShowInfo={setSelectedMedicine}
                  setCartMedicine={setCartMedicine}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Link to="/" className="flex justify-center py-4">
          <div className="card bg-base-100 border w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                There are no items in this category currently. Coming soon!{" "}
              </h2>
            </div>
            <figure>
              <img
                src="https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg"
                alt="Shoes"
              />
            </figure>
          </div>
        </Link>
      )}

      {/* Modal for view the medicine */}
      <dialog id="medicine_modal" className="modal">
        <div className="modal-box max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
              ✕
            </button>
          </form>

          {selectedMedicine && (
            <div className="card bg-base-100 shadow-xl border-2 border-blue-400">
              <figure>
                <img
                  src={selectedMedicine.imgUrl}
                  alt={selectedMedicine.itemName}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{selectedMedicine.itemName}</h2>
                <p className="text-sm text-gray-500">
                  {selectedMedicine.itemGenericName}
                </p>
                <p className="text-xs text-gray-400">
                  {selectedMedicine.company}
                </p>

                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedMedicine.category}
                  </p>
                  <p>
                    <span className="font-semibold">Unit:</span>{" "}
                    {selectedMedicine.mass} {selectedMedicine.unit}
                  </p>
                  <p>
                    <span className="font-semibold">Available Quantity:</span>{" "}
                    {selectedMedicine.quantity}
                  </p>
                </div>

                <p className="mt-2 text-sm">{selectedMedicine.description}</p>

                <div className="card-actions justify-between items-center mt-3">
                  <span className="text-lg font-bold text-primary ">
                    {selectedMedicine.perUnitPrice} ৳
                  </span>
                  <button
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                      setCartMedicine(selectedMedicine);
                    }}
                    className="btn btn-sm btn-primary shadow"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* Modal for add To cart */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-xs">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={handleAddToCart}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Quantity</legend>
              <input
                type="number"
                id="quantity"
                className="input i-s"
                placeholder="Quantity"
                name="quantity"
                required
              />
            </fieldset>
            <button className="btn shadow my-3 btn-primary">Add to Cart</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CategoryMedicine;
