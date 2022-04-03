const path = require('path');
const express = require('express') ; 
const hbs = require('hbs');
const geocodeUrl = require("./utils/geocodeUrl.js") ; 
const forcastUrl  = require("./utils/forcast.js") ; 


const app = express() ;
//Define Paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialPath)


//Setup static Dir to  serve 
app.use(express.static(publicDir));



app.get('/', (req, res) => {
    res.render('index.hbs',{
        name : "mahmoud salah", 
        title : "Weather App"
    })
    
})

 app.get('/about' , (req, res)=>{
     res.render('about.hbs',{
         title : 'About Me', //
         name : 'Mahmoud Salah', 

     })
 })

app.get('/weather', (req , res) =>{
    if(!req.query.address){
        res.send({
            error : 'You must add Address to get the weather'
        })
    }else{
        geocodeUrl (req.query.address , function (error, {lat , long , location} = {}) {
            if (error) {
                res.send(error)
            }else{
                forcastUrl(long ,lat , function (error, {temp , wind_speed} = {}) {
                    if(error) {
                        res.send(error)
                    }else{
                        res.send({
                            lat , 
                            long ,
                            location,
                            temp , 
                            wind_speed
                        })
                    }
                    
                })

            }
        })
    }
})

app.get('/products',(req,res)=>{
        if (!req.query.search) {
            res.send({
                error: "You must put search parameters to searchfor spac. product!"
            })
        }else{
            console.log(req.query)
        res.send({
            products : []
        })
        }

        

})

app.get('/help', (req , res)=>{
    res.render('help.hbs', {
        title: "Help", 
        Message: "This page for get help by answering the commen Question to help you while you using the app ",
        name: "Mahmoud Salah"
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on server 3000')
})
