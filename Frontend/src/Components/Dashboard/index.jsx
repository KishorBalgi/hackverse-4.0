import { useEffect } from "react";
import Card from "./card";
import api from "../../Config";
import { useState } from "react";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    api
      .get("/api/user/activity")
      .then((res) => {
        console.log(res);
        setSales(res.data.data.sales);
        setPurchases(res.data.data.purchases);
      })
      .then((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="m-5">
        <div className="text-3xl font-bold p-2">Sales</div>
        <div className="flex">
          {sales.length !== 0 &&
            sales.map((sale) => {
              return <Card product={sale} />;
            })}
        </div>
      </div>

      <div className="m-5">
        <div className="text-3xl font-bold p-2">Purchases</div>
        <div className="flex">
          {purchases.length != 0 &&
            purchases.map((purchase) => {
              return <Card product={purchase} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
