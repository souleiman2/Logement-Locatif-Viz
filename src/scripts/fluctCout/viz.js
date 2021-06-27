/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */

 var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20",
 "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];

export function positionLabels (g, width, height) {
  // TODO : Position axis labels
  let y_label = g.select('.y.axis-text')
  const ROTATION = -90
  const X_TRANSLATION = -50
  const HEIGHT_OFFSET = 40
  y_label.attr('transform', `translate(${X_TRANSLATION}, ${height/2}) rotate(${ROTATION})`)

  let x_label = g.select('.x.axis-text')
  x_label.attr('transform', `translate(${(width/2).toString()}, ${height + HEIGHT_OFFSET})`)
  
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, rScale, tip) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  const PARTIAL_OPACITY = 0.7
  const MARGIN = 75
  
  let g = d3.select('#graph-g-bubble')
  let offset = d3.select('.x.axis.bubble').node().getBoundingClientRect().height
  let height = g.node().getBoundingClientRect().height - offset

  d3.selectAll(".circles").remove()

  g.selectAll()
    .data(data)
    .enter()
    .append("circle")
    .attr('cx', 0)
    .attr('cy', height-MARGIN)
    .attr('r', d => rScale(d.total))
    .attr('stroke', 'black')
    .attr("opacity", PARTIAL_OPACITY)
    .attr('class', "circles-bubble")
    .attr('fill', d => '#e377c2');

  setCircleHoverHandler(tip)
  
  
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  const FULL_OPACITY = 1
  const PARTIAL_OPACITY = 0.7

  d3.selectAll(".circles-bubble")
    .on('mouseover', function(d){
      d3.select(this).attr("opacity", FULL_OPACITY)
      tip.show(d, this)
    })
    .on('mouseout', function(d){
      d3.select(this).attr("opacity", PARTIAL_OPACITY)
      tip.hide(d, this)
    })
}


/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, data) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
  d3.select('#graph-g-bubble')
    .selectAll('circle')
    .transition()
    .ease(d3.easeLinear)
    .attr("cx", d => (xScale(months[data.indexOf(d)]) + 28))
    .attr("cy", d => yScale(d.price))

}

export function setTitleText (title) {
  // TODO : Set the title
  const FONT_SIZE = 14
  const MARGIN = 10

  let g = d3.select('#graph-g-bubble')


  g.append('text')
    .text(title.toString())
    .attr('id', 'title-bubble')
    .attr('transform', 'translate(0, -'+ MARGIN.toString() +')')
    .attr('font-size', FONT_SIZE)
    .attr('font-weight', "bolder")
  
}
