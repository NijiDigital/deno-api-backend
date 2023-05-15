import type { TaskPayload } from './model/task.ts'
import { serve } from './deps.ts'
import {
  addTask,
  clearTasks,
  getTask,
  getTasks,
  removeTask,
  setTask,
  updateTask,
} from './model/task.ts'
import { createRouter } from './http/router.ts'
import {routeServe} from "./http/route_server.ts";

const notFoundResponse = Response.json({ message: 'Task not found' }, {
  status: 404,
})

const router = createRouter()
  .get('/tasks', () => getTasks())
  .post('/tasks', async (req) => {
    const taskPayload: TaskPayload = await req.json()
    return addTask(taskPayload)
  })
  .get('/tasks/:id', (_req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    const task = id && getTask(id)
    if (!task) {
      return notFoundResponse
    }
    return task
  })
  .delete('/tasks/:id', (_req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    const removed = id && removeTask(id)
    if (!removed) {
      return notFoundResponse
    }
    return new Response(undefined, { status: 204 })
  })
  .delete('/tasks', () => {
    clearTasks()
    return new Response(undefined, { status: 204 })
  })
  .put('/tasks/:id', async (req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    if (!id) {
      return notFoundResponse
    }
    const taskPayload: TaskPayload = await req.json()
    const task = setTask(id || '', taskPayload)
    if (!task) {
      return notFoundResponse
    }
    return task
  })
  .patch('/tasks/:id', async (req, _connInfo, { pattern }) => {
    const id = pattern?.pathname.groups.id
    if (!id) {
      return notFoundResponse
    }
    const taskPayload: TaskPayload = await req.json()
    const task = updateTask(id, taskPayload)
    if (!task) {
      return notFoundResponse
    }
    return task
  })

await routeServe(router, { port: 8000 })
