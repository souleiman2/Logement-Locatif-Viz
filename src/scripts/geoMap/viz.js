/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path) {
  d3.select("#map-g")
    .selectAll("path")
    .data(data["features"])
    .enter()
    .append("path")
    .attr("class", "paths")
    .attr("d", function(elem){ return path(elem) })
    .style("fill","lightgrey")
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
}

/**
 * Sets the domain and range of the radius scale.
 * @param {*} scale The radius scale
 * @param {*} data The data to find the domain's extremum
 */

export function setRadiusScale (scale, data) {
  let keys = Object.keys(data)
  let superficie = keys.map(key => data[key]["superficie"])
  scale.domain([Math.min(...superficie), Math.max(...superficie)]).range([2, 12]);
}

/**
 * Sets the domain and range of the color scale.
 * @param {*} scale The color scale
 * @param {*} data The data to find the domain's extremum
 * @param {string[]} colors Do the gradients of which colors
 */
export function setColorScale (scale, data, colors) {
  let keys = Object.keys(data)
  let prices = keys.map(key => data[key]["prix"])
  scale.domain([...prices], Math.max(...prices)).range(colors)//.interpolate(d3.interpolateHcl)
}

/**
 * Displays the markers for each street on the map.
 * @param {*} radiusScale The radius scale
 * @param {*} colorScale The color scaled used to determine the color of the circles
 * @param {*} procData The data that contains the price, superficie and quantity for each neighborhood
 * @param {*} districts The information needed to draw the neighborhood (and find the centroid)
 * @param {*} path The path associated with the current projection
 * @param {*} tip Tooltip
 */
export function mapMarkers (radiusScale, colorScale, procData, districts, path, tip) {
  districts = districts.filter(elem => procData.hasOwnProperty(elem["properties"]["NOM"]))


  let circles = d3.select("#marker-g")
    .selectAll("circle")
    .data(districts)
    .enter()
    .append("circle")
    .attr("r", function(elem){ return radiusScale(procData[elem["properties"]["NOM"]]["superficie"]) })
    .attr("cx", function(elem){ return path.centroid(elem)[0] })
    .attr("cy", function(elem){ return path.centroid(elem)[1] })
    .attr("fill", function(elem){ return colorScale(procData[elem["properties"]["NOM"]]["prix"]) })
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .on('mouseover', function(d){ tip.show({...procData[d["properties"]["NOM"]], "name" : d["properties"]["NOM"]}, this)})
    .on('mouseout', function(d){ tip.hide({...procData[d["properties"]["NOM"]], "name" : d["properties"]["NOM"]}, this)})
    
    circles.call(tip)
}
