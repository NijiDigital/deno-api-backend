import type { ConnInfo, Handler } from '../deps.ts'
import type { JSONValue } from './json.d.ts'

export type HttpMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'

export type HttpMethodFunc = (
  path: string,
  routeHandler: RouteHandler,
) => Router

export type HttpMethodProvider = {
  delete: HttpMethodFunc
  get: HttpMethodFunc
  head: HttpMethodFunc
  options: HttpMethodFunc
  patch: HttpMethodFunc
  post: HttpMethodFunc
  put: HttpMethodFunc
}

export type Route = {
  matcher: RequestMatcher
  handler: RouteHandler
}

export type RouteSpec = {
  method?: HttpMethod
  path?: string
}

export type RequestMatcher = (req: Request) => false | URLPatternResult

export type RouteHandlerResult =
  | Promise<Response | JSONValue>
  | Response
  | JSONValue

export type RouteHandler = (
  request: Request,
  connInfo: ConnInfo,
  options: { pattern?: URLPatternResult },
) => RouteHandlerResult

export type RouterOptions = {
  notFound?: Handler
}

export type Router = {
  register: (method: HttpMethod, path: string, handler: RouteHandler) => void
  toHandler: () => Handler
} & HttpMethodProvider
