const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())


const customers = []

app.get('/account', (req, res) => {
  return res.status(200).json({ customers })
})

app.post('/account', (req, res) => {
  const { cpf, name } = req.body
  const uuid = uuidv4()

  customers.push({
    cpf,
    name,
    id: uuid,
    statements: []
  })

  return res.status(201).send()
})

app.listen(3333)