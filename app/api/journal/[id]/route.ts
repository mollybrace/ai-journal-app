import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

export const PATCH = async ( request: Request, { params }) => {
    const {content} = await request.json()

    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        }
    })
}