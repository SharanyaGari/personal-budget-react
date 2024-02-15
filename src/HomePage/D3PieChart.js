import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

import * as d3 from "d3";

function D3PieChart() {	
  const svgRef = useRef();

  useEffect(() => {
		const w = 300;
		const h = 300;
		const radius = w / 2;
		const arc = d3.arc().innerRadius(50).outerRadius(radius);
		const color = d3.scaleOrdinal([
			"#ffcd56",
			"#ff6384",
			"#36a2eb",
			"#fd6b19",
			"#ff0000",
			"#FF00FF",
			"#191970",
		]);
		let dataSource = {
			property: [],
			value: [],
		}
    axios.get("http://localhost:80/budget").then(function (res) {
        for (var i = 0; i < res.data.myBudget.length; i++) {
					dataSource.property[i] = res.data.myBudget[i].title;
					dataSource.value[i] = res.data.myBudget[i].budget;
        }
				console.log("data source ref: ", dataSource)

				const formattedData = d3.pie().value((d) => d)(dataSource.value);
				
				const currentSvg = svgRef.current
				console.log("svgRef: ", svgRef.current)
				const svg = d3
					.select(currentSvg)
					.attr("width", w)
					.attr("height", w)
					.append("g")
					.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
				svg
					.selectAll()
					.data(formattedData)
					.join("path")
					.attr("d", arc)
					.attr("fill", (d) => color(d.value))
					.style("opacity", "0.7");

					svg
					.selectAll()
					.data(formattedData)
					.join("text")
					.text(d => dataSource.value[i])
					.attr("transform", (d) => `translate(${arc.centroid(d)})`)
					.style("text-anchor", "middle");
    });
		
  });

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default D3PieChart;
