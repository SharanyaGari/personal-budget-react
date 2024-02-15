import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

import * as d3 from "d3";
import D3PieChart from "./D3PieChart";

function HomePage() {

  const chartRef = useRef();

  useEffect(() => {
    let dataSourceRef = {
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#ffcd56",
              "#ff6384",
              "#36a2eb",
              "#fd6b19",
              "#ff0000",
              "#FF00FF",
              "#191970",
            ],
          },
        ],
        labels: [],
    }

    let chartInstance = axios.get("http://localhost:80/budget").then(function (res) {
      for (var i = 0; i < res.data.myBudget.length; i++) {
        dataSourceRef.datasets[0].data[i] = res.data.myBudget[i].budget;
        dataSourceRef.labels[i] = res.data.myBudget[i].title;
      }

			const chartContext = chartRef.current.getContext("2d");
			return new Chart(chartContext, {
					type: "pie",
					data: dataSourceRef,
			});
    });
    return () => {
      chartInstance.then(instance => instance.destroy());
    };
  });

  return (
    <main className="center" id="main">
      <div className="page-area">
        <section>
          <article>
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>

            <aside>
              <p>On Budget</p>
            </aside>
          </article>

          <article>
            <h1>Results</h1>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article>
            <h1>Free</h1>
            <p>
              This app is free!!! And you are the only one holding your data!
            </p>
          </article>

          <article>
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>

          <article>
            <h1>Results</h1>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article>
            <h1>Chart</h1>
            <p>
              <canvas ref={chartRef} />
            </p>

            <h1>D3 Chart</h1>
            <D3PieChart />
          </article>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
