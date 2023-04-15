import { useEffect } from "react";
import Card from "./card";
import api from "../../Config";
import { useState } from "react";

const Dashboard = () => {
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        api.get("/api/user/useractivity")
            .then(res => {
                setSales(res.data.sales);
                setPurchases(res.data.purchases);
            })
            .then(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <>
            <div className="m-5">
                <div className="text-3xl font-bold p-2">
                    Sales
                </div>
                <div className="flex">
                    <Card product={{ title: "hey", description: "hey", price: 34, quantity: 4, dateOfHarvest: "02/04/2003" }} />
                    {sales.map((sale) => {
                        return <Card product={sale} />
                    })}
                </div>
            </div>

            <div className="m-5">
                <div className="text-3xl font-bold p-2">
                    Purchases
                </div>
                <div className="flex">
                    <Card product={{ title: "hey", description: "hey", price: 34, quantity: 4, dateOfHarvest: "02/04/2003" }} />

                    {purchases.map((purchase) => {
                        return <Card product={purchase} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard;