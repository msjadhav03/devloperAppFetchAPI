const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const fetchDeviceUser = require('./routes/fetchDeviceUserRoute.js')
const fetchDeveloperNotification = require('./routes/fetchDevloperNotificationRoute.js')
const fetchDevices = require('./routes/fetchDeviceRoute')

app.use('/fetchDevices',fetchDevices)
app.use('/fetchDeviceUser',fetchDeviceUser)
app.use('/fetchDeveloperNotification',fetchDeveloperNotification)


module.exports = app