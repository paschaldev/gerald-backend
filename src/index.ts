import express from 'express'
import cors from 'cors'

const app = express()
// Use the port in environment variable if set or 
// fallback to 3000 as default
const port = process.env.PORT || 3000
// Add express middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Hi Gerald API")
});

app.listen(port, () => console.log(`Gerald API listening on port ${port}!`));