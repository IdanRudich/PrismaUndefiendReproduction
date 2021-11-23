import { Resolver, Resolvers } from "./generated/graphql";

export const resolvers: Resolvers = {
    Query: {
        getPostsUndefiend: async (_, args, context) => {
            return context.prisma.post.findMany({
                where: {
                    id: args.id,
                    tags: {
                        some: {
                            tag: {
                                in: undefined
                            }
                        }
                    }
                }
            })
        },
        getPosts: async (_, args, context) => {
            return context.prisma.post.findMany({
                where: {
                    id: args.id
                }
            })
        }
        
    }
}