/**
 * Extracts the price and the area of the mainstream data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
function extractPriceArea (data) {
   return data.map(elem => {
     return {
      "type": elem["unitype"],
      "price": elem["price"],
      "area": elem["areainfeet"]
     }
   })
}


/**
 * Cleans the data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The cleaned data
 */
function cleanData (data) {
  return data.filter(elem => elem["price"] > 0 && elem["area"] > 10 && elem["area"] < 4000);
}

/**
 * Defines the color scale used in the graph.
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The processed data
 */
export function endResult (data) {
  let extracted_data = extractPriceArea(data)
  let cleaned_data = cleanData(extracted_data)
  return cleaned_data
}


