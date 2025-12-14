import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthInfo from "../../../hooks/useAuthInfo";
import axios from "axios";
import FormLoading from "../../../components/shared/FormLoading";
import Swal from "sweetalert2";
import MyDedicineCard from "./MyDedicineCard"; // assume this renders <tr> row
import { Helmet } from "react-helmet";

const MyMedicine = () => {
  const { categories, company, user, refrash, setRefrash, myMedicines } =
    useAuthInfo();

  // Add form
  const { register, handleSubmit, reset } = useForm();

  const [addMediLoading, setAddMediLoading] = useState(false);

  // Selected for update (opens update modal when set)
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // ---------- ADD MEDICINE ----------
  const handleAddMedicine = async (data) => {
    setAddMediLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.imageFile[0]);
      const responseOfImgBB = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imgUrl = responseOfImgBB.data.data.display_url;

      // remove imageFile from payload
      // eslint-disable-next-line no-unused-vars
      const { imageFile, ...rest } = data;
      const mediInfo = {
        ...rest,
        imgUrl,
        sellerEmail: user.email,
        sellerName: user.displayName,
      };

      const res = await axios.post(
        "https://pill-point-server-one.vercel.app/medicine",
        mediInfo,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.data?.success) {
        setAddMediLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Medicine Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefrash(refrash + 1);
        reset();
        // close the dialog if it's open
        document.getElementById("my_modal_3")?.close();
      } else {
        throw new Error("Failed to add medicine");
      }
    } catch (err) {
      setAddMediLoading(false);
      console.error(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to Add",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUpdateMedicine = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleCloseUpdateModal = () => setSelectedMedicine(null);

  const UpdateMedicineModal = ({ medicine, onClose }) => {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (medicine) setForm(medicine);
    }, [medicine]);

    if (!medicine) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
      e.preventDefault();

      // basic validation
      if (!form.itemName || !form.perUnitPrice || !form.quantity) {
        Swal.fire({
          icon: "warning",
          title: "Fill required fields",
          text: "Please provide item name, price and quantity.",
        });
        return;
      }

      setLoading(true);
      try {
        const payload = {
          itemName: form.itemName,
          itemGenericName: form.itemGenericName,
          description: form.description,
          category: form.category,
          perUnitPrice: String(form.perUnitPrice),
          quantity: String(form.quantity),
          discount: String(form.discount || "0"),
          imgUrl: form.imgUrl || "",
        };

        // NOTE: using same base path as your add (POST to /medicine).
        // If your backend uses /api/medicines/:id, change URL accordingly.
        const res = await axios.put(
          `https://pill-point-server-one.vercel.app/medicine/${medicine._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Accept both patterns: res.data.success or 200 OK
        if (res.status === 200 && (res.data?.success ?? true)) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Medicine updated",
            showConfirmButton: false,
            timer: 1200,
          });
          // trigger parent refresh / refetch
          setRefrash(refrash + 1);
          onClose();
        } else {
          Swal.fire(
            "Update failed",
            res.data?.message || "Unknown error",
            "error"
          );
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Server error", "Could not update medicine", "error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="modal modal-open">
        <Helmet>
          <title>PillPoint | My Medicines</title>
        </Helmet>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Medicine</h3>

          <form onSubmit={handleUpdateSubmit} className="grid gap-3 mt-3">
            <input
              name="itemName"
              value={form.itemName || ""}
              onChange={handleChange}
              placeholder="Item name"
              className="input input-bordered w-full"
            />
            <input
              name="itemGenericName"
              value={form.itemGenericName || ""}
              onChange={handleChange}
              placeholder="Generic name"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              rows={3}
            />

            <div className="grid grid-cols-3 gap-2">
              <input
                name="perUnitPrice"
                type="number"
                value={form.perUnitPrice || ""}
                onChange={handleChange}
                placeholder="Unit price"
                className="input input-bordered"
              />
              <input
                name="quantity"
                type="number"
                value={form.quantity || ""}
                onChange={handleChange}
                placeholder="Quantity"
                className="input input-bordered"
              />
              <input
                name="discount"
                type="number"
                value={form.discount || ""}
                onChange={handleChange}
                placeholder="Discount %"
                className="input input-bordered"
              />
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={onClose} className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const addToBanner = (bannerMedicine) => {
    axios
      .post(
        "https://pill-point-server-one.vercel.app/bannerReq",
        bannerMedicine
      )
      .then((res) => {
        // console.log("Banner added:", res.data);
        if (res.data.status === "added") {
          Swal.fire({
            title: "Added successfully",
            icon: "success",
          });
        } else if (res.data.status === "already have") {
          Swal.fire({
            title: "Already have in Banner",
            icon: "warning",
          });
        }
      });
  };

  return (
    <div>
      <div className="p-4">
        <button
          className="btn w-full btn-primary"
          onClick={() => document.getElementById("my_modal_3")?.showModal()}
        >
          Add A Medicine
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myMedicines?.length >= 1 &&
              myMedicines.map((myMedicine, index) => (
                <MyDedicineCard
                  index={index}
                  key={myMedicine._id}
                  myMedicine={myMedicine}
                  handleUpdateMedicine={handleUpdateMedicine}
                  addToBanner={addToBanner}
                />
              ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-xs md:w-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {addMediLoading && <FormLoading />}

          <form
            onSubmit={handleSubmit(handleAddMedicine)}
            className="md:grid grid-cols-2 space-x-2"
          >
            {/* left inputs... keep as in your original add form */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Type Your Item Name :</legend>
              <input
                {...register("itemName", { required: true })}
                type="text"
                className="input i-s"
                placeholder="Item Name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Type Your Item Generic Name :
              </legend>
              <input
                {...register("itemGenericName", { required: true })}
                type="text"
                className="input i-s"
                placeholder="Item Generic Name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description :</legend>
              <input
                {...register("description", { required: true })}
                type="text"
                className="input i-s"
                placeholder="Description"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Select Medicine Image :
              </legend>
              <input
                {...register("imageFile", { required: true })}
                type="file"
                accept="image/*"
                className="file-input i-s"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category :</legend>
              <select
                {...register("category", { required: true })}
                defaultValue="Pick a Category"
                className="select i-s"
              >
                <option disabled>Pick a Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id}>{category.categoryName}</option>
                  ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company :</legend>
              <select
                {...register("company", { required: true })}
                defaultValue="Pick a Company"
                className="select i-s"
              >
                <option disabled>Pick a Company</option>
                {company &&
                  company.map((com) => (
                    <option key={com._id}>{com.companyName}</option>
                  ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Mass Unit:</legend>
              <div className="flex items-center space-x-2 border rounded-md px-3 py-2 i-s">
                <input
                  {...register("mass", { valueAsNumber: true, required: true })}
                  type="number"
                  placeholder="Mass"
                  min={0}
                  className="flex-grow outline-none border-none focus:ring-0"
                />
                <select
                  {...register("unit")}
                  defaultValue="MG"
                  className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                >
                  <option value="ML">ML</option>
                  <option value="MG">MG</option>
                  <option value="GM">GM</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price Per Unit :</legend>
              <input
                {...register("perUnitPrice", { required: true })}
                type="text"
                className="input i-s"
                placeholder="Price Per Unit"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Quantity :</legend>
              <input
                {...register("quantity", { required: true })}
                type="number"
                className="input i-s"
                placeholder="Quantity"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Discount % :</legend>
              <input
                {...register("discount", { required: true })}
                type="number"
                className="input  i-s"
                placeholder="Discount"
              />
            </fieldset>

            <button className="btn mt-3 btn-primary shadow w-full md:col-span-2">
              Add Medicine
            </button>
          </form>
        </div>
      </dialog>

      {selectedMedicine && (
        <UpdateMedicineModal
          medicine={selectedMedicine}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
};

export default MyMedicine;
