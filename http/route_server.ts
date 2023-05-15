import type { ServeInit } from '../deps.ts'
import type { Router } from '../types/router.d.ts'
import { serve } from '../deps.ts'

export const routeServe = (router: Router, options?: ServeInit) =>
  serve(router.toHandler(), options)
