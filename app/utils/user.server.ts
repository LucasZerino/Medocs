import { prisma } from "./prisma.server";
import { RegisterForm } from "./types.server";
import bcrypt from 'bcryptjs';

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const cpfHash = await bcrypt.hash(user.cpf, 10);
    const newUser = await prisma.user.create({
        data: {
            cpf: cpfHash,
            password: passwordHash,
            userName: user.userName,
            
        }
    })

    return { id: newUser.id, userName: user.userName }
}

export const getOtherUsers = async (userId: string) => {
    return await prisma.user.findMany({
        where: {
            id: { not: userId},
        },
        orderBy: {
            userName: 'asc',
        }
    })
}