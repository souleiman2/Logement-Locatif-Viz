/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  let temp = data.map(elem => { return elem["area"] })
  scale.domain([Math.min(...temp), Math.max(...temp)]).range([0, width])
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
  let temp = data.map(elem => { return elem["price"] })
  scale.domain([Math.min(...temp), Math.max(...temp)]).range([height, 0]);
}

/**
 * Draws the circles
 *
 * @param {*} y The graph's y scale
 * @param {*} x The graph's x scale
 * @param {*} data The data to be used
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawCircles (y, x, data) {
  // TODO : Draw the bars

  d3.selectAll(".areaCircles").remove()

  const circle = d3.select('#graph-g-area')
                .selectAll('.area-circle')
                .data(data)
                .enter()
                .append('circle')

  circle.attr('cx', (elem) => x(elem["area"]))
        .attr('cy', (elem) => y(elem["price"]))
        .attr('r', 5)
        .attr('class', "areaCircles")
        .attr('stroke', 'black')
        .attr('fill', (elem) => color(elem["type"]))

}

function color(type){
  switch(type){
    case "apartment":
      return "#ffb997"
    case "condo":
      return "#f67e7d"
    case "duplex-triplex":
      return "#040926"
    case "house":
      return "#3CAEA3"
      default:
        return "#69a3b2"
  }

}
