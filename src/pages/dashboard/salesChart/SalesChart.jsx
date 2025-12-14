import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import useAuthInfo from "../../../hooks/useAuthInfo";



export default function SalesChart() {
    const { orders } = useAuthInfo();
    // Aggregate sales data per seller
    const sellerSales = {};


    const totalSales = orders.reduce((acc, order) => {
        let orderTotal = 0;

        if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
                const price = parseFloat(item.perUnitPrice) || 0;
                const qty = parseFloat(item.cartQuantity) || 0;
                const discount = parseFloat(item.discount) || 0;
                const itemTotal = price * qty * (1 - discount / 100);
                orderTotal += itemTotal;
            });
        }

        // Fallback: if order.amount exists, use that too
        if (order.amount && !isNaN(order.amount)) {
            orderTotal = parseFloat(order.amount);
        }

        return acc + orderTotal;
    }, 0);


    orders.forEach((order) => {
        order.items.forEach((item) => {
            const seller = item.sellerName;
            const saleAmount =
                parseFloat(item.perUnitPrice) * parseInt(item.cartQuantity);

            sellerSales[seller] = (sellerSales[seller] || 0) + saleAmount;
        });
    });

    // Convert into array for recharts
    const chartData = Object.entries(sellerSales).map(([seller, total]) => ({
        seller,
        total: parseFloat(total.toFixed(2)),
    }));


    return (
        <div className="w-full mt-10 md:mt-20 max-w-5xl mx-auto shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
                💊 PillPoint Sales Overview
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.7} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                        dataKey="seller"
                        tick={{ fill: "#4B5563", fontSize: 12, fontWeight: 500 }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#4B5563", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* 🧠 Custom Tooltip */}
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm">
                                        <p className="font-semibold text-indigo-600">{label}</p>
                                        <p className="text-gray-700">
                                            💰 <span className="font-medium">৳{payload[0].value.toFixed(2)}</span>
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    <Legend wrapperStyle={{ fontSize: "13px" }} />
                    <Bar
                        dataKey="total"
                        name={`Total Sales ${totalSales.toFixed(2)} ৳`}
                        fill="url(#barColor)"
                        radius={[10, 10, 0, 0]}
                        barSize={45}
                    />
                </BarChart>
            </ResponsiveContainer>

            <p className="text-sm  mt-4 text-center italic">
                Data based on recent confirmed transactions
            </p>
        </div>
    );




}
