import { fastify } from "fastify";
import { studentRoutes } from "./routes/students.routes.js";
import { teacherRoutes } from "./routes/teachers.routes.js";
import { loginRoutes } from "./routes/login.routes.js";
import { authHook } from "./middlewares/auth.js";
import { loggingHook } from "./middlewares/logs.js";
import cookie from "@fastify/cookie";

const app = fastify({ logger: true });

app.register(cookie);

loggingHook(app);

app.addHook("preHandler", authHook);

app.register(studentRoutes, { prefix: "/students" });
app.register(teacherRoutes, { prefix: "/teachers" });
app.register(loginRoutes);

app.get("/", async (req, reply) => {
    return reply.redirect("/login");
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log("Servidor rodando na porta 3000");
        console.log("Logs sendo salvos em logs/access.log");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();