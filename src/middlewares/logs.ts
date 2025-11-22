import type { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, "access.log");

export function loggingHook(app: any) {
    app.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
        (request as any).startTime = Date.now();
        
        const clientIP = request.ip || request.socket.remoteAddress || "127.0.0.1";
        const timestamp = new Date().toISOString();
        
        const logMessage = `[${timestamp}] IP: ${clientIP} | ${request.method} ${request.url} | INICIADA\n`;
        
        fs.appendFileSync(logFile, logMessage);
    });

    app.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
        const endTime = Date.now();
        const startTime = (request as any).startTime || endTime;
        const processingTime = endTime - startTime;
        
        const clientIP = request.ip || request.socket.remoteAddress || "127.0.0.1";
        const timestamp = new Date().toISOString();
        
        const logMessage = `[${timestamp}] IP: ${clientIP} | ${request.method} ${request.url} | STATUS: ${reply.statusCode} | TEMPO: ${processingTime}ms\n`;
        
        fs.appendFileSync(logFile, logMessage);
        
        console.log(logMessage.trim());
    });
}