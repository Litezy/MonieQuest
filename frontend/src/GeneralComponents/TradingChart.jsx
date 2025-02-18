import React from "react";
import { AreaChart, Area, XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";

const data = [
  {
    name: "Jul",
    uv: 45,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Aug",
    uv: 20,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Sep",
    uv: 45,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Oct",
    uv: 30,
    pv: 9800,
    amt: 2290,
  },
];

export default function TradingChart() {
  return (
    <AreaChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#143f75" />
    </AreaChart>
  );
}
