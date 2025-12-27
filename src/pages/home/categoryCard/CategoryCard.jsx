/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import CategorryCardCard from "./CategorryCardCard";
import { useEffect, useState } from "react";

const cetegoryCard = () => {
  const { categories } = useAuthInfo();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    axios.get("https://pill-point-server-one.vercel.app/medicineCountsByCategory").then((res) => {
      const countMap = {};
      res.data.forEach((item) => {
        countMap[item._id] = item.count;
      });
      setCounts(countMap);
    });
  }, []);

  return (
    <div className="c-container bg-base-200">
      <h1 className="title-section">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {Array.isArray(categories) && categories.map((cate) => (
          <CategorryCardCard key={cate._id} cate={cate} count={counts[cate.categoryName] || 0}></CategorryCardCard>
        ))}
      </div>
    </div>
  );
};
export default cetegoryCard;
