import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbconnect } from './db/index.js';
import postrouter from './routes/post.js'
import generateimagerouter from './routes/generateimage.js'

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({ extended: true}));
app.use(cors());


app.use("/api/post/",postrouter)
app.use("/api/generateimage/",generateimagerouter)

app.get('/',(req,res) => {
    res.send('Hello World')
})

dbconnect();

app.listen(PORT,() => {
    console.log(`server is running in port ${PORT}`)
})