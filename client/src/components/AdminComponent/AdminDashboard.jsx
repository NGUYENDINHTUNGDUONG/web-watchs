import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStatistic } from "../../services/StatisticService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [category, setCategory] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await getStatistic();
      const statistic = res.statistic[0];
      setCategory({
        labels: ["Đồng hồ nam", "Dồng hồ nữ"],
        datasets: [
          {
            label: "Danh mục sản phẩm bán ra được trong tháng ",
            data: [statistic?.maleSales, statistic?.femaleSales],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      });
      console.log(res);
    };
    const getRevenue = async () => {
      const res = await getStatistic();
      for (let i = 0; i < res.statistic.length; i++) {
        const statistic = res.statistic[i];
        console.log(statistic, "1");
        setRevenue({
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              label: "Dataset 1",
              data: labels.map(() =>datatype.number({ min: -1000, max: 1000 })
              ),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            // {
            //   label: "Dataset 2",
            //   data: labels.map(() =>
            //     faker.datatype.number({ min: -1000, max: 1000 })
            //   ),
            //   borderColor: "rgb(53, 162, 235)",
            //   backgroundColor: "rgba(53, 162, 235, 0.5)",
            // },
          ],
        });
      }
    };
    const getBrand = async () => {
      const res = await getStatistic();
      const statistic = res.statistic[0];
      setBrand({
        labels: ["Apple", "Samsung", "Xiaomi"],
        datasets: [
          {
            label: "So luong san pham ban ra",
            data: [
              statistic?.apple,
              statistic?.samsung,
              statistic?.xiaomi,
            ].number({ min: 0, max: 1000 }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
          },
        ],
      });
    };

    getCategory();
    getBrand();
    getRevenue();
  }, []);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3">
        <div>
          {category && (
            <Pie data={category} className=" !w-[300px] !h-[300px]" />
          )}
        </div>
        <div>
          {" "}
          {brand && <Bar data={brand} className=" !w-[300px] !h-[300px]" />}
        </div>
      </div>
      <div> {revenue && <Line data={revenue} className=" " />}</div>
    </div>
  );
}
