/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  let keys = Object.keys(data)
  scale.domain(keys).range([0, width])
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
  let maxi = -Infinity

  for(let key in data){
    if(data[key]["90"] > maxi){
      maxi = data[key]["90"]
    }
  }
  
  scale.domain([0, maxi]).range([height, 0]);
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The graph's x scale
 * @param {*} data The data to be used
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBoxes(y, x, data, height) {

  let width = x.bandwidth()
  let left = (width) => width/3
  let right = (width) => width*2/3


  d3.selectAll('.typeCircles').remove()
  
  let keys = Object.keys(data)

  //draw the 10th percentile
  const line1 = d3.select('#graph-g-type')
                .selectAll('.area-circle')
                .data(keys)
                .enter()
                .append('path')

  line1.attr( 'd', (elem) => d3.line()([[x(elem) + left(width), y(data[elem]["10"])], [x(elem) + right(width), y(data[elem]["10"]) ]]) )
      .attr('class', 'typeCircles')
        .attr('stroke', 'black')

  //draw the 90th percentile
  const line2 = d3.select('#graph-g-type')
        .selectAll('.area-circle')
        .data(keys)
        .enter()
        .append('path')

  line2.attr( 'd', (elem) => d3.line()([[x(elem) + left(width), y(data[elem]["90"])], [x(elem) + right(width), y(data[elem]["90"]) ]]) )
  .attr('class', 'typeCircles')
  .attr('stroke', 'black')

  //draw the middle line
  const line3 = d3.select('#graph-g-type')
        .selectAll('.area-circle')
        .data(keys)
        .enter()
        .append('path')

  line3.attr( 'd', (elem) => d3.line()([[x(elem) + width/2, y(data[elem]["10"])], [x(elem) + width/2, y(data[elem]["90"]) ]]) )
  .attr('class', 'typeCircles')
  .attr('stroke', 'black')

  //draw the rectangle
  const rect = d3.select('#graph-g-type')
        .selectAll('.area-circle')
        .data(keys)
        .enter()
        .append('rect')

  rect.attr('x', (elem) => x(elem) + left(width))
      .attr('y', (elem) => y(data[elem]["75"]))
      .attr('width', right(width) - left(width))
      .attr('height', (elem) => (y(data[elem]["25"]) - y(data[elem]["75"])) )
      .attr('class', 'typeCircles')
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');

  //draw the median
  const median = d3.select('#graph-g-type')
                .selectAll('.area-circle')
                .data(keys)
                .enter()
                .append('path')

  median.attr( 'd', (elem) => d3.line()([[x(elem) + left(width), y(data[elem]["50"])], [x(elem) + right(width), y(data[elem]["50"]) ]]) )
  .attr('class', 'typeCircles')
        .attr('stroke', 'black')
}
