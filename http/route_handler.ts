import type { Handler } from '../deps.ts'
import type { Route, RouterOptions } from '../types/router.d.ts'
import { asPromise } from '../utils/helper.ts'

export const defaultNotFoundHandler: Handler = () =>
  Response.json({ message: 'Resource not found' }, {
    status: 404,
  })

export const createRouteHandler = (
  routes: Route[],
  options?: RouterOptions,
): Handler => {
  const notFoundHandler = options?.notFound || defaultNotFoundHandler
  return async (req, connInfo) => {
    for (const route of routes) {
      const urlPatternResult = route.matcher(req)
      if (urlPatternResult) {
        const result = await asPromise(
          route.handler(req, connInfo, { pattern: urlPatternResult }),
        )
        return result instanceof Response ? result : Response.json(result)
      }
    }
    return notFoundHandler(req, connInfo)
  }
}
