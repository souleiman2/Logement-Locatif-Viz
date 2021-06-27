/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  // TODO : Set scale
  const MAXI = 30
  const MINI = 5

  data = data.slice(6, data.length - 2);

  let total_maxi = -Infinity
  let total_mini = Infinity

  for(let i = 0; i < data.length; i++){
    if(data[i]["total"] > total_maxi){
      total_maxi = data[i]["total"]
    }
    if(data[i]["total"] < total_mini){
      total_mini = data[i]["total"]
    }
  }
  return d3.scaleLinear().domain([total_mini, total_maxi]).range([MINI, MAXI])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @returns {Function} The ordinal scale used to determine the color
 */
export function setColorScale () {
  // TODO : Set scale
  
  let colorScale = (continent) => {
    const POSSIBLE_CONTINENT = ["Africa", "Asia", "Europe","North America", "Oceania", "South America"]
    const POSSIBLE_COLORS = d3.schemeCategory10
    for(let i = 0; i < POSSIBLE_CONTINENT.length; i++){
      if(continent === POSSIBLE_CONTINENT[i]){
        return POSSIBLE_COLORS[i]
      }
    }

    return POSSIBLE_COLORS[POSSIBLE_CONTINENT.length]
  }

  return colorScale
}

/**
 * Defines the X scale.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width) {
  const months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20",
  "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  return d3.scaleBand().domain(months).range([0, width])
}

/**
 * Defines the Y scale.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  
  let total_maxi = -Infinity
  let total_mini = Infinity

  for(let i = 0; i < data.length; i++){
    if(data[i]["price"] > total_maxi){
      total_maxi = data[i]["price"]
    }
    if(data[i]["price"] < total_mini){
      total_mini = data[i]["price"]
    }
  }
  return d3.scaleLinear().domain([total_mini, total_maxi]).range([height, 0])
  
}
