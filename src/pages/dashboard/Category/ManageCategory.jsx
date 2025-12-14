import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import Swal from "sweetalert2";
import Categories from "./Categories";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
  const { user, refrash, setRefrash } = useAuthInfo();
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const categoryName = e.target.category_name.value;
    const imageFile = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    // ******************************************************************************************
    const responseOfImgBB = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const imgUrl = responseOfImgBB.data.data.display_url;
    // ******************************************************************************************
    // console.log(categoryName, imgUrl);

    axios
      .post(
        "https://pill-point-server-one.vercel.app/category",
        {
          categoryName,
          categoryImageUrl: imgUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          document.getElementById("my_modal_3").close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your category has been Added",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefrash(refrash + 1);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>PillPoint | Catygory</title>
      </Helmet>
      <div className="p-4">
        <button
          className="btn btn-primary w-full hover:shadow"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add A New Category.
        </button>
      </div>

      <div className="p-4">
        <Categories />
      </div>

      {/* Adda categorry modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-xs">
          <form method="dialog" onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="Category name"
              className="input i-s"
              name="category_name"
            />
            <legend className="label">Select Profile Picture</legend>
            <input
              type="file"
              accept="image/*"
              className="file-input i-s"
              name="image"
            />
            <label className="label block">Max size 2MB</label> <br />
            <div className="flex justify-between">
              <button className="btn btn-primary" type="submit">
                Add Category
              </button>

              <button
                type="button"
                className="btn btn-error"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};
export default ManageCategory;
