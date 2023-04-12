import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main() {
    await prisma.user.create({
        data: {
            name: "John Doe",
            emai: "example@example.com",
            avatarUrl: "https:github.com/wenblack.png",
            password: '123456'
        },
    })
    await prisma.user.create({
        data: {
            name: "Zé Gotinha",
            emai: "zegota@vdlk.com",
            avatarUrl: "https:github.com/wenblack.png",
            password: '123456'
        },
    })
}
main()