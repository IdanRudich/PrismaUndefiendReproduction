require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log: [{
        emit: 'event',
        level: 'query',
    }, "info"]
})

prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Parameters: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')

})

async function main() {

    const first = await prisma.post.findMany({
        where: {
            id: 1
        }
    })
    console.log("first", first)

    const second = await prisma.post.findMany({
        where: {
            id: 1,
            tags: {
                some: {
                    tag: {
                        in: undefined
                    }
                }
            }
        }
    })
    console.log("second", second)

    // const third = await prisma.post.findMany({
    //     where: {
    //         id: 1,
    //         tags: {
    //             some: {
    //                 tag: {
    //                     in: "TypeScript"
    //                 }
    //             }
    //         }
    //     }
    // })
    // console.log("third", third)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })