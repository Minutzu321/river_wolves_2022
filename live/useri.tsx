

export const getUseri = () => async function(prisma) {
    return await prisma.user.findMany();
}
