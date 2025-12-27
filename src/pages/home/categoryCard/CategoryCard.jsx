/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import CategorryCardCard from "./CategorryCardCard";
import { useEffect, useState } from "react";

const cetegoryCard = () => {
  const { categories } = useAuthInfo();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    axios
      .get("https://pill-point-server-one.vercel.app/medicineCountsByCategory")
      .then((res) => {
        const countMap = {};
        res.data.forEach((item) => {
          countMap[item._id] = item.count;
        });
        setCounts(countMap);
      });
  }, []);

  return (
    <div className="bg-base-200 py-8 flex flex-col gap-4 rounded-2xl">
      <div className="container ">
        <h1 className="title-section">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {Array.isArray(categories) &&
            categories.map((cate) => (
              <CategorryCardCard
                key={cate._id}
                cate={cate}
                count={counts[cate.categoryName] || 0}
              ></CategorryCardCard>
            ))}
        </div>
      </div>
    </div>
  );
};
export default cetegoryCard;
