const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const {DBconnection} = require('./config/mongoDb')
DBconnection();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


const userRoute = require('./routes/user')
const restaurantRoute = require('./routes/restaurants')


app.use('/user',userRoute)
app.use('/restaurants',restaurantRoute)
app.use((req, res) => {
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app