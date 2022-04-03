const request = require('request'); 




const forcastUrl  = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8b5e9f35e61304d652bc1206f5c146d4&name=mahmoud&query="+latitude+","+longitude
    request({ url , json: true}, (error, {body}= {}) => {
        
        if (error) {
            callback("There is problem in your connection !!" , undefined) ;
        }else if(body.error){
            callback(body.error , undefined) ;
        }  else {
            const temp = body.current.temperature
            const wind_speed = body.current.wind_speed
            callback(undefined , {
               temp   ,
               wind_speed
            }) 
        }
    })

} 


module.exports = forcastUrl