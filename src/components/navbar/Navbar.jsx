import { use } from "react";
import Links from "../shared/Links";
import Logo from "../shared/logo";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Link, NavLink, useNavigate } from "react-router";

const Navbar = ({ dashboard }) => {
  const { user, logOut, userFromMongo, cartCost } = use(AuthContext);
  const navigate = useNavigate();
  // console.log(userFromMongo);
  return (
    <div className="navbar bg-primary opacity-[95%] shadow-sm md:px-[6vw] text-primary-content sticky top-0 z-10">
      <div className="navbar-start">
        <div className={`dropdown ${dashboard && "hidden"}`}>
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Links />
          </ul>
        </div>
        <p
          className={`${dashboard && "hidden"
            }  border border-transparent  hover:bg-transparent transition-all duration-300 text-xl`}
        >
          <Logo />
        </p>
        <label
          htmlFor="my-drawer-2"
          className={`btn btn-ghost drawer-button lg:hidden ${dashboard || "hidden"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </label>
      </div>
      <div className={`navbar-center hidden ${dashboard || "lg:flex"}`}>
        <ul className="menu menu-horizontal px-1">
          <Links />
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <div className="flex-none">
              <div className="dropdown dropdown-end mr-4 bg-base-100 rounded-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary hover:text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm bg-secondary absolute -top-2 px-1 indicator-item border-0 text-primary">
                      {userFromMongo?.cart?.length
                        ? userFromMongo.cart.length
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg text-primary font-bold">
                      {userFromMongo?.cart?.length
                        ? userFromMongo.cart.length
                        : 0}{" "}
                      Items
                    </span>
                    <span className="text-secondary">Subtotal: ৳{" "}{cartCost}/=</span>
                    <div className="card-actions">
                      <Link to="/dashboard/cart" className="btn btn-primary btn-block">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full border border-secondary">
                        <img
                          alt={user?.displayName}
                          src={
                            user?.photoURL
                              ? user.photoURL
                              : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div >
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content rounded-box text-secondary-content bg-secondary  mt-3 w-52 p-2 shadow"
                  >
                    <li className="hover:bg-primary rounded-sm">
                      <Link to="/dashboard/settings" className="justify-between">
                        Update Profile
                      </Link>
                    </li>
                    <li className="hover:bg-primary rounded-sm">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="hover:bg-primary rounded-sm">
                      <button
                        onClick={() => {
                          logOut();
                          navigate("/");
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul></div>
              </div>
            </div>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/login" className="btn btn-outline rounded-full">
                Join Us
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default Navbar;
