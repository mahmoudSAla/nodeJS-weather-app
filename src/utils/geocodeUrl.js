const request  = require('request');

const geocodeUrl = (address ,callback) => {
    const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWFobW91ZHNhbGFoOTY2IiwiYSI6ImNsMHNsenlhazBlYW0zY3FvNWR6amdrNnQifQ.cMpQ9ZI1ZUD0ejJlRDw0PA&limit=1"
    request({url: url2 ,json: true}, (error, response) => {
    
        if (error) {
            callback("There is problem in your connection !!" , undefined) ;
        }else if(response.message){
            callback(response.message, undefined) ;
        }  else { 
            const lat = response.body.features[0].center[1] 
            const long = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined , {
                lat , 
                long,
                location
            }) 
        }
    })

}
module.exports = geocodeUrl
