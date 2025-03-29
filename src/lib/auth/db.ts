// OJO : Esto es diferente vs proyecto nextAuthV5

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

// Si ya existe una instancia, la reutilizamos, si no, creamos una nueva
export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

//konsole.log("db initialized", db); // Agrega este log para depurar

// Ahora db.user, etc., estarán definidos si la generación fue correcta.
