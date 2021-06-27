/**
 * Draws the legend.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  var data = ["Apartement", "Condo", "duplex-triplex"]
  const TOP_LEGEND_TITLE = -30
  const TOP_LEGEND = -10
  const MARGIN = 10

  d3.selectAll(".areaLegend").remove()

  g.append('text')
  .text('Légende')
  .attr('font-weight', "bold")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + (TOP_LEGEND).toString() + ")");
  
  g.append('text')
  .text("Appartement")
  .attr('font-weight', "bold")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN + 20).toString()  + "," + (TOP_LEGEND_TITLE + 50).toString() + ")");

  g.append('text')
  .text("Condo")
  .attr('font-weight', "bold")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN + 20).toString()  + "," + (TOP_LEGEND_TITLE + 75).toString() + ")");

  g.append('text')
  .text("duplex-triplex")
  .attr('font-weight', "bold")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN + 20).toString()  + "," + (TOP_LEGEND_TITLE + 100).toString() + ")");

  g.append('text')
  .text("Maison")
  .attr('font-weight', "bold")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN + 20).toString()  + "," + (TOP_LEGEND_TITLE + 125).toString() + ")");


  g.append('rect')
  .attr("width", "15")
  .attr("height", "15")
  .attr("fill", "#ffb997")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + (TOP_LEGEND_TITLE + 38).toString() + ")");

  g.append('rect')
  .attr("width", "15")
  .attr("height", "15")
  .attr("fill", "#f67e7d")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + (TOP_LEGEND_TITLE + 63).toString() + ")");


  g.append('rect')
  .attr("width", "15")
  .attr("height", "15")
  .attr("fill", "#040926")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + (TOP_LEGEND_TITLE + 88).toString() + ")");

  g.append('rect')
  .attr("width", "15")
  .attr("height", "15")
  .attr("fill", "#3CAEA3")
  .attr("class", "areaLegend")
  .attr("transform", "translate(" + (width + MARGIN).toString()  + "," + (TOP_LEGEND_TITLE + 113).toString() + ")");


}
