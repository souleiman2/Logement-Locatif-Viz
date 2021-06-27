/**
 * Extracts the price and the number of bedrooms of the mainstream data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
function extractPriceType(data) {
   return data.map(elem => {
     return {
      "price": elem["price"],
      "nbBeds": elem["numberbedrooms"]
     }
   })
}

/**
 * Cleans the data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The cleaned data
 */
function clean_data(data) {
  return data.filter(elem => elem["nbBeds"] != 0 && elem["nbBeds"] != "Not Available" );
}

/**
 * Divide the different data into percentiles (10th, 25th, 50th, 75th,90th)
 *
 * @param {object[]} data the data to be used
 * @returns {object} The divided data
 */
function divData(data) {
  let temp = {}
  data.forEach(elem => {
    if(temp.hasOwnProperty(elem["nbBeds"])){
      temp[elem["nbBeds"]].push(elem["price"])
    }else{
      temp[elem["nbBeds"]] = []
    }
  })
  
  let ans = {}
  for(let key in temp){
    ans[key] = arrToDist(temp[key])
  }
  return ans 
}

/**
 * Transforms array into percentiles (10th, 25th, 50th, 75th,90th)
 *
 * @param {number[]} data the data to be used
 * @returns {object} The percentiles 
 */
 function arrToDist(arr) {
  arr.sort(function(a, b) {
    return a - b;
  });
  return {
    "10": arr[Math.floor(arr.length / 10)],
    "25": arr[Math.floor(arr.length * 1 / 4)],
    "50": arr[Math.floor(arr.length * 1 / 2)],
    "75": arr[Math.floor(arr.length * 3 / 4)],
    "90": arr[Math.floor(arr.length * 9 / 10)]
  }
}


/**
 * Processes the data to have in the format that we desire
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The processed data
 */
export function endResult (data) {
  let extracted_data = extractPriceType(data)
  let cleaned_data = clean_data(extracted_data)
  let div_data = divData(cleaned_data)
  return div_data
}


