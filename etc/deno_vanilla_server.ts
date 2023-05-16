const getTasks = () => Promise.resolve([{
    id: '1',
    name: 'Milk',
    done: true,
}, {
    id: '2',
    name: 'Beer',
    done: false,
}])

const handleHttp = async (conn: Deno.Conn) => {
  for await (const requestEvent of Deno.serveHttp(conn)) {
      const req = requestEvent.request
      const { pathname } = new URL(req.url)
      if (req.method === 'GET' && pathname === '/tasks') {
        void requestEvent.respondWith(Response.json(await getTasks()))
        return
      }
      void requestEvent.respondWith(Response.json({ message: 'Resource not found' }, {
        status: 404,
      }))
  }
}

for await (const conn of Deno.listen({ port: 8000 })) {
  void handleHttp(conn)
}
