
export function getHouseTypes(data){
    const unitype = new Array();
    data.forEach(listing => {
        if(!unitype.includes(listing.unitype))
            unitype.push(listing.unitype);
    });
    return unitype;
}
var month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",];

export function getMonthsRange(data){
    var max = 0;
    var min = 11;
    data.forEach(listing => {
        if(listing.dateavailable !== null){
            if(listing.dateavailable.getYear() - 100 === 20 && listing.dateavailable.getMonth() < min){
                min = listing.dateavailable.getMonth()
            }
            else if(listing.dateavailable.getYear() - 100 === 21 && listing.dateavailable.getMonth() > max){
                max = listing.dateavailable.getMonth()
            }
        }
    });
    // min 2020, max 2021
    return [min, max]
}


export function getAveragePricePerHouseTypePerMonth(data){
    var arr = getHouseTypes(data)
    var i = 0
    var price_count = []

    for (let index = 0; index < 24; index++) {
        const obj = {}
        obj["price_per_house"] = {}
        for(var i = 0; i < arr.length; i++){
            obj[arr[i]] = 0;
            obj["price_per_house"][arr[i]] = 0;
        }
        obj["price"] = 0
        obj["total"] = 0
        price_count.push(obj)
    }

    var map = new Map();


    data.forEach(listing => {
        if (listing.dateavailable !== null) {
            listing.dateavailable.setHours(listing.dateavailable.getHours() + 5)
            if(!map.has(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear())) {
                map.set((listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()), { count: 1, sum: listing.price })
                if(listing.dateavailable.getFullYear() >= 2021) {
                    price_count[listing.dateavailable.getMonth() + 12][listing.unitype] = 1
                    price_count[listing.dateavailable.getMonth() + 12]["price_per_house"][listing.unitype] = listing.price
                } else {
                    price_count[listing.dateavailable.getMonth()][listing.unitype] = 1
                    price_count[listing.dateavailable.getMonth()]["price_per_house"][listing.unitype] = listing.price
                }
            } else {
                map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count++
                map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum += listing.price

                if(listing.dateavailable.getFullYear() >= 2021) {
                    price_count[listing.dateavailable.getMonth() + 12]["price_per_house"][listing.unitype] = 
                    map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum
                         
                    price_count[listing.dateavailable.getMonth() + 12][listing.unitype] =
                        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count
                } else {
                    price_count[listing.dateavailable.getMonth()]["price_per_house"][listing.unitype] = 
                        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum

                    price_count[listing.dateavailable.getMonth()][listing.unitype] =
                        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count
                }
            }
        }
    });

    price_count.forEach(obj => {
        obj.total = obj["apartment"] + obj["basement-apartment"] + obj["condo"] + obj["duplex-triplex"] + obj["house"]
        if(obj.total !== 0)
            obj.price = (obj["price_per_house"]["apartment"] + obj["price_per_house"]["basement-apartment"] + obj["price_per_house"]["condo"] + obj["price_per_house"]["duplex-triplex"] + obj["price_per_house"]["house"])/obj.total
    });

    return price_count;
}