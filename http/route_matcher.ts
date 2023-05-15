import type { RequestMatcher, RouteSpec } from '../types/router.d.ts'

export const createRouteMatcher = (routeSpec: RouteSpec): RequestMatcher => {
  const methodMatcher = !routeSpec.method
    ? () => true
    : (method: string) => method === routeSpec.method
  const urlPattern = routeSpec.path
    ? new URLPattern({ pathname: routeSpec.path })
    : undefined
  return (req) => {
    if (!methodMatcher(req.method)) {
      return false
    }
    const { pathname } = new URL(req.url)
    return urlPattern?.exec({ pathname }) || false
  }
}
