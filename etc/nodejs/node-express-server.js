const express = require('express')

const getTasks = () => Promise.resolve([{
  id: '1',
  name: 'Milk',
  done: true,
}, {
  id: '2',
  name: 'Beer',
  done: false,
}])

const app = express()

app.get('/tasks', async (req, res) => {
  res.json(await getTasks())
})

app.listen(8000, () => {
  console.log('Server started.')
})
