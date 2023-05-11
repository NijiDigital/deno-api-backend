import { localStore } from '../utils/local_store.ts'
import { parseBoolean } from '../utils/helper.ts'

type Task = {
  id: string
  name: string
  done: boolean
}

export type TaskPayload = { name: string; done?: string }

const store = localStore({ ns: 'tasks' })

export const getTasks = () => store.getItems<Task>()

export const addTask = (payload: TaskPayload) => {
  const id = store.generateId()
  const task: Task = {
    id,
    name: payload.name,
    done: payload.done === 'true',
  }
  store.setItem(id, task)
  return task
}

export const getTask = (id: string) => store.getItem<Task>(id)

export const removeTask = (id: string): boolean => store.removeItem(id)

export const clearTasks = () => {
  store.removeItems()
}

export const updateTask = (id: string, payload: TaskPayload) => {
  const existingTask = id && getTask(id)
  if (!existingTask) {
    return undefined
  }
  const done = parseBoolean(payload.done)
  const task: Task = {
    ...existingTask,
    id,
    ...payload.name !== undefined && { name: payload.name },
    ...done !== undefined && { done },
  }
  store.setItem(id, task)
  return task
}

export const setTask = (id: string, payload: TaskPayload) => {
  const existingTask = id && getTask(id)
  if (!existingTask) {
    return undefined
  }
  const task: Task = {
    id,
    name: payload.name,
    done: payload.done === 'true',
  }
  store.setItem(id, task)
  return task
}
