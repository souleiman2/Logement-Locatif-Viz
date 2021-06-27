/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  scale.domain([0, data[0][1]]).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  let temp = data.map(elem => elem[0])
  scale.domain(temp).range([0, height]);
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The graph's x scale
 * @param {*} data The data to be used
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y, x, data, tip) {
  // TODO : Draw the bars
  const rect = d3.select('#graph-g-title')
                .selectAll('.rect')
                .data(data)
                .enter()
                .append('rect')
  
  rect.attr('fill', '#800022')
      .attr('height', y.bandwidth())
      .attr('width', (elem) => x(elem[1]))
      .attr('y', (elem) => y(elem[0]))
      .attr('x', 0)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}
