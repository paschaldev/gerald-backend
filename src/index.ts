import express from 'express'
import cors from 'cors'
import session from 'cookie-session'
import {
  authHandler,
  verification,
} from './controllers'

const app = express()
// Use the port in environment variable if set or 
// fallback to 3000 as default
const port = process.env.PORT || 3000
// Add express middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'gerald-api',
  resave: true,
  saveUninitialized: true,
}))

app.use(function (req: any, res: express.Response, next: express.NextFunction) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (!req.session.auth) {
    req.session.auth = {}
  }
  next()
})

// Routes
app.post('/auth', authHandler)
app.post('/auth/verify', verification)

app.listen(port, () => console.log(`Gerald API listening on port ${port}!`))