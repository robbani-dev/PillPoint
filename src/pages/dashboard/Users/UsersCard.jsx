import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthInfo from "../../../hooks/useAuthInfo";

const UsersCard = ({ user }) => {
  const { user: muser } = useAuthInfo();
  const [userType, setUserType] = useState(user.userType);

  const updateUserType = (event) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update !",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const info = {
            email: user.email,
            UpdateUserType: event.target.value,
          };

          axios
            .patch("https://pill-point-server-one.vercel.app/userType", info, {
              headers: {
                Authorization: `Bearer ${muser?.accessToken}`,
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.status === 200) {
                swalWithBootstrapButtons.fire({
                  title: "Updated!",
                  text: "User type has been updated",
                  icon: "success",
                });
                setUserType(event.target.value);
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={user.profilePicture} alt={user.username} />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.username}</div>
              <div
                className={`text-sm font-bold badge badge-primary badge-sm text-center ${
                  user.userType === "Admin" && "text-red-600"
                }`}
              >
                {userType}
              </div>
            </div>
          </div>
        </td>
        <td>
          {user.email}
          <br />
          <span className="badge badge-ghost badge-sm">
            {user.creationTime}
          </span>
        </td>
        <td>
          <select
            defaultValue={user.userType}
            onChange={updateUserType}
            className="select"
            id="user-type"
          >
            <option value={"Customer"}>Customer</option>
            <option value={"Seller"}>Seller</option>
            <option value={"Admin"}>Admin</option>
          </select>
        </td>
        <th>
          <button className="btn btn-ghost btn-xs">Update</button>
        </th>
      </tr>
    </>
  );
};
export default UsersCard;
