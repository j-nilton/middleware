import type { FastifyReply, FastifyRequest } from "fastify"
import { teacherService } from "../services/teachers.service.js"

export const teacherController = {
  // Listar todos os professores
  async list(_req: FastifyRequest, reply: FastifyReply) {
    const teachers = await teacherService.getAll()
    return reply.send(teachers)
  },

  // Buscar professor por ID
  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const teacher = await teacherService.getById(Number(id))

    if (!teacher) {
      return reply.status(404).send({ error: "Professor não encontrado" })
    }
    return reply.send(teacher)
  },

  // Criar novo professor
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, subject } = req.body as any

    try {
      const newTeacher = await teacherService.create({ name, email, subject })
      return reply.status(201).send(newTeacher)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  },

  // Atualizar professor
  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as any

    try {
      const updated = await teacherService.update(Number(id), data)
      return reply.send(updated)
    } catch {
      return reply.status(404).send({ error: "Professor não encontrado" })
    }
  },

  // Remover professor
  async remove(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }

    try {
      await teacherService.delete(Number(id))
      return reply.status(204).send()
    } catch {
      return reply.status(404).send({ error: "Professor não encontrado" })
    }
  },
}
