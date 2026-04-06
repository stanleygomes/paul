import app from "../src/server.js";

/**
 * Entry point para a Vercel Serverless Function.
 * Redireciona requisições HTTP para a instância do Fastify.
 *
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit("request", req, res);
};
