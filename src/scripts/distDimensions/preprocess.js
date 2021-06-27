
/**
 * Extracts the number of bedrooms and the type from the original data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
export function getExtractedData (data) {
    return data.map(elem => {
        return {
         "nbBeds": elem["numberbedrooms"],
         "type": elem["unitype"]
        }
      })
}

/**
 * Transforms the data to get the nodes of the sankey diagram
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The color scale to be used inthe graph
 * Final format :
 * 
 * [
    {"node":0,"name":"node0"},
    {"node":1,"name":"node1"},
    {"node":2,"name":"node2"},
    {"node":3,"name":"node3"},
    {"node":4,"name":"node4"}
    ],
 * 
 */
 export function getNodes(data) {
    let ans = []
    let index = 0
    let temp = {}

    data.forEach(elem => {
        temp[elem["nbBeds"]] = temp.hasOwnProperty(elem["nbBeds"]) ? temp[elem["nbBeds"]] + 1  : 1
    })

    let beds_keys = Object.keys(temp)
    let last_item = beds_keys.pop()
    beds_keys.sort(function(a,b){
        return parseFloat(a) - parseFloat(b)  
    })
    beds_keys.push(last_item)
    
    let total = 0
    beds_keys.forEach(elem => {
        total += temp[elem]
        ans.push({node: index, name: temp[elem].toString() + ((elem.toString() != "Not Available")? " ont " : " ") + elem.toString() + ((elem.toString() != "Not Available")? " pièces" : "")})
        index += 1
    })

    let centerIndex = index
    ans.push({node : centerIndex, name : total.toString() + " habitations"})
    index += 1
    
    temp = {}

    data.forEach(elem => {
        temp[elem["type"]] = temp.hasOwnProperty(elem["type"]) ? temp[elem["type"]] + 1  : 1
    })
    let type_keys = Object.keys(temp)
    type_keys.forEach(elem => {
        ans.push({node: index, name: temp[elem].toString() + " " + elem.toString()})
        index += 1
    })
    return [ans, centerIndex]
}

/**
 * Defines the different links between the nodes
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The links between the nodes
 * 
 * Final format : 
 * 
 *  [
    {"source":0,"target":2,"value":2},
    {"source":1,"target":2,"value":2},
    {"source":1,"target":3,"value":2},
    {"source":0,"target":4,"value":2},
    {"source":2,"target":3,"value":2},
    {"source":2,"target":4,"value":2},
    {"source":3,"target":4,"value":4}
    ]}
 * 
 */
export function getLinks (nodes, centerIndex) {

    let links = []
    let index = 0
    
    for(let i = 0; i < centerIndex; i++){
        let valueTemp = parseInt(nodes[i]["name"].split(" ")[0])
        links.push({source : i, target : centerIndex, value : valueTemp})
    }
    for(let i = centerIndex + 1; i < nodes.length; i++){
        let valueTemp = parseInt(nodes[i]["name"].split(" ")[0])
        links.push({source : centerIndex, target : i, value : valueTemp})
    }
    return links
}




/**
 * Processes the data
 *
 * @param {object[]} data the data to be used
 * @returns {object} Nodes and the links for the sankey diagram 
 */
 export function endResult (data) {
    let extracted_data = getExtractedData(data)
    let [nodesTemp, centerIndex] = getNodes(extracted_data)
    let linksTemp = getLinks(nodesTemp, centerIndex)
    return {nodes : nodesTemp, links : linksTemp}
}

  
  