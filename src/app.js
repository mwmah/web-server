const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // process.env.PORT comes from heroku

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Mah'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Mah'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Michael Mah',
        helpText: "Please Help mE!!"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {  //uses default object 
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location: location,
                forecast: forecastData,
                address: address,
            })
            
        })
    
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: "Help article not found.",
        name: 'Michael Mah'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: "Page not found.",
        name: 'Michael Mah'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})