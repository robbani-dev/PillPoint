import { Link } from "react-router";

const CategorryCardCard = ({ cate, count }) => {
  return (
    <Link
      to={`/categoryMedicine/${cate.categoryName}`}
      className="card bg-base-100  shadow-sm hover:shadow-lg transition-shadow duration-200 group overflow-hidden shadow-primary"
    >
      <figure className="overflow-hidden">
        <img
          src={cate.categoryImageUrl}
          alt={cate.categoryName}
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
      </figure>
      <div className="card-body transition-all duration-300 ">
        <h2 className="card-title transition-all duration-300 group-hover:text-primary">
          {cate.categoryName}
        </h2>
        <p>Quantity: <span className="transition-all duration-300 group-hover:text-primary group-hover:font-bold">{count}</span></p>
      </div>
    </Link>
  );
};

export default CategorryCardCard;
