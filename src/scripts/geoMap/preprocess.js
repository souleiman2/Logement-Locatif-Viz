/**
 * Gets the map of Montreals neighborhoods with their postal code
 * @returns {*} The json containing the data
 */

export function getJsonMap(){
    return require('../../assets/data/map_code_Postaux.json')
}

/**
 * Put in dictionnary the differents neighborhoods with some useful informations
 * @param {object} data All the data
 * @returns {object} Synthesized data (such as median of the price per neighborhood)
 */

export function MapNeighborhood(data){
    var neighborhoods = getJsonMap();
    let obj = {};

    let temp = {}

    data.forEach(annonce => {
        for(var neighborhood in neighborhoods){
            for (let index = 0; index < neighborhoods[neighborhood].length; index++) {
                if(annonce.location.toUpperCase().includes(neighborhoods[neighborhood][index].toUpperCase())){
                    if(!(neighborhood in obj)){
                        obj[neighborhood] = {}
                        obj[neighborhood]["total"] = 1

                        temp[neighborhood] = [0, 0]
                        let tempPrice = parseInt(annonce.price),
                        tempSuperficie = parseInt(annonce.areainfeet)

                        if(tempPrice){
                            temp[neighborhood][0] += 1
                        }
                        if(tempSuperficie){
                            temp[neighborhood][1] += 1
                        }
                        obj[neighborhood]["prix"] = tempPrice ? tempPrice : 0
                        obj[neighborhood]["superficie"] = tempSuperficie ? tempSuperficie : 0
                    } else {
                        obj[neighborhood]["total"] += 1

                        let tempPrice = parseInt(annonce.price),
                        tempSuperficie = parseInt(annonce.areainfeet)
                        if(tempPrice){
                            temp[neighborhood][0] += 1
                        }
                        if(tempSuperficie){
                            temp[neighborhood][1] += 1
                        }

                        obj[neighborhood]["prix"] += tempPrice ? tempPrice : 0
                        obj[neighborhood]["superficie"] += tempSuperficie ? tempSuperficie : 0
                    }
                    break;
                }
            }
        }
    });


    for (const [key, value] of Object.entries(obj)) {
        value["prix"] = temp[key][0] ? value["prix"]/temp[key][0] : 0
        value["superficie"] = temp[key][1] ? value["superficie"]/temp[key][1] : 0
    }
    return obj
}
