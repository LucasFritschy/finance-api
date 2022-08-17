const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

function checkIfAccountIsValid(req, res, next) {
  const { cpf } = req.params

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({ error: 'User not found' })
  }

  req.customer = customer

  next()
}

function checkIfAccountAlreadyExists(req, res, next) {
  const { cpf, name } = req.body

  if (customers.some((customer) => customer.cpf === cpf)) {
    return res.status(400).json({ error: 'Customer already exists!' })
  }

  next()
}

app.get('/account', (req, res) => {
  return res.json({ customers })
})

app.post('/account', checkIfAccountAlreadyExists, (req, res) => {
  const { cpf, name } = req.body

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statements: []
  })

  return res.status(201).send()
})

app.get('/statement/:cpf', checkIfAccountIsValid, (req, res) => {
  const { customer } = req

  return res.json({ statements: customer.statements })
})

app.post('/deposit/:cpf', checkIfAccountIsValid, (req, res) => {
  const { description, amount } = req.body
  const { customer } = req

  customer.statements.push({
    description,
    amount,
    created_at: new Date(),
    type: 'Deposit'
  })

  return res.status(201).send()
})

app.listen(3333)