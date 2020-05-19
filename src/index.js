const chalk     = require('chalk');
const path      = require('path') ; 
const express   = require('express');
const fs        = require('fs');
const hbs       = require('hbs');
const geocoding = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath            = path.join(__dirname, '../templates/views')
const partialPath         = path.join(__dirname, '../templates/partials')

//setup handelbars engine and views engine
app.set("view engine","hbs")
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath));


app.get('',(req, res)=>{
    res.render('index', {
        title: 'weather',
        name : 'Satyam Singh'
    })

})

app.get('/weather',(req, res)=>{
    
    if (!req.query.search) {
     return res.send({
             title:'Weather',
             message: 'Please Provide Search Input'
        })
    }
    geocoding.geocoding(req.query.search,(err, data) => {
        if(err){
            return res.send({err})
        }
        forecast.forecast(data.latitude, data.longitude, (forErr, forData) => {
            if(forErr){
                return res.send({forErr})
            }
            res.send({
            
                location: data.location ,
                forData : forData,
                name: 'satyam singh'
            })
        })

    })
    
})

app.get('/help',(req, res) => {
    fs.readFile('./assets/avengers.txt', (err, data) => {
        dataTostring = data.toString(); 
        res.render('help',{
            message: dataTostring,
            title  :'Help',
            name : 'Satyam Singh'
        });
    })
    
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About',
        name : 'Satyam Singh'
        
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        title:404,
        message:"Page not found"
    })
})
app.listen(3000,()=>console.log("app listening"));



