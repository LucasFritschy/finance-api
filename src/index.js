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

  if (customers.some((customer) => customer.cpf === cpf)) {
    return res.status(400).json({ error: 'Customer already exists!' })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statements: []
  })

  return res.status(201).send()
})

app.listen(3333)