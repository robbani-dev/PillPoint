import { GrLanguage } from "react-icons/gr";
import { Link, NavLink } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";

const Links = () => {
  const { user } = useAuthInfo();

  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink to="/branch">Branches</NavLink>
      </li>
      <li>
        <NavLink to="/doctors">Doctors</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      {user && (<>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </li></>
      )}
      {/* <li>
        <details className="py-1 z-9999">
          <summary>
            <GrLanguage />
          </summary>
          <ul className="p-2">
            <li>
              <Link>Bangla</Link>
            </li>
            <li>
              <Link>English</Link>
            </li>
          </ul>
        </details>
      </li> */}
    </>
  );
};
export default Links;
