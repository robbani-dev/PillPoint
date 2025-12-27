import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/authContext/AuthContext";
import SocialLogin from "../../../components/shared/SocialLogin";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
  const { logIn } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const userLogin = (data) => {
    const email = data.email;
    const password = data.password;
    logIn(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
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
    <div className="card bg-base-200 w-auto md:min-w-xs shrink-0 shadow-2xl">
      <Helmet>
        <title>PillPoint | Login</title>
      </Helmet>
      <div className="card-body">
        <form className="fieldset" onSubmit={handleSubmit(userLogin)}>
          <label className="label">Email</label>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            className="input i-s"
            placeholder="Email"
            // defaultValue="admin@pillpoint.com"
          />
          {errors.email?.type === "required" && (
            <p className="text-warning">You do not provide an email address.</p>
          )}
          <div className="relative z-50">
            <label className="label">Password</label><br />
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
            <p className="text-warning overflow-hidden">
              {errors.password.message}
            </p>
          )}
          <Link to="/forgot" className="link link-hover text-primary">
            Forgot password?
          </Link>
          <button className="btn btn-primary">Login</button>
        </form>
        <div>
          <p>
            Don't Have An Account?{" "}
            <Link className="link link-hover text-primary" to="/register">
              Register.
            </Link>
          </p>
          <div className="border p-1 rounded-sm hidden">
            <p className="italic text-primary">Login Email: admin@pillpoint.com</p>
            <p className="italic text-primary">Login password: Admin2025</p>
          </div>
        </div>
      </div>
      <SocialLogin />
    </div>
  );
};
export default Login;
