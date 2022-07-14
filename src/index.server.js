const mongoose = require('mongoose')
const express = require('express')
const env = require('dotenv')
const app = express()

//routes
const authRoutes = require('./routes/auth.js')
const adminRoutes = require('./routes/admin/auth.js')
const categoryRoutes = require('./routes/category.js')

//environment variable or you can say constants  
env.config()

//mongodb connection 
//mongodb+srv://root:<password>@cluster0.52m3gsu.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(
    //`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vpu87md.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    "mongodb://localhost:27017/example",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    
    }
).then(() => {
    console.log('Database connnected')
}).catch((error) => {
    console.error(error.message);
})


app.use(express.json()) 
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))