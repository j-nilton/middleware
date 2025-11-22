import type { FastifyReply, FastifyRequest } from "fastify";

export async function authHook(request: FastifyRequest, reply: FastifyReply) {
    const url = request.url;
    
    // Não aplicar autenticação para rotas públicas
    if (url === "/login" || url.startsWith("/login?") || url === "/set-cookie" || url === "/dashboard") {
        return; // Continua sem autenticação
    }
    
    const authHeader = request.headers.authorization;
    if (authHeader !== "Bearer 123456") {
        return reply.status(401).send({ error: "Acesso não autorizado" });
    }
}