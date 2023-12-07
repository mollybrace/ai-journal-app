import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["query"]
    })

    if (process.env.NODE_ENV !== "production") globalForPrisma


    //globalThis == assigning in the global space
    //as unknown==  giving it a type of unknown and then assigning it.