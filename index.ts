import type { TaskPayload } from './model/task.ts'
import { serve } from './deps.ts'
import { addTask, getTasks } from './model/task.ts'

await serve(async (req) => {
  const { pathname } = new URL(req.url)
  if (req.method === 'GET' && pathname === '/tasks') {
    return Response.json(getTasks())
  }
  if (req.method === 'POST' && pathname === '/tasks') {
    const taskPayload: TaskPayload = await req.json()
    const task = addTask(taskPayload)
    return Response.json(task)
  }
  return Response.json({ message: 'Resource not found' }, {
    status: 404,
  })
}, { port: 8000 })
