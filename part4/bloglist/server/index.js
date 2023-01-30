// const app = require('./app') // the actual Express application
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogsRouter')

require('dotenv').config();
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})