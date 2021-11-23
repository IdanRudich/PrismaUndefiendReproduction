import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient({
  log: [    {
    emit: 'event',
    level: 'query',
  },]
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})

export const context: Context = {
  prisma: prisma,
}
