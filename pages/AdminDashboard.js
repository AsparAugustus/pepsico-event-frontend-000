import React from "react";
import downloadExitSurvey from "../utils/downloadExitSurvey";
import downloadProductData from "../utils/downloadProductData";
import IsDevelopment from "../Components/IsDevelopment";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

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
      <div key={category} style={{ maxWidth: "100vw", marginBottom: "100px" }}>
        <h2>{category}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart width={1600} height={300} data={chartDataArray} barCategoryGap="10%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            height={150}
            allowDataOverflow={true}
            minTickGap={0}
            tickMargin={2}
            padding="no-gap"
              tick={{
                interval: "preserveStartEnd",
                dy: -5,
                width: 50,
                height: 50,
                wrapStyle: {
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                },
              }}
              dataKey="name"
            />
            <YAxis
              label={{ value: "Counts", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            {uniqueLabels.map((label, index) => (
              <Bar
                key={label}
                dataKey={`uniqueCounts[${index}]`}
                name={label}
                fill={uniqueColors[index]}
                
              >
                {chartDataArray.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={uniqueColors[index]} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
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

  const [chartValues, setchartValues] = useState(null);

  const chartData = {
    Affordable: {
      "Jumbo Rolled Oats": {
        "Very common": 10000,
        Differentiated: 5000,
        "Super unique": 1000,
      },
      Oats: {
        "Very common": 7500,
        Differentiated: 10000,
        "Super unique": 2000,
      },
      "100% Steel Cut Oats": {
        "Very common": 9000,
        Differentiated: 3000,
        "Super unique": 500,
      },
      "Organic Quinoa": {
        "Very common": 4000,
        Differentiated: 6000,
        "Super unique": 3000,
      },
      "Brown Rice": {
        "Very common": 12000,
        Differentiated: 8000,
        "Super unique": 1000,
      },
      "Whole Wheat Pasta": {
        "Very common": 6000,
        Differentiated: 4000,
        "Super unique": 1500,
      },
      "Multigrain Bread": {
        "Very common": 8000,
        Differentiated: 7000,
        "Super unique": 2000,
      },
      Quinoa: {
        "Very common": 5000,
        Differentiated: 3000,
        "Super unique": 1000,
      },
      Millet: {
        "Very common": 2000,
        Differentiated: 1500,
        "Super unique": 500,
      },
      Amaranth: {
        "Very common": 3000,
        Differentiated: 2500,
        "Super unique": 800,
      },

      "Wild Salmon2": {
        "Very common": 10000,
        Differentiated: 8000,
        "Super unique": 500,
      },
      Tuna2: {
        "Very common": 12000,
        Differentiated: 10000,
        "Super unique": 1500,
      },
      Sardines2: {
        "Very common": 6000,
        Differentiated: 5000,
        "Super unique": 800,
      },
      "Wild Salmon": {
        "Very common": 10000,
        Differentiated: 8000,
        "Super unique": 500,
      },
      Tun23232a: {
        "Very common": 12000,
        Differentiated: 10000,
        "Super unique": 1500,
      },
      Sardi2323nes: {
        "Very common": 6000,
        Differentiated: 5000,
        "Super unique": 800,
      },
      "Wild Sa232lmon": {
        "Very common": 10000,
        Differentiated: 8000,
        "Super unique": 500,
      },
      Tuna3: {
        "Very common": 12000,
        Differentiated: 10000,
        "Super unique": 1500,
      },
      Sardines3: {
        "Very common": 6000,
        Differentiated: 5000,
        "Super unique": 800,
      }
    },
    Premium: {
      "Black Truffle Hand Cooked Potato Chips": {
        "Very common": Math.floor(Math.random() * 11),
        Differentiated: Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11),
      },
      "Sour Cream & Onion Mashed Potato Snack": {
        "Very common": Math.floor(Math.random() * 11),
        Differentiated: Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11),
      },
      "Coco Crunch Granola": {
        "Very common": Math.floor(Math.random() * 11),
        Differentiated: Math.floor(Math.random() * 11),
        "Super unique": Math.floor(Math.random() * 11),
      },
    },
  };

  //use chartdata for random generated data
  const charts = generateCharts(data);

  function getProductUniquenessCounts(data) {
    if(!data) return
    
    let counts = [];
    let categories = Object.keys(data);
    for (let category in data) {
      let categoryCounts = [];
      for (let product in data[category]) {
        let sum = 0;
        for (let type in data[category][product]) {
          sum += data[category][product][type];
        }
        categoryCounts.push({ name: product, value: sum });
      }
      counts.push({ category: category, data: categoryCounts });
    }
    return counts;
  }

  const CountsBarChartFunction = ({ data, category }) => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={1600} height={300} data={data} barCategoryGap="10%">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          height={150}
          allowDataOverflow={true}
          minTickGap={0}
          tickMargin={2}
          padding="no-gap"
          tick={{
            interval: "preserveStartEnd",
            dy: -5,
            width: 50,
            height: 50,
            wrapStyle: {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            },
          }}
          dataKey="name"
        />
        <YAxis
          label={{ value: "Counts", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="value" name={category} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
  

  //use chartData for random data
  const CountedData = getProductUniquenessCounts(data);

  const CountsBarCharts = CountedData.map(({ category, data }) => (
    <div key={category}>
      <h2>{category}</h2>
      <CountsBarChartFunction data={data} category={category} />
    </div>
  ));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <>
      <div>AdminDashboard</div>
      <IsDevelopment>
        <button onClick={downloadProductData}>Download products data</button>
        <button onClick={downloadExitSurvey}>Download exit survey</button>
        getProductUniquenessCounts
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
      </IsDevelopment>

     

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
      <h2>Product Category Rating Distribution</h2>
        <div>{charts}</div>


        <h2>Product Name Selected by reviewer</h2>
        <div>{CountsBarCharts}</div>
      </div>
    </>
  );
};

export default AdminDashboard;
