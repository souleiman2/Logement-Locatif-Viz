/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  const CONTINENTS = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
  let colors = CONTINENTS.map(colorScale)

  const TOP_LEGEND_TITLE = -30
  const TOP_LEGEND = -10
  const MARGIN = 10

  d3.scaleOrdinal()
    .domain(CONTINENTS)
    .range(colors);

  g.append('text')
  .text('Legend')
  .attr('font-weight', "bold")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + TOP_LEGEND_TITLE.toString() + ")");

  g.append('g')
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + TOP_LEGEND.toString() + ")");

}
