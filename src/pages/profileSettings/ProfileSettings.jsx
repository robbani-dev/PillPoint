import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.config";
import useAuthInfo from "../../hooks/useAuthInfo";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthInfo();
  const Navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
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

    updateProfile(auth.currentUser, {
      displayName: data.username,
      photoURL: imgUrl,
    })
      .then(() => {
        const userUpdateInfo = {
          username: data.username,
          email: user.email,
          profilePicture: imgUrl,
        };
        axios
          .patch("https://pill-point-server-one.vercel.app/updateUser", userUpdateInfo, {
            "Content-Type": "application/json",
          })
          .then((response) => {
            if (response.data.matchedCount === 1) {
              setLoading(false);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Update successful.",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              Navigate("/");
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Helmet>
        <title>PillPoint | Update Profile</title>
      </Helmet>
      <div className="card w-80 shadow-xl items-center relative p-4">
        {" "}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 rounded-xl">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className={loading ? "opacity-50 pointer-events-none" : ""}
        >
          <fieldset className="fieldset">
            <label className="label">Username</label>
            <input
              {...register("username", {
                required: true,
                minLength: 6,
                maxLength: 25,
              })}
              type="text"
              className="input i-s"
              placeholder="Username"
              defaultValue={user.displayName}
            />
            {errors.username?.type === "required" && (
              <p className="text-warning">You must have a Username</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-warning">usrenamemin</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="text-warning">usrenamemax</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="label">Select Profile picture</legend>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input i-s"
            />
          </fieldset>

          <fieldset className="py-3 text-center">
            <button className="btn w-full btn-primary" type="submit">
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
