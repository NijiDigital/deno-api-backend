import type { TaskPayload } from './model/task.ts'
import type { Route } from './types/router.d.ts'
import { serve } from './deps.ts'
import { createRouteMatcher } from './http/route_matcher.ts'
import { addTask, getTasks } from './model/task.ts'
import { asPromise } from './utils/helper.ts'

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

await serve(async (req, connInfo) => {
  for (const route of routes) {
    const urlPatternResult = route.matcher(req)
    if (urlPatternResult) {
      const result = await asPromise(
        route.handler(req, connInfo, { pattern: urlPatternResult }),
      )
      return result instanceof Response ? result : Response.json(result)
    }
  }
  return Response.json({ message: 'Resource not found' }, {
    status: 404,
  })
}, { port: 8000 })
