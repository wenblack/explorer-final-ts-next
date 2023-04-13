import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    const users = await prisma?.user.findMany({
        select: {
            id: true,
            name: true,
            emai: true,
            avatarUrl: true,
        }
    })
    if (users.length === 0) {
        res.json('We dont have any users')
    }
    res.json(users)

}