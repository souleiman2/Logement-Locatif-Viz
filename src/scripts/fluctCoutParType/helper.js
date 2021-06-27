
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('.graph-line')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-line')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#line-chart')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis line')

  g.append('g')
    .attr('class', 'y axis line')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Prix moyen des propriétés ($)')
    .attr('class', 'y axis-text')
    .attr('font-size', 15)

  g.append('text')
    .text('Mois')
    .attr('class', 'x axis-text')
    .attr('font-size', 15)
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis.line')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '~s']))
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
 d3.select('.y.axis.line')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5])) 
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', -20)
    .attr('font-size', 14)
}

