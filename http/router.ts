import type {
  HttpMethod,
  Route,
  RouteHandler,
  Router,
  RouterOptions,
} from '../types/router.d.ts'
import { createRouteHandler } from './route_handler.ts'
import { createRouteMatcher } from './route_matcher.ts'
import { httpMethods } from './http_method.ts'

export const routeRegisterer = (routes: Route[]) =>
(
  method: HttpMethod,
  path: string,
  handler: RouteHandler,
) => {
  if (!httpMethods.includes(method)) {
    throw new Error(`HTTP method '${method}' not supported`)
  }
  const matcher = createRouteMatcher({ method, path })
  const route: Route = { matcher, handler }
  routes.push(route)
}

export const createRouter = (options?: RouterOptions): Router => {
  const routes: Route[] = []
  const registerRoute = routeRegisterer(routes)
  const createHttpMethodFunc = (method: HttpMethod) =>
  (
    path: string,
    routeHandler: RouteHandler,
  ) => {
    registerRoute(method, path, routeHandler)
    return router
  }
  const router: Router = {
    delete: createHttpMethodFunc('DELETE'),
    get: createHttpMethodFunc('GET'),
    head: createHttpMethodFunc('HEAD'),
    options: createHttpMethodFunc('OPTIONS'),
    patch: createHttpMethodFunc('PATCH'),
    post: createHttpMethodFunc('POST'),
    put: createHttpMethodFunc('PUT'),
    register: registerRoute,
    toHandler: () => createRouteHandler(routes, options),
  }
  return router
}
