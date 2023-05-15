import type { TaskPayload } from './model/task.ts'
import type { Route } from './types/router.d.ts'
import { serve } from './deps.ts'
import { createRouteMatcher } from './http/route_matcher.ts'
import {
  addTask,
  clearTasks,
  getTask,
  getTasks,
  removeTask,
} from './model/task.ts'
import { createRouteHandler } from './http/route_handler.ts'

const notFoundResponse = Response.json({ message: 'Task not found' }, {
  status: 404,
})

const routes: Route[] = [{
  matcher: createRouteMatcher({ method: 'GET', path: '/tasks' }),
  handler: () => getTasks(),
}, {
  matcher: createRouteMatcher({ method: 'POST', path: '/tasks' }),
  handler: async (req) => {
    const taskPayload: TaskPayload = await req.json()
    return addTask(taskPayload)
  },
}, {
  matcher: createRouteMatcher({ method: 'GET', path: '/tasks/:id' }),
  handler: (_req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    const task = id && getTask(id)
    if (!task) {
      return notFoundResponse
    }
    return task
  },
}, {
  matcher: createRouteMatcher({ method: 'DELETE', path: '/tasks/:id' }),
  handler: (_req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    const removed = id && removeTask(id)
    if (!removed) {
      return notFoundResponse
    }
    return new Response(undefined, { status: 204 })
  },
}, {
  matcher: createRouteMatcher({ method: 'DELETE', path: '/tasks' }),
  handler: () => {
    clearTasks()
    return new Response(undefined, { status: 204 })
  },
}]

const handler = createRouteHandler(routes)

await serve(handler, { port: 8000 })
