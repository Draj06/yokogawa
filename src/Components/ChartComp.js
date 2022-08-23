import React, { useRef, useEffect, useState } from 'react';
import { select, scaleLinear, line, axisBottom, axisLeft, scaleBand } from 'd3';
import * as d3 from 'd3';

/**
 * Component that renders a LineChartNew
 */
const UseResizeObserver = (ref) => {
	const [dimensions, setDimensions] = useState(null);

	useEffect(() => {
		// when chart is resize checking the target so that on small scren will show less amount of legends
		const observeTarget = ref.current;
		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				setDimensions(entry.contentRect);
			});
		});
		resizeObserver.observe(observeTarget);
		return () => {
			resizeObserver.unobserve(observeTarget);
		};
	}, [ref]);
	return dimensions;
};

function ChartComp({ cData }) {
	const svgRef = useRef(); // reference for svg to display chart
	const wrapperRef = useRef();
	const dimensions = UseResizeObserver(wrapperRef);

	// will be called initially and on every data change

	useEffect(() => {
		const svg = select(svgRef.current);

		if (!dimensions) return;
		const padding = 0.8; // padding between lef and right of container
		const { height } = dimensions || wrapperRef.current.getBoundingClientRect();

		const xScale = scaleBand()
			.domain(cData.map(({ timeStamp }) => timeStamp))
			.range([0, dimensions.width]) // legegends spacing from left
			.padding(padding);

		const tickWidth = 45; // this whole code is to calculate the numbers of legends to be shown, if the legends are like 100 than we will show only 70-80 which can be fixed to the screen
		const width = xScale.range()[1];
		const tickN = Math.floor(width / tickWidth);
		const keepEveryNth = Math.ceil(xScale.domain().length / tickN);
		const xScaleLabelDomain = xScale
			.domain()

			.filter((_, i) => i % keepEveryNth === 0);
		xScale.domain(xScaleLabelDomain);
		d3.selectAll('.tooltiplinechart').style('opacity', 0);

		const yScale = scaleLinear() // creating y scale
			.domain([0, 1.1 * Math.max(...cData.map(({ valueD }) => valueD))])
			.range([height, 0]);

		const xScaleLines = scaleBand() //creating x-scale
			.domain(cData.map(({ timeStamp }) => timeStamp))
			.range([0, dimensions.width])
			.padding(padding);

		const lineGenerator = line() // create line
			.x((d, index) => xScaleLines(xScaleLines.domain()[index]))
			.y((d) => yScale(d.valueD));
		svg
			.selectAll('.myLine')
			.data([cData])
			.join('path')

			.attr('class', 'myLine')
			.attr('stroke', 'black')
			.attr('stroke-width', 1.1)
			.attr('fill', 'none')
			.attr('d', lineGenerator);

		var div = d3
			.select('body')
			.append('div')
			.attr('class', 'tooltiplinechart')
			.style('opacity', 0);

		svg
			.selectAll('.myDot') // creating dot circle
			.data(cData)
			.join('circle')
			.style('cursor', 'pointer')
			.attr('class', 'myDot')
			.attr('stroke', '#516182')
			.attr('stroke-width', 1)

			.attr('fill', '#516182')
			.attr('r', 4)

			.on('mousemove', function (event, d) {
				// Tooltip when user hover over a point to se that data
				d3.select(this)
					.transition()
					.duration('50')
					.style('fill-opacity', 0.6)
					.attr('r', '6');
				div.transition().duration(50).style('opacity', 1);
				div
					.html(
						`<text class="text-dark font-weight-bold"> Time : ${d.timeStamp} </br><text class="text-dark font-weight-bold"> Value :  ${d.valueD}</text></text>`
					)
					.style('color', 'grey')
					.style('left', event.pageX - 45 + 'px')
					.style('top', event.pageY - 35 + 'px');
			})
			.on('mouseout', function (d, i) {
				d3.select(this)
					.transition()
					.duration('50')
					.attr('r', 4)

					.style('fill-opacity', '6')
					.attr('opacity', '1');
				div.transition().duration('50').style('opacity', 0);
			})

			.attr('cx', (_, i) => xScaleLines(xScaleLines.domain()[i]))
			.attr('width', xScaleLines.bandwidth())
			.attr('cy', (d) => yScale(d.valueD));

		const xAxis = axisBottom(xScale);
		svg
			.select('.x-axis')
			.attr('transform', `translate(0, ${height})`)
			.call(xAxis.tickSize(0).tickPadding([17]));

		const yAxis = axisLeft(yScale).tickSize(-width);
		svg.select('.y-axis').call(yAxis.ticks(5).tickPadding([12]));
	}, [cData, cData.length, dimensions]);

	return (
		<React.Fragment>
			<div ref={wrapperRef} style={{ marginLeft: '1rem' }}>
				<svg ref={svgRef} className="svgimg_container_class">
					<g className="x-axis" />
					<g className="y-axis" />
				</svg>
			</div>
		</React.Fragment>
	);
}

export default ChartComp;
