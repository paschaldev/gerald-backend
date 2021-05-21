import express from 'express'
import { randomCode } from './helpers'
import { authType } from './types'

export const authHandler = (req: any, res: express.Response) => {
  // Get the phone number from the request
  const phone: string = req.body.phone
  // Get the authentication type
  // defaults to SMS
  const authMethod: authType = req.body.auth_type || 'sms'
  // Check if phone is not empty
  if (!phone) {
    return res.status(422).json({
      phone: 'Please provide a phone number'
    })
  }
  // Get the authentication code
  const code: string = randomCode(6)
  // mimic a unique hash code that is saved along with the 
  // code for verification purposes
  const hash: string = randomCode(30)

  // Current time
  let now = new Date()
  let expiry = now.setMinutes(now.getMinutes() + 1)
  // Store auth in temporary session so we can track expiry time
  req.session.auth[hash] = {
    code,
    expires: expiry
  }

  // Send authentication code
  console.log(`Authentication code sent to ${phone} via ${authMethod} is: ${code}`)
  
  res.json({
    hash
  })
}

export const verification = (req: any, res: express.Response) => {
  // Get the phone number from the request
  const hash: string = req.body.hash
  // Get the phone number from the request
  const code: string = req.body.code
  // Check if the hash exists in the session
  if (req.session.auth[hash]) {
    // Check if the session has not expired
    console.log(req.session.auth[hash].expires, new Date(), new Date(req.session.auth[hash].expires))
    if (new Date() < new Date(req.session.auth[hash].expires)) {
      // Check if code is valid
      if (code == req.session.auth[hash].code) {
        return res.status(200).json({
          message: 'Login successful master Gerald!'
        })
      }
  
      return res.status(422).json({
        code: 'The code provided is invalid, please try again!'
      })
    }

    return res.status(422).json({
      code: 'Session has expired. Please login again'
    })
  }

  return res.status(422).json({
    code: 'Session does not exist. Please login again'
  })
}