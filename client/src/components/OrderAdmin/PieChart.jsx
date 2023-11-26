import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartComponent = (props) => {
  const orderContant = {
    delivery: {
      fast: "FAST",
      gojek: "GO_JEK",
    },
    payment: {
      later_money: "Thanh toán tiền mặt khi nhận hàng",
      paypal: "Thanh toán bằng paypal",
    },
  };
  const convertDataChart = (data, type) => {
    try {
      const object = {};
      Array.isArray(data) &&
        data.forEach((opt) => {
          if (!object[opt[type]]) {
            object[opt[type]] = 1;
          } else {
            object[opt[type]] += 1;
            console.log(
              "c;getBase64",
              object[opt[type]],
              typeof object[opt[type]]
            );
          }
        });
      const results =
        Array.isArray(Object.keys(object)) &&
        Object.keys(object).map((item) => {
          return {
            name: orderContant.payment[item],
            value: object[item],
          };
        });
      return results;
    } catch (e) {
      return [];
    }
  };
  const data = convertDataChart(props.data, "paymentMethod");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    ...rests
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log(
      "{ cx, cy, midAngle, innerRadius, outerRadius, percent, index }",
      { cx, cy, midAngle, innerRadius, outerRadius, percent, index, rests }
    );
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
