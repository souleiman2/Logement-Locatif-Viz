

/**
 * Defines the X scale
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width) {
  let months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20",
  "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  return d3.scaleBand().domain(months).range([0, width])
}

/**
 * Defines the X scale
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  let keys = Object.keys(data[0]["price"])

  let total_maxi = -Infinity
  let total_mini = Infinity

  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < keys.length && keys[j] != "house" && keys[j] != "basement-apartment"; j++){
      if(data[i]["price"][[keys[j]]] > total_maxi){
        total_maxi = data[i]["price"][[keys[j]]]
      }
      if(data[i]["price"][[keys[j]]] < total_mini && 0 != data[i]["price"][[keys[j]]]){
        total_mini = data[i]["price"][[keys[j]]]
      }
    }

  }
  return d3.scaleLinear().domain([total_mini - 200, total_maxi]).range([height, 0])
  
}
