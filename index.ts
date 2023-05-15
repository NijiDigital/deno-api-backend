import type { TaskPayload } from './model/task.ts'
import type { Route } from './types/router.d.ts'
import { serve } from './deps.ts'
import { createRouteMatcher } from './http/route_matcher.ts'
import { addTask, getTasks } from './model/task.ts'
import { createRouteHandler } from './http/route_handler.ts'

const routes: Route[] = [{
  matcher: createRouteMatcher({ method: 'GET', path: '/tasks' }),
  handler: () => getTasks(),
}, {
  matcher: createRouteMatcher({ method: 'POST', path: '/tasks' }),
  handler: async (req) => {
    const taskPayload: TaskPayload = await req.json()
    return addTask(taskPayload)
  },
}]

const handler = createRouteHandler(routes)

await serve(handler, { port: 8000 })
