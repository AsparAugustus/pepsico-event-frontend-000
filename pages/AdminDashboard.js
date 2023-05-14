import React from "react";
import downloadExitSurvey from "../utils/downloadExitSurvey";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

function generateCharts(chartData) {
  const charts = [];

  for (const category in chartData) {
    const products = chartData[category];
    const chartDataArray = [];

    const uniqueColors = ["#8884d8", "#82ca9d", "#ffc658"];
    const uniqueLabels = ["Super Unique", "Differentiated", "Very Common"];

    const uniqueColorMap = {};
    let colorIndex = 0;

    for (const productName in products) {
      const uniqueValues = products[productName];
      const uniqueCounts = Object.values(uniqueValues);

      // Assign a color to each unique value if it hasn't already been assigned
      for (const uniqueValue in uniqueValues) {
        if (!(uniqueValue in uniqueColorMap)) {
          uniqueColorMap[uniqueValue] = uniqueColors[colorIndex];
          colorIndex = (colorIndex + 1) % uniqueColors.length;
        }
      }

      chartDataArray.push({
        name: productName,
        uniqueCounts: uniqueCounts,
        uniqueLabels: uniqueLabels,
      });
    }

    charts.push(
      <div key={category}>
        <h2>{category}</h2>
        <BarChart width={500} height={300} data={chartDataArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Counts", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          {uniqueLabels.map((label, index) => (
            <Bar key={label} dataKey={`uniqueCounts[${index}]`} name={label} fill={uniqueColors[index]}>
              {chartDataArray.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={uniqueColors[index]} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </div>
    );
  }

  return charts;
}

const AdminDashboard = () => {
  const { isLoading, error, data } = useQuery("productFeedbacks", async () => {
    const res = await fetch("/api/post_selection_get");
    return res.json();
  });

  

  const [categories, setCategories] = useState(null);
  
  const [chartValues, setchartValues] = useState(null);


  const chartData = {
    "Affordable": {
      "Jumbo Rolled Oats": {
        "Very common": 10000,
        "Differentiated": 5000,
        "Super unique": 1000
      },
      "Oats": {
        "Very common": 7500,
        "Differentiated": 10000,
        "Super unique": 2000
      },
      "100% Steel Cut Oats": {
        "Very common": 9000,
        "Differentiated": 3000,
        "Super unique": 500
      },
      "Organic Quinoa": {
        "Very common": 4000,
        "Differentiated": 6000,
        "Super unique": 3000
      },
      "Brown Rice": {
        "Very common": 12000,
        "Differentiated": 8000,
        "Super unique": 1000
      },
      "Whole Wheat Pasta": {
        "Very common": 6000,
        "Differentiated": 4000,
        "Super unique": 1500
      },
      "Multigrain Bread": {
        "Very common": 8000,
        "Differentiated": 7000,
        "Super unique": 2000
      }
    },    
    "Premium": {
      "Black Truffle Hand Cooked Potato Chips": {
        "Very common": Math.floor(Math.random() * 11),
        "Differentiated": Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11)
      },
      "Sour Cream & Onion Mashed Potato Snack": {
        "Very common": Math.floor(Math.random() * 11),
        "Differentiated": Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11)
      },
      "Coco Crunch Granola": {
        "Very common": Math.floor(Math.random() * 11),
        "Differentiated": Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11)
      }
    }
  };
  
  
  const charts = generateCharts(chartData);
  

  
  const chartTitles = [
    "Affordable",
    "Premium"
  ];



  // const uniqueCounts = data.uniqueCounts;

  // const productFeedbacks = Object.entries(uniqueCounts).map(([product, counts]) => ({
  //   product,
  //   veryCommon: counts['Very common'],
  //   differentiated: counts.Differentiated,
  //   superUnique: counts['Super unique'],
  // }));




  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;



  return (
    <>
      <div>AdminDashboard</div>

      <button onClick={downloadExitSurvey}>Download exit survey</button>
      <button
        onClick={() => {
          console.log(categories);
        }}
      >
        categories
      </button>
      <button
        onClick={() => {
          console.log(chartValues);
        }}
      >
        chartValues
      </button>

      <button
        onClick={() => {
          console.log(data);
        }}
      >
        data
      </button>

      <div>
        {/* <h1>Product Feedbacks</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Very Common</th>
            <th>Differentiated</th>
            <th>Super Unique</th>
          </tr>
        </thead>
        <tbody>
          {productFeedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.product.join(', ')}</td>
              <td>{feedback.veryCommon}</td>
              <td>{feedback.differentiated}</td>
              <td>{feedback.superUnique}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    <div>
      {charts}
    </div>
      </div>
    </>
  );
};

export default AdminDashboard;
