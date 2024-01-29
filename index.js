import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import 'dotenv/config'
import router from "./routes/index.js"

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1', router)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})