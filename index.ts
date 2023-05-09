import { serve } from './deps.ts'

await serve(
  () => Response.json({ message: 'Resource not found' }, { status: 404 }),
  { port: 8000 },
)
