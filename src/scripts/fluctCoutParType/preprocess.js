
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
        for(var i = 0; i < arr.length; i++){
            obj[arr[i]] = 0;
        }
        obj["price"] = {}
        obj["total"] = {}
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
                    price_count[listing.dateavailable.getMonth() + 12]["price"][listing.unitype] = listing.price
                } else {
                    price_count[listing.dateavailable.getMonth()][listing.unitype] = 1
                    price_count[listing.dateavailable.getMonth()]["price"][listing.unitype] = listing.price
                }
            }
            
            else {
                map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count++
                map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum += listing.price
                if(listing.dateavailable.getFullYear() >= 2021) {
                    price_count[listing.dateavailable.getMonth() + 12][listing.unitype]++
                    price_count[listing.dateavailable.getMonth() + 12]["price"][listing.unitype] += listing.price
                } else {
                    price_count[listing.dateavailable.getMonth()][listing.unitype]++
                    price_count[listing.dateavailable.getMonth()]["price"][listing.unitype] += listing.price
                }
            }
        }
    });

    price_count.forEach(obj => {

        if(obj["apartment"] > 0){
            obj.price["apartment"] = (obj.price["apartment"]/obj["apartment"])
        } else {
            obj.price["apartment"] = 0
        }

        if(obj["basement-apartment"] > 0){
            obj.price["basement-apartment"] = (obj.price["basement-apartment"]/obj["basement-apartment"])
        } else {
            obj.price["basement-apartment"] = 0
        }
        
        if(obj["condo"] > 0){
            obj.price["condo"] = (obj.price["condo"]/obj["condo"])
        } else {
            obj.price["condo"] = 0
        }
        if(obj["duplex-triplex"] > 0){
            obj.price["duplex-triplex"] = (obj.price["duplex-triplex"]/obj["duplex-triplex"])
        } else {
            obj.price["duplex-triplex"] = 0
        }
        if(obj["house"] > 0){
            obj.price["house"] = (obj.price["house"]/obj["house"])
        } else {
            obj.price["house"] = 0
        }
    });


    return price_count;
}