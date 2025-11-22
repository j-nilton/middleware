import type { FastifyInstance } from 'fastify'
import { teacherController } from '../controllers/teachers.controller.js'

export async function teacherRoutes(app: FastifyInstance) {
  app.get('/', teacherController.list)
  app.get('/:id', teacherController.get)
  app.post('/', teacherController.create)
  app.put('/:id', teacherController.update)
  app.delete('/:id', teacherController.remove)
}