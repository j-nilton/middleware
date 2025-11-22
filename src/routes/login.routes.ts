import { FastifyInstance } from "fastify";

export async function loginRoutes(app: FastifyInstance) {
    app.get("/login", async (request, reply) => {
        const { headers, query } = request;
        
        const authHeader = headers.authorization;
        if (authHeader === "Bearer 12345") {
            return reply.redirect("/dashboard?source=token");
        }
        
        if ((query as any).auth === "true") {
            return reply.redirect("/dashboard?source=query");
        }
        
        const sessionCookie = request.cookies.session;
        if (sessionCookie === "ok") {
            return reply.redirect("/dashboard?source=cookie");
        }
        
        return reply.status(401).send({
            error: "Acesso negado. Nenhuma forma de autenticação encontrada.",
            instructions: [
                "Envie um token válido no header: Authorization: Bearer 12345",
                "Ou adicione o parâmetro: /login?auth=true",
                "Ou defina o cookie: session=ok"
            ]
        });
    });
    
    app.post("/login", async (request, reply) => {
        return {
            message: "Endpoint de login POST",
            instructions: "Implemente a lógica de autenticação aqui"
        };
    });
    
    app.get("/dashboard", async (request, reply) => {
        const { query } = request;
        const source = (query as any).source || "unknown";
        
        return {
            message: "Bem-vindo ao Dashboard!",
            source: `Autenticado via: ${source}`,
            timestamp: new Date().toISOString(),
            data: {
                user: "Usuário Autenticado",
                permissions: ["read", "write", "delete"]
            }
        };
    });
    
    app.get("/set-cookie", async (request, reply) => {
        reply.setCookie('session', 'ok', {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 // 1 dia
        });
        
        return { 
            message: "Cookie 'session' definido como 'ok'",
            instructions: "Agora acesse /login para testar a autenticação por cookie"
        };
    });
}