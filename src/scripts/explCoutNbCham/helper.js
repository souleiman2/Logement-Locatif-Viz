
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateG (margin) {
  return d3.select('.graph-prix-nbCham')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-nbCham')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis-nbCham')

  g.append('g')
    .attr('class', 'y axis-nbCham')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Prix ($)')
    .attr('class', 'y axis-text nbCham')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  g.append('text')
    .text("Nombre de chambres")
    .attr('class', 'x axis-text nbCham')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  g.append('text')
    .text('Variation du prix en fonction du nombre de chambre')
    .attr('class', 'title nbCham')
    .attr('fill', '#898989')
}

/**
 * Defines the color scale used in the graph.
 *
 * @param {string[]} colors A sorted array of color hex strings to be used
 * @param {string[]} players A sorted array of player names to use as the domain
 * @returns {*} The color scale to be used inthe graph
 */
export function defineColorScale (colors, players) {
  return d3.scaleOrdinal().range(colors).domain(players)
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#bar-chart-prix-nbCham').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (width, height) {
  d3.select('.y.axis-text.nbCham')
    .attr('x', -70)
    .attr('y', height / 2)

  d3.select('.x.axis-text.nbCham')
    .attr('x', width / 2)
    .attr('y', height + 50)

  d3.select('.title.nbCham')
    .attr('x', width / 2)
    .attr('y', -35)
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis-nbCham')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale))
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis-nbCham').call(d3.axisLeft(yScale).ticks(5))
}
