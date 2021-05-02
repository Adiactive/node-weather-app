const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const port = 3000

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rongzhi Gu',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rongzhi Gu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rongzhi Gu',
        helpText: 'This is some helpful text',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.search).then(({ location, latitude, longtitude }) => {
        forcast(latitude, longtitude).then((forcastData) => {
            return res.send({
                location,
                forcast: forcastData,
            })
        }).catch((error) => {
            return res.send({ error })
        })
    }).catch((error) => {
       return res.send({ error })
    })
})

app.get('/help/*', (req, res) => {
    res.render("error", {
        title: '404',
        name: 'Rongzhi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render("error", {
        title: '404',
        name: 'Rongzhi',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

