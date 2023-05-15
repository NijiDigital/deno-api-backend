import type { ConnInfo } from '../deps.ts'
import type { JSONValue } from './json.d.ts'

export type HttpMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'

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
