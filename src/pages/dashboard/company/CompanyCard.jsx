const CompanyCard = ({com}) => {
  return (
    <div className="card shadow-sm bg-primary hover:bg-pink-400 p-2 transition-all duration-300">
      <figure className="relative">
        <img
          src={com.companyLogo}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-primary-content">{com.companyName}</h2>
      </div>
    </div>
  );
};
export default CompanyCard;
