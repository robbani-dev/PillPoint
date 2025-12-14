import axios from "axios";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import SocialLogin from "../../../components/shared/SocialLogin";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUserWithEmail, loading, setLoading } = use(AuthContext);
  const now = new Date().toString();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const userRegistration = async (data) => {
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

    const newUser = {
      username: data.username,
      email: data.email,
      userType: data.userType,
      profilePicture: imgUrl,
      creationTime: now,
      cart: [],
    };

    createUserWithEmail(data.email, data.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.username,
          photoURL: imgUrl,
        }).then(() => {
          axios
            .post("https://pill-point-server-one.vercel.app/users", newUser)
            .then(function (response) {
              if (response.status === 200) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Sign Up successful.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
                navigate("/");
              }
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="relative card bg-base-200 w-auto md:min-w-xs shrink-0 shadow-2xl">
      <Helmet>
        <title>PillPoint | Register</title>
      </Helmet>
      {/* Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}

      {/* Card content (form + social login) */}
      <div className="card-body opacity-100">
        <form className="fieldset mb-2" onSubmit={handleSubmit(userRegistration)}>
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
          />
          {errors.username?.type === "required" && (
            <p className="text-warning">You must have a Username</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-warning">Username too short</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="text-warning">Username too long</p>
          )}

          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input i-s"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-warning">You do not provide an email address.</p>
          )}

          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input i-s"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Must include uppercase, lowercase, and a number",
                },
              })}
            />
            <div className="absolute right-5 top-1/2 text-lg z-10">
              <button type="button" onClick={showPassword} className="text-primary">
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-warning">{errors.password.message}</p>
          )}

          <label className="label">User Type</label>
          <select
            {...register("userType")}
            defaultValue="Customer"
            className="select i-s"
          >
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
          </select>

          <fieldset className="fieldset">
            <legend className="label">Select Profile Picture</legend>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input i-s"
            />
            <label className="label">Max size 2MB</label>
          </fieldset>

          <div>
            <p>
              Already Have An Account?{" "}
              <Link className="link link-hover text-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
          {/* <div className="border p-1 rounded-sm">
            <p className="italic text-primary">Login Email: admin@pillpoint.com</p>
            <p className="italic text-primary">Login password: Admin2025</p>
          </div> */}

          <button className="btn btn-primary mt-4">Register</button>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};
export default Register;
