require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express()

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handle')
app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





const port = process.env.PORT || 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}. . .`))
    } catch (error) {
        console.log(error);   
    }
}

start()  