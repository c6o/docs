const express = require('express')
const basicAuth = require('express-basic-auth')
const path = require('path')
const PORT = process.env.PORT || 3000

express()
  .use(basicAuth({users: { 'traxitt': process.env.PASSWORD }, challenge: true}))
  .use(express.static(path.join(__dirname, 'docs')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))