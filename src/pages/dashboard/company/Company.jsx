import axios from "axios";
import Swal from "sweetalert2";
import useAuthInfo from "../../../hooks/useAuthInfo";
import CompanyCard from "./CompanyCard";
import { Helmet } from "react-helmet";

const Company = () => {
  const { company, setRefrash, refrash, user } = useAuthInfo();

  const handleAddCompany = (e) => {
    e.preventDefault();
    const name = e.target.companyName.value;
    const image = e.target.companyLogo.value;
    axios
      .post(
        "https://pill-point-server-one.vercel.app/company",
        {
          companyName: name,
          companyLogo: image,
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Company Name has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefrash(refrash + 1);
          e.target.reset();
          document.getElementById("my_modal_3").close();
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>PillPoint | Add a Company</title>
      </Helmet>
      <div className="p-4">
        <button
          className="btn shadow w-full btn-primary"
          id="xx"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add A Company
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {company &&
          company.map((com) => (
            <CompanyCard key={com._id} com={com}></CompanyCard>
          ))}
      </div>

      {/* form of add company */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-xs">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleAddCompany}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company Name :</legend>
              <input
                type="text"
                className="input i-s"
                placeholder="Company Name"
                name="companyName"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company Logo URL :</legend>
              <input
                type="url"
                className="input i-s"
                placeholder="Company Logo URL"
                name="companyLogo"
                required
              />
            </fieldset>
            <button type="submit" className="btn shadow w-full mt-2 btn-primary">
              Add Company
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
export default Company;
