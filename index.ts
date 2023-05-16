import { serve } from './deps.ts'
import { getTasks } from './model/task.ts'

await serve(async (req) => {
  const { pathname } = new URL(req.url)
  if (req.method === 'GET' && pathname === '/tasks') {
    return Response.json(getTasks())
  }
  return Response.json({ message: 'Resource not found' }, {
    status: 404,
  })
}, { port: 8000 })
