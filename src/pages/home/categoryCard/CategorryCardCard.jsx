import { Link } from "react-router";

const CategorryCardCard = ({ cate, count }) => {
  return (
    <Link
      to={`/categoryMedicine/${cate.categoryName}`}
      className="card bg-base-100 image-full shadow-sm hover:shadow-lg transition-shadow duration-200 group overflow-hidden shadow-blue-400"
    >
      <figure className="overflow-hidden">
        <img
          src={cate.categoryImageUrl}
          alt={cate.categoryName}
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
      </figure>
      <div className="card-body bg-black/0 transition-colors duration-300 ">
        <h2 className="card-title transition-colors duration-300 group-hover:text-yellow-300">
          {cate.categoryName}
        </h2>
        <p>Quantity: {count}</p>
      </div>
    </Link>
  );
};

export default CategorryCardCard;
