const http = require('http')

const getTasks = () => Promise.resolve([{
  id: '1',
  name: 'Milk',
  done: true,
}, {
  id: '2',
  name: 'Beer',
  done: false,
}])

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(await getTasks()))
    res.end()
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Resource not found' }))
  }
})

server.listen(8000, () => {
  console.log('Server started.')
})
